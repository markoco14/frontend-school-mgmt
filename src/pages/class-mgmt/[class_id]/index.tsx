import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import StudentList from "@/src/modules/student-mgmt/infrastructure/ui/StudentList";
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
            <h2 className='text-3xl'>Class name goes here</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
          <div className="flex items-baseline gap-4 mb-4">
            <p className="text-xl">Student List</p>
            <button onClick={() => console.log('adding student')}>+ Student</button>
          </div>
          <StudentList students={students}/>
        </section>
      </div>
    </Layout>
  );
}
