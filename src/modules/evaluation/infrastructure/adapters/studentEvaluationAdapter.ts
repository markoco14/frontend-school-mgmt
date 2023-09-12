import { StudentEvaluationFilters } from "@/src/modules/students/domain/entities/StudentEvaluationFilters";
import { StudentEvaluation } from "../../domain/entities/StudentEvaluation";
import { Student } from "@/src/modules/students/domain/entities/Student";

class StudentEvaluationAdapter {
  //
  //
  // BASIC CRUD
  //
  //

  public async list({
    student_id,
    details,
    filters,
    date,
    class_id,
  }: {
    student_id?: number;
    details?: boolean;
    filters?: StudentEvaluationFilters;
    date?: string;
    class_id?: number;
  }): Promise<StudentEvaluation[]> {
    let url;

    if (student_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/students/${student_id}/daily-evaluations/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/daily-evaluations/`;
    }

    const queryParams: string[] = [];
    if (details) queryParams.push(`details=${encodeURIComponent(details)}`);
    if (date) queryParams.push(`date=${encodeURIComponent(date)}`);
    if (class_id) queryParams.push(`class_id=${encodeURIComponent(class_id)}`);

    filters &&
      Object.keys(filters)?.forEach((key) => {
        // @ts-ignore
        if (filters[key] !== undefined) {
          // @ts-ignore
          queryParams.push(`${key}=${encodeURIComponent(filters[key])}`);
        }
      });

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const studentEvaluations: StudentEvaluation[] = await res.json();

    return studentEvaluations;
  }

  // public async get({ id }: { id: number }): Promise<EvaluationAttribute> {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/student-evaluations/${id}/`,
  //   );
  //   const student: EvaluationAttribute = await res.json();

  //   return student;
  // }

  public async patch({
    evaluation_id,
    evaluation_value,
  }: {
    evaluation_id: number;
    evaluation_value?: string;
  }): Promise<StudentEvaluation> {
    const requestBody: { [key: string]: any } = {};

    if (evaluation_value !== undefined) {
      requestBody.evaluation_value = evaluation_value;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/daily-evaluations/${evaluation_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );
    const updatedAttendance: StudentEvaluation = await res.json();

    return updatedAttendance;
  }

  //
  //
  // SPECIALIZED
  //
  //

  // URL: create-student-evaluations/

  public async batchCreateEvaluations({
    schoolId,
    students,
    classId,
    // classAttendance,
    date,
    userId,
    subjectId,
  }: {
    schoolId: number;
    students: Student[];
    classId: number;
    // classAttendance: Student[];
    date: string;
    userId: number;
    subjectId: number;
  }): Promise<Student[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/create-student-evaluations/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          school_id: schoolId,
          class_id: classId,
          students: students,
          date: date,
          user_id: userId,
          subject_id: subjectId,
        }),
      },
    );

    const studentsWithAttendance: Student[] = await res.json();

    return studentsWithAttendance;
  }
}

export const studentEvaluationAdapter = new StudentEvaluationAdapter();
