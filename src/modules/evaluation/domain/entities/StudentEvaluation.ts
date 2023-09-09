import { Student } from "@/src/modules/students/domain/entities/Student";

export class StudentEvaluation {
  constructor(
    public id: number,
    public evaluation_type: number,
    public student_id: number,
    public author_id: number,
    public date: string,
    public evaluation_attribute_id: number,
    public evaluation_value: string | number,
    public class_id: number,
    public subject_id: number,
    public level_id: number,
    public evaluation_attribute?: any,
		public student?: Student,
  ) {}
}
