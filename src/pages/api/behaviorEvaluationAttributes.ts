interface Description {
  [key: number]: string;
}

interface RangeAttribute {
  id: number;
  name: string;
  type: "range";
  minValue: number;
  maxValue: number;
  descriptions: Description;
}

interface StringAttribute {
  id: number;
  name: string;
  type: "text";
}

type BehaviorEvaluationAttribute = RangeAttribute | StringAttribute;

import { NextApiResponse, NextApiRequest } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse<BehaviorEvaluationAttribute[]>) {
  if (req.method === "GET") {
    const behaviorEvaluationAttributes: BehaviorEvaluationAttribute[] = [
      {
        id: 1,
        name: "Participation",
        type: "range",
        minValue: 1,
        maxValue: 3,
        descriptions: {
          1: "Student doesn't participate.",
          2: "Student tries to participate.",
          3: "Student participates.",
        },
      },
      {
        id: 2,
        name: "Attitude",
        type: "range",
        minValue: 1,
        maxValue: 3,
        descriptions: {
          1: "Student rolls eyes and slouches.",
          2: "Student tries but loses interest and sighs.",
          3: "Student smiles and encourages others.",
        },
      },
      {
        id: 3,
        name: "Teacher's Comment",
        type: "text",
      },
    ];

    res.status(200).json(behaviorEvaluationAttributes);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
