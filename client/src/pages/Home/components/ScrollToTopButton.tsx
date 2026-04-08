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
        <div
            className={`fixed top-5 self-center z-50 ${visible ? "visible" : "display-none pointer-events-none"}`}>
            <button
                onClick={scrollToTop}
                className="relative group w-25 h-15 flex items-center justify-center">
                <svg
                    className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]"
                    viewBox="0 0 224 135"
                    fill="none">
                    <path
                        d="M194.567 0.00683594C210.629 0.273783 223.567 13.3746 223.567 29.5C223.567 33.7501 222.668 37.7899 221.05 41.4404C219.654 45.3615 217.295 48.997 213.887 54.2451L175.639 113.143C170.453 121.129 167.859 125.122 164.399 128.015C161.337 130.576 157.793 132.5 153.978 133.674C149.667 135 144.905 135 135.383 135H88.1846C78.6627 135 73.9016 135 69.5908 133.674C65.7748 132.5 62.2309 130.576 59.168 128.015C55.708 125.122 53.1148 121.128 47.9287 113.143L9.68066 54.2451C6.27112 48.9949 3.91083 45.3586 2.51562 41.4355C0.899107 37.7862 0 33.7482 0 29.5C0 13.3746 12.9383 0.273783 29 0.00683594V0H194.567V0.00683594Z"
                        fill="#FF0000"
                    />
                </svg>
                <span className="relative text-white text-3xl">↑</span>
            </button>
        </div>
    );
}