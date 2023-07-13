import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";

export class ReportDetail {
	constructor(
		public id: number,
		public report_id: number,
		public content: string,
		public student_id: number,
		public student_info: Student,
	) {}
}