import { SubjectListResponse } from "@/src/modules/curriculum/entities/SubjectListResponse";
import { Subject } from "@/src/modules/curriculum/entities/Subject";

class SubjectAdapter {
  public async list({
    schoolId,
    class_id,
  }: {
    schoolId: number;
    class_id?: number;
  }): Promise<Subject[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/subjects/`;

    const queryParams: string[] = [];
    if (class_id) queryParams.push(`class_id=${encodeURIComponent(class_id)}`);

    if (schoolId) queryParams.push(`school=${encodeURIComponent(schoolId)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const subjects: Subject[] = await res.json();

    return subjects;
  }

  public async listSchoolSubjects({
    schoolId,
  }: {
    schoolId: number;
  }): Promise<SubjectListResponse> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/?school=${schoolId}`,
    );
    const subjectListResponse: SubjectListResponse = await res.json();

    return subjectListResponse;
  }

  public async addSubject({
    name,
    school,
  }: {
    name: string;
    school?: number;
  }): Promise<Subject> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, school: school }),
    });
    const level: Subject = await res.json();

    return level;
  }

  public async deleteSubject({ id }: { id: number }): Promise<any> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/${id}/`,
      {
        method: "DELETE",
      },
    );

    return res;
  }
}

export const subjectAdapter = new SubjectAdapter();
