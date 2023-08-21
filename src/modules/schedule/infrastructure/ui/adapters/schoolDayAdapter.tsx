import { SchoolDay } from "../../../domain/entities/SchoolDay";

// schools/<str:school_pk>/days/
// schools/days/<str:school_day_pk>/

class SchoolDayAdapter {

	public async listSchoolSchoolDays({schoolId}: {schoolId: number}): Promise<SchoolDay[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/days/`);
		const schoolDayList: SchoolDay[] = await res.json();

		return schoolDayList
	}

	// public async addSchoolDay({schoolId, day}: {schoolId: number, day: string}): Promise<SchoolDay> {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/days/`, { 
	// 		method: 'POST', 
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ day: day }) 
	// 	});
	// 	const level: SchoolDay = await res.json();

	// 	return level

	// }

}

export const schoolDayAdapter = new SchoolDayAdapter();