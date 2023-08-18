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
  const student = await studentAdapter.getStudent({id: id});

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
      <SchoolHeader />
      
        {!isDeleted ? (
          <>
            <section className='mb-4'>
              <div className='flex justify-between items-baseline mb-4'>
                {/* <h2 className='text-3xl'>Student Profile</h2> */}
                <h2 className='text-3xl'>{student.first_name}&apos;s Profile</h2>
                <Link href="/student-mgmt">Back</Link>
              </div>
              <article className="bg-gray-100 shadow-inner p-2 rounded">
                <p>First Name: {student.first_name}</p>
                <p>Last Name: {student.last_name}</p>
                <p>Age: {student.age}</p>
              </article>
            </section>
            <section>
              <h2 className="text-3xl mb-4">Manage Student Registration</h2>
              <article className="bg-gray-100 shadow-inner p-2 rounded">
                <p className="mb-4">
                  Delete student here. Warning you cannot undo this.
                </p>
                <button
                  className="rounded underline underline-offset-2 text-red-500 hover:text-red-900"
                  onClick={async () =>
                    handleDeleteStudent(student.id)
                  }
                  >
                  Delete Student
                </button>
              </article>
            </section>
          </>
        ) : (
          <section>
          <article>
            <div className='flex justify-between items-baseline mb-4'>
              <h2 className='text-3xl'>Student deleted.</h2>
              <Link href="/student-mgmt">Back</Link>
            </div>
          </article>
        </section>
        )}
    </Layout>
  )
}
