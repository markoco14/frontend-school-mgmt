import { UserContext } from "@/src/context";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { School } from "@/src/modules/school-mgmt/domain/entities/School";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

// TODO: this can't be get all students...
// it needs to be get students by school id and owner id...?
// pass owner id, get his school ids, and use those ids to get all the students
// and return that. but we won't be able to do that server side for now...

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
  const context = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const [userSchools, setUserSchools] = useState<School[]>();

  useEffect(() => {
    async function getSchoolsByOwnerId(id: number) {
      setLoading(true);
      await schoolAdapter.getSchoolsByOwnerId({ id: id }).then((res) => {
        setUserSchools(res);
        setLoading(false);
      });
    }

    if (context.user?.id) {
      try {
        getSchoolsByOwnerId(context.user?.id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [context]);

  async function handleChangeSelectedSchool(id: number) {
    if (id === 0) {
      console.log("showing all students with pagination");
      setFilteredStudents(students);
      return;
    }
    console.log("you changed the school to school:", id);
    const filteredStudents = await studentAdapter.getStudentsBySchoolId({
      id: id,
    });
    setFilteredStudents(filteredStudents);
  }

  return (
    <Layout>
      <h1 className="mb-4 p-4">See all your students in one place.</h1>
      <section className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-3xl">Click student to see profile</h2>
          <Link href="/student-mgmt/">Back</Link>
        </div>
        <select
          className="py-2 rounded bg-white shadow"
          onChange={(e) => {
            handleChangeSelectedSchool(Number(e.target.value));
          }}
        >
          <option value="0">All</option>
          {userSchools?.map((school: School, index: number) => (
            <option key={index} value={school.id} className="p-4">
              {school.name}
            </option>
          ))}
        </select>
        <ul>
          {filteredStudents?.map((student: Student, index) => (
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
