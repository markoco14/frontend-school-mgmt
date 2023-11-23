import { User } from "@/src/modules/user-mgmt/entities/User";
import { Student } from "@/src/modules/students/entities/Student";

export class StudentAttendance {
  constructor(
    public id: number,
    public student_id: number,
    public date: string,
    public status: number,
    public reason: string,
    public author_id: number,
    public student?: Student,
    public author?: User,
  ) {}
}
