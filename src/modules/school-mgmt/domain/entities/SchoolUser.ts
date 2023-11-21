import { User } from "@/src/modules/user-mgmt/entities/User";

export class SchoolUser {
	constructor(public school: number, public user: User, public id: number) {}
}