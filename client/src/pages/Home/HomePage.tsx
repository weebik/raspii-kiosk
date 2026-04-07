import { useEffect, useRef } from "react";
import useNews from "../../hooks/useNews";
import NewsTile from "./components/NewsTile";

export default function HomePage() {
    const { visibleNews, hasMore, loadMore } = useNews();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onScroll = () => {
            if (!hasMore) return;

            const nearBottom =
                el.scrollTop + el.clientHeight >= el.scrollHeight - 150;

            if (nearBottom) {
                loadMore();
            }
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [hasMore, loadMore]);

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="w-full h-full  flex flex-col overflow-hidden">
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto transform-gpu px-10 overscroll-y-auto"
                >
                    <div className="text-8xl font-bold mt-10 ml-50 mb-20">Aktualności</div>
                    {visibleNews.map((n) => (
                        <NewsTile key={n.id} news={n} />
                    ))}

                    {hasMore && (
                        <div className="text-center opacity-50">
                            Wczytywanie starszych aktualności...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}