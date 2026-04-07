import { useMemo, useState } from "react";
import type { NewsItem } from "../types/newsItem.type";
import newsData from "../../../data/raw/news.json";

const PAGE_SIZE = 5;

export default function useNews() {
    const allNews = useMemo(() => {
        return Object.values(newsData as Record<string, NewsItem>)
            .sort((a, b) => b.id - a.id);
    }, []);

    const news = allNews.slice();

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const visibleNews = useMemo(() => {
        return news.slice(0, visibleCount);
    }, [news, visibleCount]);

    const loadMore = () => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    };

    return {
        visibleNews,
        hasMore: visibleCount < news.length,
        loadMore,
    };
}