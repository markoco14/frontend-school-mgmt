import { Student } from "@/src/modules/students/entities/Student";
import Cookie from "js-cookie";
import { NewStudent } from "../entities/NewStudent";

class StudentAdapter {
  //
  //
  // BASIC CRUD
  //
  //

  public async list({
    classEntityId,
    date,
    schoolId,
  }: {
    classEntityId?: number;
    date?: string;
    schoolId?: number;
  }): Promise<Student[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/students/`;

    const queryParams: string[] = [];
    if (schoolId) queryParams.push(`school=${encodeURIComponent(schoolId)}`);
    if (classEntityId)
      queryParams.push(`class_entity=${encodeURIComponent(classEntityId)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const students: Student[] = await res.json();

    return students;
  }

  public async listSchoolStudents({
    schoolSlug,
    page,
  }: {
    schoolSlug?: string;
    page: number;
  }): Promise<Student[]> {
    const accessToken = Cookie.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/?school=${schoolSlug}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const students = await res.json();

    return students;
  }

  public async listClassStudents({ id }: { id: number }): Promise<Student[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/classes/${id}/students/`,
    );
    const students: Student[] = await res.json();

    return students;
  }

  public async getStudentByID({ id, signal }: { id: number; signal: AbortSignal }): Promise<Student> {
    const accessToken = Cookie.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/${id}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        signal
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail) 
    }

    const student: Student = await res.json();

    return student;
  }

  public async addStudent({
    newStudent
  }: {
    newStudent: NewStudent;
  }): Promise<Student> {
    const accessToken = Cookie.get("accessToken");

    if (!accessToken) {
      throw new Error("No access token.")
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/new`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail)
    }

    const student: Student = await response.json();

    return student;
  }

  public async deleteStudentById({ id }: { id: number }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/${id}/`,
      {
        method: "DELETE",
      },
    );

    return response;
  }

  //
  //
  // SPECIALIZED ROUTES

  public async listStudentsPresentToday({
    classEntityId,
    date,
  }: {
    classEntityId: number;
    date?: string;
  }): Promise<Student[]> {
    let url;
    url = `${process.env.NEXT_PUBLIC_API_URL}/students-here-today/`;

    const queryParams: string[] = [];
    if (classEntityId)
      queryParams.push(`class_entity=${encodeURIComponent(classEntityId)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const students: Student[] = await res.json();

    return students;
  }

  public async listPresentStudentsWithEvaluations({
    classId,
    date,
    present,
    signal,
  }: {
    classId: number;
    date: string;
    present?: boolean;
    signal?: AbortSignal;
  }): Promise<Student[]> {
    let url;
    url = `${process.env.NEXT_PUBLIC_API_URL}/students-with-evaluations/`;

    const queryParams: string[] = [];
    if (classId)
      queryParams.push(`class_entity=${encodeURIComponent(classId)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);
    if (present) queryParams.push(`present=${encodeURIComponent(present)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url, { signal });
    const students: Student[] = await res.json();

    return students;
  }
}

export const studentAdapter = new StudentAdapter();
