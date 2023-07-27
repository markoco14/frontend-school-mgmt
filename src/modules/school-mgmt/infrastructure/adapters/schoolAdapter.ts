import { School } from "../../domain/entities/School";

class SchoolAdapter {

	public async getSchoolsByUserAccess({id}: {id: number}): Promise<School[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-schools-by-user-access/${id}/`);
		const schools = await res.json();
		
		const schoolList: School[] = schools

		return schoolList;
	}

	public async getSchoolsByOwnerId({ id }: { id: number }): Promise<School[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-schools/${id}/`);
		const schools = await res.json();
		
		const schoolList: School[] = schools

		return schoolList;
	}

	public async addSchool({ schoolName, ownerId }: { schoolName: string, ownerId: number }): Promise<School> {
		const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/add-school/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: schoolName,
						owner_id: ownerId,
					}),
				}
			);
		const data = await response.json();
		const school: School = data

		return school
	}
 
}

export const schoolAdapter = new SchoolAdapter();