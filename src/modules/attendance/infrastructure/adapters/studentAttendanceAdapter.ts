import { ClassStudent } from "@/src/modules/classes/entities/ClassStudent";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { StudentAttendance } from "../../domain/entities/StudentAttendance";

// students-with-attendance/?class_entity=36&date=2023-09-11
class StudentAttendanceAdapter {
  public async listStudentsWithAttendance({
    classId,
    date,
    signal,
  }: {
    classId: number;
    date: string;
    signal?: AbortSignal;
  }): Promise<Student[]> {
    let url;

    url = `${process.env.NEXT_PUBLIC_API_URL}/students-with-attendance/`;

    const queryParams: string[] = [];
    if (classId)
      queryParams.push(`class_entity=${encodeURIComponent(classId)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url, { signal });
    const studentsWithAttendance: Student[] = await res.json();

    return studentsWithAttendance;
  }

  public async list({
    school_id,
    school_class,
    date,
    details,
  }: {
    school_id?: number;
    school_class?: number;
    date?: string;
    details?: boolean;
  }): Promise<StudentAttendance[]> {

    let url = `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/`;
   
    const queryParams: string[] = [];
    if (school_id) queryParams.push(`school=${encodeURIComponent(school_id)}`)
    if (school_class)
      queryParams.push(`school_class=${encodeURIComponent(school_class)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);
    if (details) queryParams.push(`details=${encodeURIComponent(details)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const studentAttendance: StudentAttendance[] = await res.json();

    return studentAttendance;
  }

  public async get({ id }: { id: number }): Promise<StudentAttendance> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/${id}/`,
    );
    const student: StudentAttendance = await res.json();

    return student;
  }

  public async batchCreateAttendance({
    classId,
    classAttendance,
    date,
    userId,
  }: {
    classId: number;
    classAttendance: Student[];
    date: string;
    userId: number;
  }): Promise<Student[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/batch-student-attendances/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_id: classId,
          students: classAttendance,
          date: date,
          user_id: userId,
        }),
      },
    );

    const studentsWithAttendance: Student[] = await res.json();

    return studentsWithAttendance;
  }

  public async patch({
    attendance_id,
    status,
    reason,
  }: {
    attendance_id: number;
    status?: number;
    reason?: string | null;
  }): Promise<StudentAttendance> {
    const requestBody: { [key: string]: any } = {};

    if (status !== undefined) {
      requestBody.status = status;
    }

    if (reason !== undefined) {
      requestBody.reason = reason;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/${attendance_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );
    const updatedAttendance: StudentAttendance = await res.json();

    return updatedAttendance;
  }
}

export const studentAttendanceAdapter = new StudentAttendanceAdapter();
