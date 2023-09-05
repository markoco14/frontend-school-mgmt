import { Student } from "./Student";

export class StudentAssessment {
  constructor(
    public id: number,
		public student_id: number,
		public assessment_id: number,
		public score: number,
		public date_completed: string,
    public student?: Student,
    public assessment?: any, // TODO: change to Assessment when model created
  ) {}
}
