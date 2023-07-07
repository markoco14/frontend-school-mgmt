import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState } from 'react';
import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';
import { Student } from '@/src/modules/student-mgmt/domain/entities/Student';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async (context) => {
	const id = context?.query?.school_id;
  const students = await studentAdapter.getStudentsBySchoolId({id: Number(context.query.school_id)});
	
  return { props: { students } };
};

export default function ReportsHome({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
					<div className='flex justify-between items-baseline mb-4'>
						<h2 className='text-3xl'>Students at school X</h2>
						<Link href="/report-mgmt/">Back</Link>
					</div>
					<ul>
						{students?.map((student: Student, index: number) => (
							<li key={index}>{student.first_name} {student.last_name}</li>
						))}
					</ul>
        </section>
      </div>
    </Layout>
  )
}
