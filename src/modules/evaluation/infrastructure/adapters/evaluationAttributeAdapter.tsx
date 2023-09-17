// schools/<str:school_pk>/daily-report-attributes/

import { EvaluationAttribute } from "../../domain/entities/EvaluationAttribute";

class EvaluationAttributeAdapter {
  public async list({
    school_id,
    details,
  }: {
    school_id?: number;
    details?: boolean;
  }): Promise<EvaluationAttribute[]> {
    let url;

    if (school_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/daily-report-attributes/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/daily-report-attributes/`;
    }

    const queryParams: string[] = [];
    if (details) queryParams.push(`details=${encodeURIComponent(details)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const evaluationAttributes: EvaluationAttribute[] = await res.json();

    return evaluationAttributes;
  }

  public async listAll({
    school_id,
  }: {
    school_id: number;
  }): Promise<EvaluationAttribute[]> {
    let url;

    if (school_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/evaluation-attributes/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/evaluation-attributes/`;
    }

    const res = await fetch(url);
    const evaluationAttributes: EvaluationAttribute[] = await res.json();

    return evaluationAttributes;
  }

  public async delete({
    attribute_id,
  }: {
    attribute_id: number;
  }) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/evaluation-attributes/${attribute_id}/`,
      {
        method: "DELETE",
      },
    );
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error); // or handle the error appropriately
    }
  }
}

export const evaluationAttributeAdapter = new EvaluationAttributeAdapter();
