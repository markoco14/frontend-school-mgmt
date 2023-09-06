type DueTodayHomework = {
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

export default function handler(req: NextApiRequest, res: NextApiResponse<DueTodayHomework[]>) {
  if (req.method === "GET") {
    const dueTodayHomework: DueTodayHomework[] = [
      {
        id: 1,
        title: "Grammar 9 U5 E1",
        subject: "Grammar",
        level: 9,
        unit: 5,
        activityType: "Book Exercise",
        homeworkType: "First-time-do",
        activityNumber: 1,
        due_date: "today",
      },
      {
        id: 2,
        title: "Grammar 9 U4 E2",
        subject: "Grammar",
        level: 9,
        unit: 4,
        activityType: "Book Exercise",
        homeworkType: "Corrections",
        activityNumber: 1,
        due_date: "today",
      },
      {
        id: 3,
        title: "Grammar 9 U4 T2",
        subject: "Grammar",
        level: 9,
        unit: 4,
        activityType: "Test",
        homeworkType: "Assessment",
        activityNumber: 1,
        due_date: "today",
      },
    ];

    res.status(200).json(dueTodayHomework);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
