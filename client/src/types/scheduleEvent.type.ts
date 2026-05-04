export type ScheduleEvent = {
    id: string;
    name: string;
    type: string;
    day: number;
    start: number;
    end: number;
    pairs: { teacher: string; room: string }[];
};