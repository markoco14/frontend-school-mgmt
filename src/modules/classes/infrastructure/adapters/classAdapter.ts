import { ClassEntity } from "../../domain/entities/ClassEntity";

class ClassAdapter {
  public async list({
    school_id,
    day,
    signal,
  }: {
    school_id?: number;
    day?: string;
    signal?: AbortSignal;
  }): Promise<ClassEntity[]> {
    let url;

    url = `${process.env.NEXT_PUBLIC_API_URL}/classes/`;
    
    const queryParams: string[] = [];
    if (day) queryParams.push(`day=${encodeURIComponent(day)}`);
    if (school_id) queryParams.push(`school=${encodeURIComponent(school_id)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url, {signal});
    const classEntity: ClassEntity[] = await res.json();

    return classEntity;
  }

  public async getClassById({
    class_id,
  }: {
    class_id: number;
  }): Promise<ClassEntity> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/`,
    );
    const thisClass: ClassEntity = await res.json();

    return thisClass;
  }

  public async addClass({
    name,
    school_id,
    level,
    days,
  }: {
    name: string;
    school_id: number;
    level: number;
    days: number[];
  }): Promise<ClassEntity> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        school: school_id,
        level: level,
        days: days,
      }),
    });
    const newClass: ClassEntity = await res.json();

    return newClass;
  }

  public async deleteClass({ class_id }: { class_id: number }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/`,
      {
        method: "DELETE",
      },
    );

    return response;
  }

  public async addClassTeacher({
    class_id,
    teacher_id,
  }: {
    class_id: number;
    teacher_id: number;
  }): Promise<ClassEntity> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacher: teacher_id }),
      },
    );
    const currentClass: ClassEntity = await res.json();

    return currentClass;
  }

  public async deleteClassTeacher({
    class_id,
  }: {
    class_id: number;
  }): Promise<ClassEntity> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacher: null }),
      },
    );
    const currentClass: ClassEntity = await res.json();

    return currentClass;
  }
}

export const classAdapter = new ClassAdapter();
