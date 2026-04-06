import DateComponent from "./DateComponent";

export default function TopWidgets() {
    return (
        <div className="absolute right-30 top-10 text-right text-white px-5 py-1 z-10 bg-yellow-500">
            <DateComponent />
        </div>
    );
}