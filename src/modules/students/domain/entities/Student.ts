import { StudentAttendance } from "@/src/modules/attendance/domain/entities/StudentAttendance";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";

export class Student {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public age: number,
    public gender: number,
    public photo_url: string,
    public school_id: number,
    public attendance_for_day?: StudentAttendance,
    public evaluations_for_day?: StudentEvaluation[],
  ) {}
}