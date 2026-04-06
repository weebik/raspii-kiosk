import axios from 'axios';
import * as cheerio from 'cheerio';
import { saveToFile } from '../utils/saveToFile.ts';
import { type NewsItem } from '../types/newsItem.type.ts';
import { BASE_URL, MAX_NEWS_ITEMS } from '../config/defaults.ts';

function cleanText(input: string): string {
    return input.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function extractId(raw?: string): number | null {
    if (!raw) return null;
    const match = raw.match(/od-news-(\d+)/);
    return match ? Number(match[1]) : null;
}

async function fetchNewsPage(page: number): Promise<NewsItem[]> {
    const url = page === 1 ? `${BASE_URL}/news/` : `${BASE_URL}/news/?page=${page}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const items: NewsItem[] = [];

    $('.od-news-item').each((_, el) => {
        const id = extractId($(el).attr('id'));
        if (id === null) return;

        items.push({
            id,
            title: cleanText($(el).find('h3.display-6').first().text()),
            date: cleanText($(el).find('.od-news-date').first().text()) || null,
            author: cleanText($(el).find('.od-news-author').first().text()) || null,
            content: cleanText($(el).find('.my-3').first().text()),
        });
    });

    return items;
}

export async function scrapeNews(): Promise<Record<number, NewsItem>> {
    console.log('[News] Starting...');

    const result: Record<number, NewsItem> = {};
    let count = 0;
    let page = 1;

    while (count < MAX_NEWS_ITEMS) {
        const pageItems = await fetchNewsPage(page);

        if (pageItems.length === 0) break;

        for (const item of pageItems) {
            if (result[item.id]) continue;

            result[item.id] = item;
            count++;

            if (count === MAX_NEWS_ITEMS) break;
        }

        console.log(`[News] ${count} / ${MAX_NEWS_ITEMS}`);
        page++;
    }

    saveToFile('news.json', result);
    console.log('[News] Done.');

    return result;
}