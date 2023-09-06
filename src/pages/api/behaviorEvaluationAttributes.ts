interface Description {
  [key: number]: string;
}

interface RangeAttribute {
  id: number;
  title: string;
  type: "range";
  minValue: number;
  maxValue: number;
  descriptions: Description;
}

interface StringAttribute {
  id: number;
  title: string;
  type: "text";
}

type BehaviorEvaluationAttribute = RangeAttribute | StringAttribute;

import { NextApiResponse, NextApiRequest } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse<BehaviorEvaluationAttribute[]>) {
  if (req.method === "GET") {
    const behaviorEvaluationAttributes: BehaviorEvaluationAttribute[] = [
      {
        id: 1,
        title: "Participation",
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
        title: "Attitude",
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
        title: "Teacher's Comment",
        type: "text",
      },
    ];

    res.status(200).json(behaviorEvaluationAttributes);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
