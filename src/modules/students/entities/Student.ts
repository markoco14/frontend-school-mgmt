import { StudentAttendance } from "@/src/modules/attendance/entities/StudentAttendance";

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
  ) {}
}