import { StudentAttendance } from "@/src/modules/attendance/entities/StudentAttendance";

export class Student {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public age: number,
    public gender: number,
    public photoUrl: string,
    public schoolID: number,
  ) {}
}