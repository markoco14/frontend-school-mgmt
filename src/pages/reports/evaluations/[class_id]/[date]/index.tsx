import AuthContext from "@/src/AuthContext";
import BackButton from "@/src/components/ui/utils/BackButton";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { studentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAdapter";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useContext } from "react";

export const getServerSideProps: GetServerSideProps<{
  students: Student[] | undefined;
}> = async (context) => {
  console.log(context);
  let students;
  await studentAdapter
    .list({
      classEntityId: Number(context.query.class_id),
      date: context.query.date?.toString(),
      attendance: true,
    })
    .then((res) => {
      students = res;
    });

  return { props: { students } };
};

export default function ReportDate({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, selectedSchool } = useContext(AuthContext);
  return (
    <Layout>
      <BackButton />
      <div>
        <section className="pb-[48px] xs:pb-0">
          <ul className="grid divide-y border shadow">
            {students?.map((student) => (
              <li key={student.id} className="p-2 hover:bg-gray-100">
                <p>
                  {student.first_name} {student.last_name}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
