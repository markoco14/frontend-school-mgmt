import { Student } from "@/src/modules/students/entities/Student";

export class ClassStudent {
  constructor(
    public id: number,
    public class_id: number,
    public student_id: number,
    public student?: Student,
  ) {}
}
