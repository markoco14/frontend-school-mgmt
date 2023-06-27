import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { Student } from '@/src/modules/student-mgmt/domain/entities/Student';
import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';


export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async () => {
  const students = await studentAdapter.getStudents();
  
  return { props: { students } };
};

export default function Home({students}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/school-mgmt">Schools</Link>
        <Link href="/student-mgmt">Students</Link>
      </nav>
      <h1>Testing the Django Api and Frontend</h1>
      <Link href="/student-mgmt/add">Add</Link>
      <Link href="/student-mgmt/delete">Delete</Link>
      <ul>
        {students?.map((student: Student, index) => (
          <li key={index}>{student.first_name} {student.last_name} {student.age}</li>
        ))}
      </ul>
    </main>
  )
}
