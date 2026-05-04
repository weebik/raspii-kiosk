
import type { ScheduleEvent } from "../../../types/scheduleEvent.type";
import { formatTime } from "../../../utils/scheduleUtils";

interface ScheduleEventTileProps {
    event: ScheduleEvent;
}

export default function ScheduleEventTile({ event }: ScheduleEventTileProps) {
    return (
        <div
            key={event.id}
            className="bg-white rounded-3xl p-6 flex flex-col"
        >
            <div className="text-title font-bold bg-gray-400/40 p-5 rounded-3xl">
                {event.name}
            </div>

            <div className="text-body text-center mt-2">
                {event.pairs.map((p, i) => (
                    <div key={i}>
                        {p.teacher && p.teacher}
                        {p.teacher && p.room && " - "}
                        {p.room && `sala ${p.room}`}
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <div className="text-body opacity-50">
                    {formatTime(event.start)} - {formatTime(event.end)}
                </div>
                <div className="text-body font-bold text-right opacity-70">
                    {event.type}
                </div>
            </div>
        </div >
    )
}