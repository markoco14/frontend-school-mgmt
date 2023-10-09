// schools/<str:school_pk>/daily-report-attributes/

import { EvaluationAttribute } from "../../domain/entities/EvaluationAttribute";
import { TextAttributePayload } from "../../domain/entities/payloads/TextAttributePayload";

class TextAttributeAdapter {
  public async list({
    school_id,
  }: {
    school_id?: number;
  }): Promise<EvaluationAttribute[]> {
    let url;

    if (school_id) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/text-attributes/`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/text-attributes/`;
    }

    const res = await fetch(url);
    const evaluationAttributes: EvaluationAttribute[] = await res.json();

    return evaluationAttributes;
  }

  public async add({
    payload,
  }: {
    payload: TextAttributePayload;
  }): Promise<EvaluationAttribute> {
    let url;
    url = `${process.env.NEXT_PUBLIC_API_URL}/evaluation-attributes/`;
	const { name, school_id, data_type_id } = payload;

	if (!name) {
		throw new Error("Name missing")
	}
	
	if (!school_id) {
		throw new Error("School Id missing")
	}
	
	if (!data_type_id) {
		throw new Error("Data Type missing")
	}

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });
    const newAttribute: EvaluationAttribute = await res.json();

    return newAttribute;
  }
}

export const textAttributeAdapter = new TextAttributeAdapter();
