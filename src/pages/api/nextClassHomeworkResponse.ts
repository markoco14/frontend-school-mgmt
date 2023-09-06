type NextClassHomework = {
  id: number;
  name: string;
  subject: string;
  level: number;
  unit: number;
  activityType: string;
  homeworkType: string;
  activityNumber: number;
  due_date: string;
};

import { NextApiResponse, NextApiRequest } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<NextClassHomework[]>) {
  if (req.method === "GET") {
    const nextClassHomework: NextClassHomework[] = [
      {
        id: 4,
        name: "Grammar 9 U5 E2",
        subject: "Grammar",
        level: 9,
        unit: 5,
        activityType: "Book Exercise",
        homeworkType: "Assessment",
        activityNumber: 2,
        due_date: "today",
      },
      {
        id: 5,
        name: "Grammar 9 U5 T1",
        subject: "Grammar",
        level: 9,
        unit: 5,
        activityType: "Test",
        homeworkType: "Assessment",
        activityNumber: 1,
        due_date: "today",
      },
    ];

    res.status(200).json(nextClassHomework);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
