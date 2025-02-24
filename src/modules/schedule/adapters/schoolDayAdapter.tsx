import { SchoolDay } from "@/src/modules/schools/entities/SchoolDay";

class SchoolDayAdapter {

	public async listSchoolSchoolDays({ schoolId }: { schoolId?: number }): Promise<SchoolDay[]> {

		let url;

		url = `${process.env.NEXT_PUBLIC_API_URL}/school-days/`;

		const queryParams: string[] = [];
		if (schoolId) queryParams.push(`school=${encodeURIComponent(schoolId)}`);

		if (queryParams.length) {
			url += `?${queryParams.join("&")}`;
		}
		const res = await fetch(url);
		const schoolDayList: SchoolDay[] = await res.json();

		return schoolDayList
	}

	public async addSchoolDay({ schoolId, day }: { schoolId: number, day: number }): Promise<SchoolDay> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/school-days/`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				day: day,
				school: schoolId
			})
		});
		const level: SchoolDay = await res.json();

		return level

	}
	public async deleteSchoolDay({ schoolDayId }: { schoolDayId: number }) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/school-days/${schoolDayId}/`, {
			method: 'DELETE'
		})

		return response;

	}

}

export const schoolDayAdapter = new SchoolDayAdapter();