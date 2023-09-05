import { ClassAssessment } from "../../domain/entities/ClassAssessment";

class ClassAssessmentAdapter {
  public async list({
    class_id,
    details,
  }: {
    class_id?: number;
    details?: boolean;
  }): Promise<ClassAssessment[]> {
    let url;

    if (class_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/class-assessments/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/class-assessments/`;
    }

    const queryParams: string[] = [];
    if (details) queryParams.push(`details=${encodeURIComponent(details)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const classAssessments: ClassAssessment[] = await res.json();

    return classAssessments;
  }

  // public async get({ id }: { id: number }): Promise<ClassAssessment> {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/student-attendances/${id}/`,
  //   );
  //   const student: ClassAssessment = await res.json();

  //   return student;
  // }
}

export const classAssessmentAdapter = new ClassAssessmentAdapter();
