import { User } from "../../domain/entities/User";

class UserAdapter {

	public async getUsers(): Promise<User[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-users/`);
		const users = await res.json();
		
		const userList: User[] = users

		return userList;
	}
 
}

export const userAdapter = new UserAdapter();