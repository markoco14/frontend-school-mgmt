import { ReportDetail } from "../../domain/entities/ReportDetail";

class ReportDetailAdapter {
	public async getReportDetailsByReportId({id}: {id: number}): Promise<ReportDetail[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-report-details-by-report-id/${id}/`);
		const reportDetails: ReportDetail[] = await res.json();

		return reportDetails
	}

	public async updateReportDetailById({id, content, is_complete}: {id: number, content: string, is_complete: number}): Promise<ReportDetail> {
		console.log('hitting endpoint')		
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-report-detail-by-report-id/${id}/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id, content: content, is_complete: is_complete }) 
		})
		const updatedReport: ReportDetail = await response.json();

		return updatedReport;
	}
}

export const reportDetailAdapter = new ReportDetailAdapter();