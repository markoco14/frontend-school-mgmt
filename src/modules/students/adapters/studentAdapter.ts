import { PaginatedStudentResponse } from "@/src/modules/students/entities/PaginatedStudentResponse";
import { Student } from "@/src/modules/students/entities/Student";
import Cookie from "js-cookie";

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
    let url = `${process.env.NEXT_PUBLIC_API_URL}/students/`;

    const queryParams: string[] = [];
    if (schoolId) queryParams.push(`school=${encodeURIComponent(schoolId)}`);
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
    schoolSlug,
    page,
  }: {
    schoolSlug?: string;
    page: number;
  }): Promise<PaginatedStudentResponse> {
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
