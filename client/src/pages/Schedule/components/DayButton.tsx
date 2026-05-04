interface DayButtonProps {
    label: string;
    active?: boolean;
    onClick: () => void;
}

export default function DayButton({ label, active, onClick }: DayButtonProps) {
    return (
        <button
            onClick={onClick}
            className="relative w-95 h-46 flex items-center justify-center text-lg font-semibold "
        >
            <svg
                viewBox="0 0 400 170"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="400"
                    y="170"
                    width="400"
                    height="170"
                    rx="54"
                    transform="rotate(180 400 170)"
                    className={active ? "fill-white" : "fill-white/80"}
                />
            </svg>

            <span className='relative text-title z-10 text-black'>
                {label}
            </span>
        </button>
    );
}