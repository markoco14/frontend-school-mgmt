import { Student } from "@/src/modules/students/entities/Student";
import Cookie from "js-cookie";
import { NewStudent } from "../entities/NewStudent";

async function addStudent({
    newStudent
  }: {
    newStudent: NewStudent;
  }): Promise<Student> {
    const accessToken = Cookie.get("accessToken");

    if (!accessToken) {
      throw new Error("No access token.")
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/new`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail)
    }

    const student: Student = await response.json();

    return student;
  }

export default addStudent