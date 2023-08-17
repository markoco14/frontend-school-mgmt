import AuthContext from '@/src/AuthContext';
import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';
import PermissionDenied from '@/src/modules/core/infrastructure/ui/components/PermissionDenied';
import SchoolHeader from '@/src/modules/core/infrastructure/ui/components/SchoolHeader';
import { PaginatedStudentResponse } from '@/src/modules/student-mgmt/domain/entities/PaginatedStudentResponse';
import { Student } from '@/src/modules/student-mgmt/domain/entities/Student';
import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';
import RegisterNewStudentModal from '@/src/modules/student-mgmt/infrastructure/ui/RegisterNewStudentModal';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function StudentsHome() {
  const [isAddStudent, setIsAddStudent] = useState<boolean>(false);

  const { user, selectedSchool } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentResponse, setStudentResponse] = useState<PaginatedStudentResponse>();
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isNext, setIsNext] = useState<boolean>(false)

  useEffect(() => {
    async function getData(id: number) {  
      setLoading(true);
      if (selectedSchool) {
        await studentAdapter.getStudentsBySchoolId({ id: selectedSchool.id, page: page }).then((res) => {
          if (res.next) {
            setIsNext(true);
          } else {
            setIsNext(false);
          }
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
  }, [user, selectedSchool, page]);

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
            <article className="bg-gray-100 shadow-inner p-2 rounded ">
              <ul className='divide-y divide-gray-300 min-h-[420px] sm:h-full'>
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
              <div className="flex justify-evenly gap-2">
              <button
                className="disabled:cursor-not-allowed bg-blue-300 disabled:bg-gray-300 px-2 py-1 w-full rounded"
                disabled={page === 1}
                onClick={() => {
                  setPage((prevPage) => prevPage - 1);
                }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                className="disabled:cursor-not-allowed bg-blue-300 disabled:bg-gray-300 px-2 py-1 w-full rounded"
                disabled={!isNext}
                onClick={() => {
                  setPage((prevPage) => prevPage + 1);
                }}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
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
