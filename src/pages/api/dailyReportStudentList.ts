// pages/api/behaviorEvaluations.js

type ApiStudent = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  photo_url: string;
  school_id: number;
  absent: boolean;
};

import { NextApiResponse, NextApiRequest } from "next";
import StudentsHome from "../students";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
		const students: ApiStudent[] = [
      {
        id: 1,
        first_name: "Emily",
        last_name: "Chen",
        age: 11,
        gender: "Female",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg",
        school_id: 1,
        absent: false,
      },
      {
        id: 2,
        first_name: "Charlie",
        last_name: "Chen",
        age: 11,
        gender: "Male",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg",
        school_id: 1,
        absent: false,
      },
      {
        id: 3,
        first_name: "Bert",
        last_name: "Chen",
        age: 11,
        gender: "Male",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg",
        school_id: 1,
        absent: true,
      },
      {
        id: 4,
        first_name: "Claire",
        last_name: "Chen",
        age: 11,
        gender: "Female",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg",
        school_id: 1,
        absent: false,
      },
      {
        id: 5,
        first_name: "Bernice",
        last_name: "Chen",
        age: 11,
        gender: "Female",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg",
        school_id: 1,
        absent: true,
      },
      {
        id: 6,
        first_name: "Kyle",
        last_name: "Chen",
        age: 11,
        gender: "Male",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg",
        school_id: 1,
        absent: false,
      },
      {
        id: 7,
        first_name: "Brad",
        last_name: "Chen",
        age: 11,
        gender: "Male",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg",
        school_id: 1,
        absent: false,
      },
      {
        id: 8,
        first_name: "Cynthia",
        last_name: "Chen",
        age: 11,
        gender: "Female",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg",
        school_id: 1,
        absent: false,
      },
      {
        id: 9,
        first_name: "Louise",
        last_name: "Chen",
        age: 11,
        gender: "Female",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg",
        school_id: 1,
        absent: false,
      },
      {
        id: 10,
        first_name: "Cameron",
        last_name: "Chen",
        age: 11,
        gender: "Male",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg",
        school_id: 1,
        absent: true,
      },
      {
        id: 11,
        first_name: "Brock",
        last_name: "Chen",
        age: 11,
        gender: "Male",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg",
        school_id: 1,
        absent: false,
      },
      {
        id: 12,
        first_name: "Cindy",
        last_name: "Chen",
        age: 11,
        gender: "Female",
        photo_url:
          "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg",
        school_id: 1,
        absent: false,
      },
    ];

    res.status(200).json(students);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
