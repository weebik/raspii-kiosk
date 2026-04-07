import axios from 'axios';
import * as cheerio from 'cheerio';
import { saveToFile } from '../utils/saveToFile.ts';
import { type NewsItem } from '../types/newsItem.type.ts';
import { BASE_URL, MAX_NEWS_ITEMS } from '../config/defaults.ts';
import { cleanText, extractId, formatMarkdown, htmlToText, toTitleCase } from '../utils/newsHelpers.ts';

async function fetchNewsPage(page: number): Promise<NewsItem[]> {
    const url = page === 1 ? `${BASE_URL}/news/` : `${BASE_URL}/news/?page=${page}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const items: NewsItem[] = [];

    $('.od-news-item').each((_, el) => {
        const id = extractId($(el).attr('id'));
        if (id === null) return;

        const rawHtml = $(el).find('.my-3').first().html() || '';

        const contentEl = formatMarkdown(htmlToText(rawHtml));

        items.push({
            id,
            title: toTitleCase(cleanText($(el).find('h3.display-6').first().text())),
            date: cleanText($(el).find('.od-news-date').first().text()) || null,
            author: cleanText($(el).find('.od-news-author').first().text()) || null,
            content: contentEl
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