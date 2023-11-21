import { Student } from "@/src/modules/students/entities/Student";

export class ReportDetail {
	constructor(
		public id: number,
		public report_id: number,
		public details: {
			comment: string,
			testScore: number,
			newHmwkCorrections: number,
			prevHmwkComplete: number,
		},
		public student_id: number,
		public student_info: Student,
	) {}
}