import { Report } from "../../domain/entities/Report";

class ReportAdapter {
	public async getReportsAll(): Promise<Report[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-reports-all/`);
		const reports: Report[] = await res.json();

		return reports
	}

	public async createReportForStudent({student_id}: {student_id: number}): Promise<Report> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-report/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ student_id: student_id }) 
		})
		const report: Report = await response.json();

		return report;
	}

	public async getTodayReportByStudentId({student_id}: {student_id: number}): Promise<Report[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-today-report-by-student-id/${student_id}`);
		const report: Report[] = await res.json();

		return report
	}

	public async updateReportById({report}: {report: Report}): Promise<Report> {		
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-report/${report.id}/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: report.id, content: report.content, is_complete: report.is_complete, student_id: report.student_id }) 
		})
		const updatedReport: Report = await response.json();

		return updatedReport;
	}
}

export const reportAdapter = new ReportAdapter();