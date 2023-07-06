import { School } from "../../domain/entities/School";

class SchoolAdapter {

	public async getSchoolsByOwnerId({ id }: { id: number }): Promise<School[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-schools/${id}/`);
		const schools = await res.json();
		
		const schoolList: School[] = schools.data

		return schoolList;
	}

	public async addSchool({ schoolName, id }: { schoolName: string, id: number }): Promise<School> {
		const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/add-school/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: schoolName,
						owner: id,
					}),
				}
			);
		const data = await response.json();
		const school: School = data.data

		return school
	}
 
}

export const schoolAdapter = new SchoolAdapter();