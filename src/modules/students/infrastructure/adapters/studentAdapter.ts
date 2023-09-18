import { PaginatedStudentResponse } from "../../domain/entities/PaginatedStudentResponse";
import { Student } from "./../../domain/entities/Student";

class StudentAdapter {
  //
  //
  // BASIC CRUD
  //
  //

  public async list({
    classEntityId,
    date,
    attendance,
    schoolId,
  }: {
    classEntityId?: number;
    date?: string;
    attendance?: boolean;
    schoolId?: number;
  }): Promise<Student[]> {
    let url;

    if (schoolId) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/students/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/students/`;
    }

    const queryParams: string[] = [];
    if (classEntityId)
      queryParams.push(`class_entity=${encodeURIComponent(classEntityId)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);
    if (attendance)
      queryParams.push(`attendance=${encodeURIComponent(attendance)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const students: Student[] = await res.json();

    return students;
  }

  public async listSchoolStudents({
    id,
    page,
  }: {
    id?: number;
    page: number;
  }): Promise<PaginatedStudentResponse> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/${id}/students/?page=${page}`,
    );
    const students: PaginatedStudentResponse = await res.json();

    return students;
  }

  public async listClassStudents({ id }: { id: number }): Promise<Student[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/classes/${id}/students/`,
    );
    const students: Student[] = await res.json();

    return students;
  }

  public async getStudent({ id }: { id: number }): Promise<Student> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/${id}/`,
    );
    const student: Student = await res.json();

    return student;
  }

  public async addStudent({
    firstName,
    lastName,
    age,
    schoolId,
    gender,
    photo_url,
  }: {
    firstName: string;
    lastName: string;
    age: number;
    schoolId: number;
    gender: number;
    photo_url: string;
  }): Promise<Student> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          age: age,
          school_id: schoolId,
          gender: gender,
          photo_url: photo_url,
        }),
      },
    );
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
    attendance,
  }: {
    classEntityId: number;
    date?: string;
    attendance?: boolean;
  }): Promise<Student[]> {
    let url;
    url = `${process.env.NEXT_PUBLIC_API_URL}/students-here-today/`;

    const queryParams: string[] = [];
    if (classEntityId)
      queryParams.push(`class_entity=${encodeURIComponent(classEntityId)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);
    if (attendance)
      queryParams.push(`attendance=${encodeURIComponent(attendance)}`);

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
    signal,
  }: {
    classId: number;
    date: string;
    signal?: AbortSignal;
  }): Promise<Student[]> {
    let url;
    url = `${process.env.NEXT_PUBLIC_API_URL}/students-with-evaluations/`;

    const queryParams: string[] = [];
    if (classId)
      queryParams.push(`class_entity=${encodeURIComponent(classId)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);
    // if (attendance)
    //   queryParams.push(`attendance=${encodeURIComponent(attendance)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url, { signal });
    const students: Student[] = await res.json();

    return students;
  }
}

export const studentAdapter = new StudentAdapter();
