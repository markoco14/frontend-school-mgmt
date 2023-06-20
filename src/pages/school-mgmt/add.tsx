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
        <Link href="/school-mgmt/add">Add</Link>
        <Link href="/school-mgmt/delete">Delete</Link>
      </nav>
      <h1>The School Management Page</h1>
    </main>
  )
}
