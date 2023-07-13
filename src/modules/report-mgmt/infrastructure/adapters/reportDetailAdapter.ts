import { ReportDetail } from "../../domain/entities/ReportDetail";

class ReportDetailAdapter {

	public async getReportDetailsByReportId({id}: {id: number}): Promise<ReportDetail[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-report-details-by-report-id/${id}/`);
		const reportDetails: ReportDetail[] = await res.json();
		
		return reportDetails
	}

	public async createReportDetails({student_id, report_id}: {student_id: number, report_id: number}): Promise<ReportDetail> {
		console.log(`creating report detail for report ${report_id} student ${student_id}`)
		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-report-details-by-report-id/${id}/`);
		// const reportDetails: ReportDetail = await res.json();
		
		// return reportDetails
	}

	public async updateReportDetailById({id, content}: {id: number, content: string}): Promise<ReportDetail> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-report-details/${id}/`, { 
			method: 'PUT', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ content: content }) 
		})
		const updatedReport: ReportDetail = await response.json();
		
		return updatedReport;
	}
}

export const reportDetailAdapter = new ReportDetailAdapter();