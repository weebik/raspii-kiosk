import axios from 'axios';
import * as cheerio from 'cheerio';
import { type Employee } from '../types/employee.type.ts';
import { saveToFile } from '../utils/saveToFile.ts';
import { BASE_URL, BATCH_SIZE } from '../config/defaults.ts';

type RawEmployee = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

function extractJsonFromScript(html: string): any {
    const $ = cheerio.load(html);
    const scriptText = $('.folded script').html()?.trim();
    if (!scriptText) throw new Error('Script with employee data not found.');

    const jsonText = scriptText.replace(/^var\s+\w+\s*=\s*/, '').replace(/;$/, '');
    return JSON.parse(jsonText);
}

async function fetchRawEmployees(): Promise<Record<string, RawEmployee>> {
    const { data } = await axios.get(`${BASE_URL}/users/employees/`);
    return extractJsonFromScript(data);
}

async function fetchEmployeeRoom(id: number): Promise<string | null> {
    try {
        const { data } = await axios.get(`${BASE_URL}/users/employees/${id}/`);
        const $ = cheerio.load(data);
        let room: string | null = null;

        $('table tr').each((_, el) => {
            const th = $(el).find('th').text().trim().toLowerCase();
            if (th === 'pokój') {
                room = $(el).find('td').text().trim();
            }
        });

        return room === 'brak danych' ? null : room || null;
    } catch {
        console.warn(`[Employees] Couldnt fetch room for employee ${id}`);
        return null;
    }
}

export async function scrapeEmployees(): Promise<Record<number, Employee>> {
    console.log('[Employees] Starting...');

    const rawEmployees = await fetchRawEmployees();
    const entries = Object.entries(rawEmployees);
    const result: Record<number, Employee> = {};

    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
        const batch = entries.slice(i, i + BATCH_SIZE);

        const processed = await Promise.all(
            batch.map(async ([refId, raw]) => {
                const room = await fetchEmployeeRoom(raw.id);
                return {
                    refId: Number(refId),
                    id: raw.id,
                    firstName: raw.first_name,
                    lastName: raw.last_name,
                    email: raw.email,
                    roomId: room,
                } satisfies Employee;
            })
        );

        for (const employee of processed) {
            result[employee.refId] = employee;
        }

        console.log(`[Employees] ${Math.min(i + BATCH_SIZE, entries.length)} / ${entries.length}`);
    }

    saveToFile('employees.json', result);
    console.log('[Employees] Done.');

    return result;
}