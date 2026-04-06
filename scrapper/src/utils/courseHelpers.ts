import { type CourseGroup } from "../types/courseGroup.type.ts";

export function parseDay(text: string): number {
  const map: Record<string, number> = {
    pn: 1,
    wt: 2,
    śr: 3,
    cz: 4,
    pt: 5,
    sb: 6,
    nd: 7,
  };

  const key = text.trim().slice(0, 2).toLowerCase();
  return map[key] || 0;
}

export function parseTime(text: string) {
  const match = text.match(/(\d{2}:\d{2})-(\d{2}:\d{2})/);
  return match
    ? { start: match[1], end: match[2] }
    : { start: '', end: '' };
}

export function parseRoom(text: string): string | null {
  const match = text.match(/\(s\.\s*([^)]+)\)/);
  const room = match?.[1]?.trim();

  if (!room || room === 'brak danych') return null;
  return room;
}

export function mapGroupType(title: string): CourseGroup['type'] | null {
  const t = title.toLowerCase();

  if (t.includes('wyk')) return 'wykład';
  if (t.includes('czenio-praco')) return 'ćwiczenio-pracownia';
  if (t.includes('ćwicz')) return 'ćwiczenia';
  if (t.includes('prac')) return 'pracownia';
  if (t.includes('sem')) return 'seminarium';
  if (t.includes('rep')) return 'repetytorium';

  return null;
}