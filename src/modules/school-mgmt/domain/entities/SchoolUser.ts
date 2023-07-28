import { User } from "@/src/modules/user-mgmt/domain/entities/User";

export class SchoolUser {
	constructor(public school: number, public user: User, public id: number) {}
}