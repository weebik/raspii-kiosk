import type { ScheduleEvent } from "../types/scheduleEvent.type";
import courses from "../../../data/raw/courses.json";
import employees from "../../../data/raw/employees.json";
export function timeToMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

export function buildEvents(): ScheduleEvent[] {
    const empMap: Record<number, string> = {};

    Object.values(employees).forEach((e: any) => {
        empMap[e.id] = `${e.firstName} ${e.lastName}`;
    });

    const map = new Map<string, ScheduleEvent>();

    Object.values(courses).forEach((course: any) => {
        course.groups.forEach((g: any) => {
            g.slots.forEach((s: any) => {
                const key = `${course.name}-${g.type}-${s.day}-${s.startTime}-${s.endTime}`;

                const pair = {
                    teacher: s.employeeIds.map((id: number) => empMap[id]).join(", "),
                    room: s.rooms.join(", "),
                };

                if (!map.has(key)) {
                    map.set(key, {
                        id: key,
                        name: course.name,
                        type: g.type,
                        day: s.day,
                        start: timeToMinutes(s.startTime),
                        end: timeToMinutes(s.endTime),
                        pairs: [pair],
                    });
                } else {
                    map.get(key)!.pairs.push(pair);
                }
            });
        });
    });

    return Array.from(map.values());
}

export function groupByTime(events: ScheduleEvent[]) {
    const map = new Map<number, ScheduleEvent[]>();

    events.forEach((e) => {
        if (!map.has(e.start)) map.set(e.start, []);
        map.get(e.start)!.push(e);
    });

    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
}

export function formatTime(min: number) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}:${m.toString().padStart(2, "0")}`;
}