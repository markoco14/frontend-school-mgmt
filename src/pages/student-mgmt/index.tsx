import Link from 'next/link';
import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';
import SchoolHeader from '@/src/modules/core/infrastructure/ui/components/SchoolHeader';
import { useContext, useState } from 'react';
import AuthContext from '@/src/AuthContext';
import PermissionDenied from '@/src/modules/core/infrastructure/ui/components/PermissionDenied';
import { Dialog, Transition } from '@headlessui/react';
import RegisterNewStudentModal from '@/src/modules/student-mgmt/infrastructure/ui/RegisterNewStudentModal';

export default function StudentsHome() {
  const { user } = useContext(AuthContext);
  const [isAddStudent, setIsAddStudent] = useState<boolean>(false);

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
          <div className='mb-4'>
            <h2 className='text-3xl mb-4'>Students</h2>
            <p>Add students and edit their information here.</p>
          </div>
          <article className='grid grid-cols-2 gap-4'>
            <button 
            onClick={() => {
              console.log('adding')
              setIsAddStudent(true);
            }}
              className='col-span-1 text-center hover:bg-blue-300 p-4 rounded'
            >
              Add Students
            </button>
            <Link 
              href="/student-mgmt/students"
              className='col-span-1 text-center hover:bg-blue-300 p-4 rounded'
            >
              Edit Profiles
            </Link>
          </article>
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
                <RegisterNewStudentModal />
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
        </section>
      </div>
    </Layout>
  )
}
