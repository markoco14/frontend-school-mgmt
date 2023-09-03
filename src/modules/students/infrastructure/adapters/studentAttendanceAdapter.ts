import { StudentAttendance } from "../../domain/entities/StudentAttendance";

class StudentAttendanceAdapter {
  public async listBySchool({
    school_id,
  }: {
    school_id?: number;
  }): Promise<StudentAttendance[]> {
    let url;

    if (school_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/student-attendances/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/`;
    }
    const res = await fetch(url);
    const studentAttendance: StudentAttendance[] = await res.json();

    return studentAttendance;
  }

  public async list({
    school_id,
    school_class,
    date,
  }: {
    school_id?: number;
    school_class?: number;
    date?: string;
  }): Promise<StudentAttendance[]> {
    let url;

    if (school_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/student-attendances/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/`;
    }

    const queryParams: string[] = [];
    if (school_class) queryParams.push(`school_class=${encodeURIComponent(school_class)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);

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

  public async add({
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
  }): Promise<StudentAttendance> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studentAttendance/`,
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
    const student: StudentAttendance = await response.json();

    return student;
  }

  public async delete({ id }: { id: number }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studentAttendance/${id}/`,
      {
        method: "DELETE",
      },
    );

    return response;
  }
}

export const studentAttendanceAdapter = new StudentAttendanceAdapter();
