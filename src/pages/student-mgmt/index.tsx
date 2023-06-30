import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { Student } from '@/src/modules/student-mgmt/domain/entities/Student';
import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';
import { useContext } from 'react';
import { UserContext } from '@/src/context';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async () => {
  const students = await studentAdapter.getStudents();
  
  return { props: { students } };
};

export default function Home({students}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const context = useContext(UserContext);
  const router = useRouter();
  
  return (
    <main className="min-h-screen max-w-[600px] mx-auto">
      <nav className="h-[48px] flex justify-between items-center px-4">
        <div className="flex gap-2">
          <Link href="/">Home</Link>
          <Link href="/school-mgmt/">Schools</Link>
          <Link href="/student-mgmt/">Students</Link>
        </div>
        <button
          onClick={() => {
            context.setUser();
            router.push("/");
          }}
        >
          Log Out
        </button>
      </nav>
      <div>
        <h1 className="mb-4 p-4">Sign up your students and manage their info.</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className='mb-4'>
            <h2 className='text-3xl mb-4'>Students</h2>
            <p>Add students and edit their information here.</p>
          </div>
          <article className='grid grid-cols-2 gap-4'>
            
            <Link 
              href="/student-mgmt/add"
              className='col-span-1 text-center hover:bg-blue-300 p-4 rounded'
            >
              Add Students
            </Link>
            <Link 
              href="/student-mgmt/delete"
              className='col-span-1 text-center hover:bg-blue-300 p-4 rounded'
            >
              Edit Profiles
            </Link>
          </article>
        </section>
      </div>
    </main>
  )
}
