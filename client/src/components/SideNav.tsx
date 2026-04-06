import { useLocation, useNavigate } from "react-router";
import routes from "../utils/routes";

export default function SideNav() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="absolute left-8 top-50 bottom-50 flex flex-col justify-center gap-5 z-10">
            {routes.map((r, index) => (
                <NavButton
                    key={r.path}
                    active={location.pathname === r.path}
                    onClick={() => navigate(r.path)}
                    type={index === 0 ? "top" : index === routes.length - 1 ? "bottom" : "mid"}
                    children={r.icon}
                />
            ))}
        </div>
    );
}

interface NavButtonProps {
    type: "top" | "mid" | "bottom";
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

function NavButton({
    type,
    active,
    onClick,
    children,
}: NavButtonProps) {
    return (
        <button onClick={onClick} className="relative w-full">
            <div
                className={`transition ${active ? "scale-105 opacity-100" : "opacity-70 group-hover:opacity-100"
                    }`}
            >
                {type === "top" && <TopButton />}
                {type === "mid" && <MidButton />}
                {type === "bottom" && <BottomButton />}
            </div>

            <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none ${type === "top" ? "mt-7" : type === "bottom" ? "-mt-7" : ""}`}>
                {children}
            </div>
        </button >
    );
}

function TopButton() {
    return (
        <svg width="135" height="173" viewBox="0 0 135 173" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.5 0C33.7482 0 37.7862 0.899107 41.4355 2.51562C45.3586 3.91083 48.9949 6.27112 54.2451 9.68066L113.143 47.9287C121.128 53.1148 125.122 55.708 128.015 59.168C130.576 62.2309 132.5 65.7748 133.674 69.5908C135 73.9016 135 78.6627 135 88.1846V124.567C135 141.369 135 149.77 131.73 156.188C128.854 161.832 124.265 166.422 118.62 169.298C112.203 172.568 103.802 172.567 87 172.567H48C31.1984 172.567 22.7972 172.568 16.3799 169.298C10.7352 166.422 6.1457 161.832 3.26953 156.188C-0.000273228 149.77 0 141.369 0 124.567V29H0.00683594C0.273783 12.9383 13.3746 0 29.5 0Z" fill="#FF0000" />
        </svg>
    );
}

function MidButton() {
    return (
        <svg width="135" height="135" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="135" width="135" height="135" rx="30" transform="rotate(90 135 0)" fill="#FF0000" />
        </svg>
    );
}

function BottomButton() {
    return (
        <svg width="135" height="173" viewBox="0 0 135 173" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.5 172.567C33.7482 172.567 37.7862 171.668 41.4355 170.052C45.3586 168.657 48.9949 166.296 54.2451 162.887L113.143 124.639C121.128 119.453 125.122 116.859 128.015 113.399C130.576 110.336 132.5 106.793 133.674 102.977C135 98.6658 135 93.9047 135 84.3828V48C135 31.1984 135 22.7972 131.73 16.3799C128.854 10.7352 124.265 6.1457 118.62 3.26953C112.203 -0.000273228 103.802 0 87 0H48C31.1984 0 22.7972 -0.000273228 16.3799 3.26953C10.7352 6.1457 6.1457 10.7352 3.26953 16.3799C-0.000273228 22.7972 0 31.1984 0 48V143.567H0.00683594C0.273783 159.629 13.3746 172.567 29.5 172.567Z" fill="#FF0000" />
        </svg>
    );
}