import { useEffect, useState } from "react";

type ScrollToTopButtonProps = {
    containerRef: React.RefObject<HTMLDivElement | null>;
};

export default function ScrollToTopButton({ containerRef }: ScrollToTopButtonProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onScroll = () => {
            setVisible(el.scrollTop > 300);
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [containerRef]);

    const scrollToTop = () => {
        const el = containerRef.current;
        if (!el) return;

        el.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="
                fixed top-10 self-center
                bg-pink-600
                text-white
                text-4xl py-6 px-6 rounded-full
                shadow-lg
                opacity-50
                z-50
            "
        >
            &#8679;
        </button>
    );
}