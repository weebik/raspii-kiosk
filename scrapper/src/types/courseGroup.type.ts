import { type CourseSlot } from "./courseSlot.type.ts";

export type CourseGroup = {
  type: 'wykład' | 'ćwiczenia' | 'pracownia' | 'seminarium' | 'repetytorium' | 'ćwiczenio-pracownia';
  slots: CourseSlot[];
};