import { ReportDetail } from "../../domain/entities/ReportDetail";

class ReportDetailAdapter {

	public async getReportDetailsByReportId({id}: {id: number}): Promise<ReportDetail[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/${id}/details/`);
		const reportDetails: ReportDetail[] = await res.json();
		
		return reportDetails
	}

	// public async createReportDetails({student_id, report_id}: {student_id: number, report_id: number}): Promise<ReportDetail> {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/details/create/`, { 
	// 		method: 'POST', 
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ 
	// 			student_id: student_id,
	// 			report_id: report_id 
	// 		}) 
	// 	});
	// 	const reportDetail: ReportDetail = await res.json();
		
	// 	return reportDetail
	// }

	public async updateReportDetailById({id, data}: {id: number, data: any}): Promise<ReportDetail> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/details/${id}/`, { 
			method: 'PUT', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ details: data }) 
		})
		const updatedReport: ReportDetail = await response.json();
		
		return updatedReport;
	}
}

export const reportDetailAdapter = new ReportDetailAdapter();