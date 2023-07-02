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

  return (
    <Layout>
      <h1 className="mb-4 p-4">See all your students in one place.</h1>
      <section className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-3xl">Click student to see profile</h2>
          <Link href="/student-mgmt/">Back</Link>
        </div>
        <ul>
          {students?.map((student: Student, index) => (
            <li key={index} className="flex justify-between gap-4">
              <Link 
                href={`/student-mgmt/${student.id}`}
                className="hover:bg-blue-300 p-2 rounded"
              >
                {student.first_name} {student.last_name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
