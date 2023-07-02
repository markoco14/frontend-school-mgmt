import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

type Student = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
};

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-students/`);
  const students = await res.json();
  return { props: { students } };
};

export default function ListStudents({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

  async function handleDeleteStudent(id: number) {
    const response = await studentAdapter.deleteStudentById({ id: id });
    const newFilteredStudents = filteredStudents.filter(
      (student) => student.id !== id
    );
    setFilteredStudents(newFilteredStudents);

    return response.json();
  }

  return (
    <Layout>
      <h1 className="mb-4 p-4">Sign up your students and manage their info.</h1>
      <section className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-3xl">Edit student profiles here.</h2>
          <Link href="/student-mgmt/">Back</Link>
        </div>
        <ul>
          {filteredStudents?.map((student: Student, index) => (
            <li key={index} className="flex justify-between gap-4">
              <span>
                {student.first_name} {student.last_name} {student.age}
              </span>
              <Link href={`/student-mgmt/${student.id}`}>Profile</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
