import Link from 'next/link';
import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';
import SchoolHeader from '@/src/modules/core/infrastructure/ui/components/SchoolHeader';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/src/AuthContext';
import PermissionDenied from '@/src/modules/core/infrastructure/ui/components/PermissionDenied';
import { Dialog, Transition } from '@headlessui/react';
import RegisterNewStudentModal from '@/src/modules/student-mgmt/infrastructure/ui/RegisterNewStudentModal';
import { PaginatedStudentResponse } from '@/src/modules/student-mgmt/domain/entities/PaginatedStudentResponse';
import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';
import { Student } from '@/src/modules/student-mgmt/domain/entities/Student';

export default function StudentsHome() {
  const [isAddStudent, setIsAddStudent] = useState<boolean>(false);

  const { user, selectedSchool } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentResponse, setStudentResponse] = useState<PaginatedStudentResponse>();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    async function getData(id: number) {  
      setLoading(true);
      if (selectedSchool) {
        await studentAdapter.getStudentsBySchool({ id: selectedSchool.id }).then((res) => {
          setStudentResponse(res);
          setStudents(res.results);
        });
      }
      setLoading(false);
    }
  
    if (user) {
      try {
        getData(user.user_id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user, selectedSchool]);

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
          <SchoolHeader />
        <section>
          <div className='flex justify-between items-baseline mb-4'>
            <h2 className='text-3xl'>Students</h2>
            <button 
            onClick={() => {
              console.log('adding')
              setIsAddStudent(true);
            }}
              className='bg-blue-300 hover:bg-blue-500 p-2 rounded'
            >
              <i className="fa-solid fa-plus"></i> <i className="fa-solid fa-user"></i>
            </button>
          </div>
          {loading ? (
            <article className="min-h-[200px] bg-gray-100 shadow-inner p-2 rounded">
              <p>loading...</p>
            </article>
          ) : (
            <article className="bg-gray-100 shadow-inner p-2 rounded">
              <ul className='divide-y divide-gray-300'>
                {students.map((student: Student, index) => (
                  <li key={index} className="flex justify-between gap-4">
                    <Link
                      href={`/student-mgmt/students/${student.id}`}
                      className="hover:bg-blue-300 p-2 rounded w-full"
                    >
                      {student.first_name} {student.last_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          )}
        </section>
          <Transition
            show={isAddStudent}
            enter="transition ease-in duration-100"
            enterFrom="transform opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog
              onClose={() => setIsAddStudent(false)}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div className="fixed inset-0 bg-blue-900/25" />
              <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
                <Dialog.Title>Add Student</Dialog.Title>
                <RegisterNewStudentModal setStudents={setStudents}/>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddStudent(false)}
                    className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Dialog>
          </Transition>
        
      </div>
    </Layout>
  )
}
