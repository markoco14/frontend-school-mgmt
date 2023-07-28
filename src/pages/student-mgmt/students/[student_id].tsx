import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { Student } from '@/src/modules/student-mgmt/domain/entities/Student';
import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';
import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import SchoolHeader from '@/src/modules/core/infrastructure/ui/components/SchoolHeader';
import PermissionDenied from '@/src/modules/core/infrastructure/ui/components/PermissionDenied';
import AuthContext from '@/src/AuthContext';


export const getServerSideProps: GetServerSideProps<{
  student: Student;
}> = async (context) => {
	const id = Number(context.query.student_id)
  const student = await studentAdapter.getStudentById({id: id});

  return { props: { student } };
};

export default function Home({student}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  async function handleDeleteStudent(id: number) {
    try {
      setLoading(true);
      const response = await studentAdapter.deleteStudentById({ id: id });
      toast.success('Student deleted.')
      setLoading(false);
      setIsDeleted(true);
      return response.json();
    } catch (error) {
      console.error(error)
    }
  }

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        <section>
          <SchoolHeader />
          {!isDeleted ? (
            <>
              <div className='flex justify-between items-baseline mb-4'>
                <h2 className='text-3xl'>{student.first_name} {student.last_name}</h2>
                <Link href="/student-mgmt/students">Back</Link>
              </div>
              <article>
                <p>Age: {student.age}</p>
                <button onClick={() => {handleDeleteStudent(student.id)}}>Delete</button>
              </article>
            </>
          ) : (
            <>
              <div className='flex justify-between items-baseline mb-4'>
                <h2 className='text-3xl'>Student deleted.</h2>
                <Link href="/student-mgmt/students">Back</Link>
              </div>
            </>
          )}
        </section>
      </div>
    </Layout>
  )
}
