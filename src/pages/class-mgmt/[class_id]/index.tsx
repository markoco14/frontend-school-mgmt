import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async (context) => {
  const id = context?.query?.class_id;
  const students = await studentAdapter.listStudentsByClassId({
    id: Number(id),
  });

  return { props: { students } };
};

export default function ClassList({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Create classes here</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className='text-3xl'>Class time!</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
          <p>Student list goes here</p>
        </section>
      </div>
    </Layout>
  );
}
