import { useMemo, useRef, useState } from "react";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import DayButton from "./components/DayButton";
import PageLayout from "../../components/PageLayout";
import { buildEvents, groupByTime, formatTime } from "../../utils/scheduleUtils";
import ScheduleEventTile from "./components/ScheduleEventTile";

const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

export default function SchedulePage() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [day, setDay] = useState(1);

    const events = useMemo(() => {
        return buildEvents().filter(e => e.day === day);
    }, [day]);

    const grouped = useMemo(() => groupByTime(events), [events]);

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            <ScrollToTopButton containerRef={scrollRef} />
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto overscroll-y-auto [scrollbar-width:0px] [&::-webkit-scrollbar]:hidden"
            >
                <PageLayout
                    title="Plan zajęć"
                >
                    <div className="flex flex-row w-full">
                        <div className="w-13/4">
                            <div className="flex flex-col gap-8 mr-10 mb-10">
                                {grouped.map(([time, events]) => (
                                    <div key={time} className="flex flex-col gap-4">

                                        <div className="text-title font-bold opacity-70">
                                            {formatTime(time)}
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            {events.map((event) => (
                                                <ScheduleEventTile key={event.id} event={event} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full ">
                            <div className="fixed top-58 right-15 flex flex-col">
                                {days.map((d, i) => (
                                    <DayButton
                                        key={i}
                                        label={d}
                                        active={day === i + 1}
                                        onClick={() => setDay(i + 1)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </PageLayout>
            </div>
        </div>
    );
}