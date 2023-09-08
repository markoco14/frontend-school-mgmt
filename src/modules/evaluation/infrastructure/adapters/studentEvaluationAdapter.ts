import { StudentEvaluation } from "../../domain/entities/StudentEvaluation";

class StudentEvaluationAdapter {
  public async list({
    student_id,
    details,
  }: {
    student_id?: number;
    details?: boolean;
  }): Promise<StudentEvaluation[]> {
    let url;

    if (student_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/students/${student_id}/daily-evaluations/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/daily-evaluations/`;
    }

    const queryParams: string[] = [];
    if (details) queryParams.push(`details=${encodeURIComponent(details)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const studentEvaluations: StudentEvaluation[] = await res.json();

    return studentEvaluations;
  }

  // public async get({ id }: { id: number }): Promise<EvaluationAttribute> {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/${id}/`,
  //   );
  //   const student: EvaluationAttribute = await res.json();

  //   return student;
  // }
}

export const studentEvaluationAdapter = new StudentEvaluationAdapter();
