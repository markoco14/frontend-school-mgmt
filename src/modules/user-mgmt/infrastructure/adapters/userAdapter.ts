import { PasswordSuccessResponse } from "../../domain/entities/PasswordSuccessResponse";
import { Teacher } from "../../domain/entities/Teacher";
import { User } from "../../domain/entities/User";
import { UserProfile } from "../../domain/entities/UserProfile";

class UserAdapter {
  public async getUsers(): Promise<User[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`);
    const users = await res.json();

    const userList: User[] = users;

    return userList;
  }
  public async getUserProfileById({
    id,
  }: {
    id: number;
  }): Promise<UserProfile> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/get/`,
    );
    const user = await res.json();

    const userProfile: UserProfile = user;

    return userProfile;
  }

  public async addUser({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      },
    );
    const user: User = await response.json();

    return user;
  }

  public async updateUser({
    id,
    first_name,
    last_name,
  }: {
    id: number;
    first_name: string;
    last_name: string;
  }): Promise<User> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/update/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name: first_name, last_name: last_name }),
      },
    );
    const userProfile: User = await response.json();

    return userProfile;
  }

  public async changeUserPassword({
    id,
    current_password,
    new_password,
  }: {
    id: number;
    current_password: string;
    new_password: string;
  }): Promise<PasswordSuccessResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/change-password/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: current_password,
          new_password: new_password,
        }),
      },
    );
    const detail: PasswordSuccessResponse = await response.json();

    return detail;
  }

  // TEACHER REQUESTS

  public async listTeachers(): Promise<Teacher[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teachers/`);
    const teachers = await res.json();

    const teacherList: Teacher[] = teachers;

    return teacherList;
  }

  public async listSchoolTeachers({ id }: { id?: number }): Promise<User[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/${id}/teachers/`,
    );
    const teachers = await res.json();

    const teacherList: User[] = teachers;

    return teacherList;
  }
  public async listSchoolAdmins({
    school_id,
  }: {
    school_id: number;
  }): Promise<User[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/admins/`,
    );
    const admins = await res.json();

    const adminList: User[] = admins;

    return adminList;
  }

  public async addTeacher({
    first_name,
    email,
    password,
    school_id,
  }: {
    first_name: string;
    email: string;
    password: string;
    school_id: number;
  }): Promise<Teacher> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/teachers/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          email: email,
          password: password,
          school: school_id,
        }),
      },
    );
    const teacher: Teacher = await response.json();

    return teacher;
  }

  public async addAdmin({
    first_name,
    email,
    password,
    school_id,
  }: {
    first_name: string;
    email: string;
    password: string;
    school_id?: number;
  }): Promise<Teacher> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/admins/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          email: email,
          password: password,
          school: school_id,
        }),
      },
    );
    const admin: User = await response.json();

    return admin;
  }
}

export const userAdapter = new UserAdapter();
