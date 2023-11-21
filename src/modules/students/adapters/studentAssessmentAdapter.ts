import { StudentAssessment } from "@/src/modules/students/entities/StudentAssessment";

class StudentAssessmentAdapter {
  public async list({
    student_id,
    details,
  }: {
    student_id?: number;
    details?: boolean;
  }): Promise<StudentAssessment[]> {
    let url;

    if (student_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/students/${student_id}/student-assessments/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/student-assessments/`;
    }

    const queryParams: string[] = [];
    if (details) queryParams.push(`details=${encodeURIComponent(details)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const studentAttendance: StudentAssessment[] = await res.json();

    return studentAttendance;
  }

  public async get({ id }: { id: number }): Promise<StudentAssessment> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/student-assessments/${id}/`,
    );
    const student: StudentAssessment = await res.json();

    return student;
  }
}

export const studentAssessmentAdapter = new StudentAssessmentAdapter();
