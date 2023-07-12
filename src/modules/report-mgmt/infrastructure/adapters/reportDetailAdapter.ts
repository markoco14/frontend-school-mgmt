import { ReportDetail } from "../../domain/entities/ReportDetail";

class ReportDetailAdapter {
	public async getReportDetailsByReportId({id}: {id: number}): Promise<ReportDetail[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-report-details-by-report-id/${id}/`);
		const reportDetails: ReportDetail[] = await res.json();

		return reportDetails
	}
}

export const reportDetailAdapter = new ReportDetailAdapter();