import { Report } from "../../domain/entities/Report";

class ReportAdapter {
	public async getReportsAll(): Promise<Report[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-reports-all/`);
		const reports: Report[] = await res.json();

		return reports
	}
}

export const reportAdapter = new ReportAdapter();