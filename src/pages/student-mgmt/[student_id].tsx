import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { Student } from '@/src/modules/student-mgmt/domain/entities/Student';
import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';


export const getServerSideProps: GetServerSideProps<{
  student: Student;
}> = async (context) => {
	const id = Number(context.query.student_id)
  const student = await studentAdapter.getStudentById({id: id});

  return { props: { student } };
};

export default function Home({student}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/school-mgmt/">Schools</Link>
        <Link href="/student-mgmt/">Students</Link>
      </nav>
      <h1>Testing the Django Api and Frontend</h1>
      <Link href="/student-mgmt/add">Add</Link>
      <Link href="/student-mgmt/delete">Delete</Link>
			<article>
				<h2>Student Profile</h2>
				<p>{student.first_name} {student.last_name}</p>
				<p>{student.age}</p>
			</article>
    </main>
  )
}
