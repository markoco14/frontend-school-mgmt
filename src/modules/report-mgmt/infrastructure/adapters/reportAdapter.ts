import { Report } from "../../domain/entities/Report";

class ReportAdapter {
	public async getReportsAll(): Promise<Report[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-reports-all/`);
		const reports: Report[] = await res.json();

		return reports
	}

	public async getReportByClassAndDate({class_id, date}: {class_id: number, date: string}): Promise<Report> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/reports/date/${date}/`);
		const report: Report = await res.json();
		
		return report
	}

	public async createReportForClassAndDate({class_id, date}: {class_id: number, date: string}): Promise<Report> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/create/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ 
				class_id: class_id,
				date: date 
			}) 
		})
		const report: Report = await response.json();

		return report;
	}

	// public async getTodayReportByStudentId({student_id}: {student_id: number}): Promise<Report[]> {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-today-report-by-student-id/${student_id}`);
	// 	const report: Report[] = await res.json();

	// 	return report
	// }

	// public async updateReportById({report}: {report: Report}): Promise<Report> {		
	// 	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-report/${report.id}/`, { 
	// 		method: 'POST', 
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ id: report.id, is_complete: report.is_complete}) 
	// 	})
	// 	const updatedReport: Report = await response.json();

	// 	return updatedReport;
	// }
}

export const reportAdapter = new ReportAdapter();