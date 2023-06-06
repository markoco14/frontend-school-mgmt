import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';

type Student = {
  first_name: string;
  last_name: string;
  age: number;
};

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async () => {
  const res = await fetch('http://127.0.0.1:8000/get-students/');
  const students = await res.json();
  return { props: { students } };
};

export default function Home({students}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main
      className='flex min-h-screen flex-col items-center p-24'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/add">Add</Link>
      </nav>
      <h1>Testing the Django Api and Frontend</h1>
      <ul>
        {students?.map((student: Student, index) => (
          <li key={index}>{student.first_name} {student.last_name} {student.age}</li>
        ))}
      </ul>
    </main>
  )
}
