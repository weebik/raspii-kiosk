import axios from 'axios';
import * as cheerio from 'cheerio';
import { type Course } from '../types/course.type.ts';
import { type CourseGroup } from '../types/courseGroup.type.ts';
import { type CourseSlot } from '../types/courseSlot.type.ts';
import { mapGroupType, parseDay, parseRoom, parseTime } from '../utils/courseHelpers.ts';
import { saveToFile } from '../utils/saveToFile.ts';
import { BASE_URL, BATCH_SIZE } from '../config/defaults.ts';

type RawCourse = {
    id: number;
    name: string;
    owner: number;
    url: string;
};

function extractJsonFromScript(html: string): any {
    const $ = cheerio.load(html);
    const scriptText = $('.folded script').html()?.trim();
    if (!scriptText) throw new Error('Script with courses data not found.');

    const jsonText = scriptText.replace(/^var\s+\w+\s*=\s*/, '').replace(/;$/, '');
    return JSON.parse(jsonText);
}

async function fetchRawCourses(): Promise<Record<string, RawCourse>> {
    const { data } = await axios.get(`${BASE_URL}/courses/`);
    return extractJsonFromScript(data);
}

async function scrapeCourseDetails(url: string): Promise<CourseGroup[]> {
    const { data } = await axios.get(`${BASE_URL}${url}`);
    const $ = cheerio.load(data);
    const groups: CourseGroup[] = [];

    $('.table-responsive').each((_, el) => {
        const title = $(el).find('h3').first().text().trim();
        const type = mapGroupType(title);
        if (!type) return;

        const slots: CourseSlot[] = [];

        $(el).find('tbody tr').each((_, row) => {
            const employeeIds: number[] = [];

            $(row).find('a.person').each((_, a) => {
                const match = $(a).attr('href')?.match(/\/users\/employees\/(\d+)\//);
                if (match) employeeIds.push(Number(match[1]));
            });

            $(row).find('td').eq(1).find('span').each((_, span) => {
                const text = $(span).text().trim();
                if (!text) return;

                const dayMatch = text.match(/^([a-ząćęłńóśźż]{2})/i);
                const day = parseDay(dayMatch?.[1] ?? '');

                const { start, end } = parseTime(text);
                const room = parseRoom(text);

                if (!start || !end) return;

                slots.push({
                    day,
                    startTime: start,
                    endTime: end,
                    employeeIds,
                    rooms: room ? [room] : [],
                });
            });
        });

        groups.push({ type, slots });
    });

    return groups;
}

export async function scrapeCourses(): Promise<Record<number, Course>> {
    console.log('[Courses] Starting...');

    const rawCourses = await fetchRawCourses();
    const entries = Object.entries(rawCourses);
    const result: Record<number, Course> = {};

    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
        const batch = entries.slice(i, i + BATCH_SIZE);

        const processed = await Promise.all(
            batch.map(async ([, course]) => {
                const groups = await scrapeCourseDetails(course.url);
                return {
                    id: course.id,
                    name: course.name,
                    groups,
                } satisfies Course;
            })
        );

        for (const course of processed) {
            result[course.id] = course;
        }

        console.log(`[Courses] ${Math.min(i + BATCH_SIZE, entries.length)} / ${entries.length}`);
    }

    saveToFile('courses.json', result);
    console.log('[Courses] Done.');

    return result;
}