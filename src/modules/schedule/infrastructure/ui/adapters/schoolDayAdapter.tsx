import { SchoolDay } from "@/src/modules/school-mgmt/domain/entities/SchoolDay";

class SchoolDayAdapter {

	public async listSchoolSchoolDays({schoolId}: {schoolId: number}): Promise<SchoolDay[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/days/`);
		const schoolDayList: SchoolDay[] = await res.json();

		return schoolDayList
	}

	public async addSchoolDay({schoolId, day}: {schoolId: number, day: number}): Promise<SchoolDay> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/days/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ day: day }) 
		});
		const level: SchoolDay = await res.json();

		return level

	}
	public async deleteSchoolDay({schoolDayId}: {schoolDayId: number}) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/days/${schoolDayId}/`,{
			method: 'DELETE'
		})

		return response;

	}

}

export const schoolDayAdapter = new SchoolDayAdapter();