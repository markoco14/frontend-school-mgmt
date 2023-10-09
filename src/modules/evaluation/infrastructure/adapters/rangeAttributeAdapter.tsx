// schools/<str:school_pk>/daily-report-attributes/

import { EvaluationAttribute } from "../../domain/entities/EvaluationAttribute";
import { RangeAttributePayload } from "../../domain/entities/payloads/RangeAttributePayload";

class RangeAttributeAdapter {
  public async list({
    school_id,
  }: {
    school_id?: number;
  }): Promise<EvaluationAttribute[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/range-attributes/`;

    const queryParams: string[] = [];
    if (school_id) queryParams.push(`school=${encodeURIComponent(school_id)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const evaluationAttributes: EvaluationAttribute[] = await res.json();

    return evaluationAttributes;
  }

  public async add({
    payload,
  }: {
    payload: RangeAttributePayload;
  }): Promise<EvaluationAttribute> {
    let url;
    url = `${process.env.NEXT_PUBLIC_API_URL}/evaluation-attributes/`;

    let requestBody: { [key: string]: any } = {};
    if (payload.name !== undefined) {
      requestBody.name = payload.name;
    }
    if (payload.school_id !== undefined) {
      requestBody.school_id = payload.school_id;
    }
    if (payload.min_value !== undefined) {
      requestBody.min_value = payload.min_value;
    }
    if (payload.max_value !== undefined) {
      requestBody.max_value = payload.max_value;
    }
    if (payload.descriptions !== undefined) {
      requestBody.descriptions = payload.descriptions;
    }
    if (payload.data_type_id !== undefined) {
      requestBody.data_type_id = payload.data_type_id;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestBody),
    });
    const newAttribute: EvaluationAttribute = await res.json();

    return newAttribute;
  }

}

export const rangeAttributeAdapter = new RangeAttributeAdapter();
