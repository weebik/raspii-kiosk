import { scrapeCourses } from "./workers/scrapeCourses.ts";
import { scrapeEmployees } from "./workers/scrapeEmployees.ts";
import { scrapeNews } from "./workers/scrapeNews.ts";


export async function scrapeData() {
  await scrapeNews();
  await scrapeCourses();
  await scrapeEmployees();
}

scrapeData();