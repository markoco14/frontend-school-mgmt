import { ReportDetail } from "../../domain/entities/ReportDetail";

class ReportDetailAdapter {
	public async getReportDetailsByReportId({id}: {id: number}): Promise<ReportDetail[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-report-details-by-report-id/${id}/`);
		const reportDetails: ReportDetail[] = await res.json();

		return reportDetails
	}

	public async updateReportDetailById({id, content, report_id, student_id}: {id: number, content: string, report_id: number, student_id: number}): Promise<ReportDetail> {
		console.log('hitting endpoint')
		console.log(id, content, report_id, student_id)		
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-report-detail-by-detail-id/${id}/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id, content: content, report_id: report_id, student_id: student_id }) 
		})
		const updatedReport: ReportDetail = await response.json();
		console.log('made it to end')
		return updatedReport;
	}
}

export const reportDetailAdapter = new ReportDetailAdapter();