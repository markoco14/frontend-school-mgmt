import { School } from "../../domain/entities/School";

class SchoolAdapter {

	public async getSchoolsByOwnerId({ id }: { id: number }): Promise<School[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-schools/${id}/`);
		const schools = await res.json();
		
		const schoolList: School[] = schools.data

		return schoolList;
	}
 
}

export const schoolAdapter = new SchoolAdapter();