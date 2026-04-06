import { type CourseGroup } from "./courseGroup.type.ts";

export type Course = {
  id: number;
  name: string;
  groups: CourseGroup[];
};