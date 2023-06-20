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
  const res = await fetch('https://api.cramschoolcloud.com/get-students/');
  const students = await res.json();
  return { props: { students } };
};

export default function Home({students}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/school-mgmt">School</Link>
        <Link href="/student-mgmt">Student</Link>
      </nav>
      <h1>Easy Cram School Management In The Cloud.</h1>
      <section>
        <h2>Sign up your school to get started.</h2>
      </section>
    </main>
  )
}
