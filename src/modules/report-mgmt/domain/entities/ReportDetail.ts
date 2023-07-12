import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";

export class ReportDetail {
	constructor(
		public id: number,
		public report_id: number,
		public content: string,
		public student_id: Student,
		public is_complete: boolean,
	) {}
}