import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import LevelSection from "@/src/modules/curriculum/infrastructure/ui/components/LevelSection";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import TeacherSection from "@/src/modules/user-mgmt/infrastructure/ui/TeacherSection";
import { Dialog, Transition } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";

export default function AdminHome() {
  const { user, selectedSchool } = useContext(AuthContext)
  const [subjects, setSubjects] = useState<any[]>();
  const [isAddSubject, setIsAddSubject] = useState<boolean>(false)

  useEffect(() => {
    async function getSubjects() {
      if(selectedSchool) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects/?school=5`)
        const subjects = await res.json()
        console.log(subjects)
        setSubjects(subjects.results)
      }
    }

    getSubjects();
  }, [selectedSchool])

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid gap-4">
          <SchoolHeader />
          <LevelSection />
          <section>
            <article>
              <ul>
                {subjects?.map((subject, index) => (
                  <li key={index}>{subject.name}</li>
                ))}
              </ul>
              <button
                className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded"
                onClick={() => setIsAddSubject(true)}
              >Add Subject</button>
              <Transition
                show={isAddSubject}
                enter="transition ease-in duration-100"
                enterFrom="transform opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="transition ease-out duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                <Dialog
                  onClose={() => setIsAddSubject(false)}
                  className="fixed inset-0 flex items-center justify-center"
                >
                  <div className="fixed inset-0 bg-blue-900/25" />
                  <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
                    <Dialog.Title>Add Subject</Dialog.Title>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsAddSubject(false)}
                        className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Dialog>
              </Transition>
            </article>
          </section>
      </div>
    </Layout>
  );
}
