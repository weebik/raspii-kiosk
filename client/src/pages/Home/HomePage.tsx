import { useEffect, useRef } from "react";
import useNews from "../../hooks/useNews";
import NewsTile from "./components/NewsTile";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Loader from "../../components/Loader";
import PageLayout from "../../components/PageLayout";

export default function NewsPage() {
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
            <ScrollToTopButton containerRef={scrollRef} />
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto overscroll-y-auto [scrollbar-width:0px] [&::-webkit-scrollbar]:hidden"
            >
                <PageLayout title="Aktualności">
                    {visibleNews.map((n) => (
                        <NewsTile key={n.id} news={n} />
                    ))}
                    {hasMore && <Loader />}
                </PageLayout>
            </div>
        </div>
    );
}