import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';

type Student = {
	id: number;
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

	async function handleDeleteStudent(id: number) {
		const response = fetch(`http://54.95.13.158/8000/delete-student/${id}/`,{
			method: 'DELETE'
		})
		return response;
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
        {students?.map((student: Student, index) => (
          <li key={index} className='flex justify-between gap-4'>
						<span>{student.first_name} {student.last_name} {student.age}</span>
						<button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
					</li>
        ))}
      </ul>
    </main>
  )
}
