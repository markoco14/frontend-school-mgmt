import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';

type Student = {
	id: number;
  first_name: string;
  last_name: string;
  age: number;
};

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-students/`);
  const students = await res.json();
  return { props: { students } };
};

export default function Home({students}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

	async function handleDeleteStudent(id: number) {
    const response = await studentAdapter.deleteStudentById({id: id});
    const newFilteredStudents = filteredStudents.filter(student => student.id !== id);
    setFilteredStudents(newFilteredStudents);

    return response.json()
	}

  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/add">Add</Link>
        <Link href="/delete">Delete</Link>
      </nav>
      <h1>Testing the Django Api and Frontend</h1>
      <ul>
        {filteredStudents?.map((student: Student, index) => (
          <li key={index} className='flex justify-between gap-4'>
						<span>{student.first_name} {student.last_name} {student.age}</span>
						<button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
					</li>
        ))}
      </ul>
    </main>
  )
}
