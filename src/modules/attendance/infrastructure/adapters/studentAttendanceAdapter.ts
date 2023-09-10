import { ClassStudent } from "@/src/modules/classes/domain/entities/ClassStudent";
import { StudentAttendance } from "../../domain/entities/StudentAttendance";

class StudentAttendanceAdapter {
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
    let url;

    if (school_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/student-attendances/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/`;
    }

    const queryParams: string[] = [];
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

  public async batchCreateAttendance({classList, date, userId}: {classList: ClassStudent[], date: string, userId: number}): Promise<StudentAttendance[]> {
    console.log('class list in adapter', classList)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/batch-student-attendances/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_list: classList,
          date: date,
          user_id: userId,
        }),
      },
    );

    const attendanceRecords: StudentAttendance[] = await res.json();

    return attendanceRecords;
  }

  public async patch({
    attendance_id,
    status,
  }: {
    attendance_id: number;
    status: number;
  }): Promise<StudentAttendance> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/${attendance_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      },
    );
    const updatedAttendance: StudentAttendance = await res.json();

    return updatedAttendance;
  }
  public async patchReason({
    attendance_id,
    reason,
  }: {
    attendance_id: number;
    reason: string;
  }): Promise<StudentAttendance> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/${attendance_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: reason }),
      },
    );
    const updatedAttendance: StudentAttendance = await res.json();

    return updatedAttendance;
  }
}

export const studentAttendanceAdapter = new StudentAttendanceAdapter();
