import { Teacher } from "@/src/modules/user-mgmt/domain/entities/Teacher";

class SchoolTeacherAdapter {

	public async getTeachersBySchool({school, owner}: {school:any, owner: any}): Promise<Teacher[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${school}/teachers/`);
		const school_users = await res.json();
		
		return school_users;
	}

	
 
}

export const schoolTeacherAdapter = new SchoolTeacherAdapter();