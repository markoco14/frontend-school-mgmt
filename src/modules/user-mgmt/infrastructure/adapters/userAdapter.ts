import { User } from "../../domain/entities/User";

class UserAdapter {

	public async getUsers(): Promise<User[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-users/`);
		const users = await res.json();
		
		const userList: User[] = users

		return userList;
	}
 
	public async addUser({ firstName, lastName }: {firstName: string, lastName: string }): Promise<User> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-user/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: firstName, last_name: lastName }) 
		});
		const user: User = await response.json();

		return user;
	}
}

export const userAdapter = new UserAdapter();