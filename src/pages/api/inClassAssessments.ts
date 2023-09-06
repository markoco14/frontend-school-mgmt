type InClassAssessments = {
  id: number;
  title: string;
  subject: string;
  level: number;
  unit: number;
  activityType: string;
  homeworkType: string;
  activityNumber: number;
  due_date: string;
};

import { NextApiResponse, NextApiRequest } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<InClassAssessments[]>) {
  if (req.method === "GET") {
    const inClassAssessments: InClassAssessments[] = [
      {
        id: 4,
        title: "Grammar 9 U5 T2",
        subject: "Grammar",
        level: 9,
        unit: 5,
        activityType: "Book Exercise",
        homeworkType: "Assessment",
        activityNumber: 2,
        due_date: "today",
      },
    ];

    res.status(200).json(inClassAssessments);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
