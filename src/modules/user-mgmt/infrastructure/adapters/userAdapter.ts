import { Teacher } from "../../domain/entities/Teacher";
import { User } from "../../domain/entities/User";
import { UserProfile } from "../../domain/entities/UserProfile";

class UserAdapter {

	public async getUsers(): Promise<User[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-users/`);
		const users = await res.json();
		
		const userList: User[] = users

		return userList;
	}
	public async getUserProfileById({id}: {id: number}): Promise<UserProfile> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/get/`);
		const user = await res.json();
		
		const userProfile: UserProfile = user

		return userProfile;
	}
 
	public async addUser({ firstName, lastName, email, password }: {firstName: string, lastName: string, email: string, password: string }): Promise<User> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-user/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, password: password }) 
		});
		const user: User = await response.json();

		return user;
	}

	public async updateUser({id, first_name, last_name}: {id: number, first_name: string, last_name: string}): Promise<User> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/update/`, { 
			method: 'PATCH', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: first_name, last_name: last_name }) 
		})
		const userProfile: User = await response.json();
		
		return userProfile;
		
	}

	public async getTeachersBySchool({school, owner}: {school:any, owner: any}): Promise<Teacher[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-teachers-by-school/${school}/${owner}/`);
		const school_users = await res.json();
		
		return school_users;
	}

	public async addTeacher({ first_name, email, password, school_id }: {first_name: string, email: string, password: string, school_id: number }): Promise<Teacher> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-teacher/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: first_name, email: email, password: password, school: school_id }) 
		});
		const teacher: Teacher = await response.json();

		return teacher;
	}
}

export const userAdapter = new UserAdapter();