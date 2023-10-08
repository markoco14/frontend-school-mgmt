import { School } from "../../domain/entities/School";
import Cookie from "js-cookie"

class SchoolAdapter {

	public async listUserSchools(): Promise<School[]> {
		const accessToken =  Cookie.get("accessToken")
		try {
			const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/schools/`,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        },
      );
			
			if (!res.ok) {
				  const errorData = await res.json();
          throw new Error(errorData.detail); 
			}
			const schools = await res.json();
			
			const schoolList: School[] = schools
	
			return schoolList;
		} catch (error) {
			throw new Error('Unauthorized. Please log out and try again.')
		}
	}

	public async addSchool({ schoolName, ownerId }: { schoolName: string, ownerId: number }): Promise<School> {
		const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/schools/add/`,
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