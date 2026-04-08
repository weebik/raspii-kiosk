import { useEffect, useRef } from "react";
import useNews from "../../hooks/useNews";
import NewsTile from "./components/NewsTile";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Loader from "../../components/Loader";

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
        <div className="w-full h-full  flex flex-col overflow-hidden transform-gpu">
            <ScrollToTopButton containerRef={scrollRef} />
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-10 overscroll-y-auto [scrollbar-width:0px] [&::-webkit-scrollbar]:hidden"
            >
                <div className="text-8xl font-bold italic mt-10 ml-50 mb-12">Aktualności</div>
                {visibleNews.map((n) => (
                    <NewsTile key={n.id} news={n} />
                ))}

                {hasMore && (
                    <Loader />
                )}
            </div>
        </div>
    );
}