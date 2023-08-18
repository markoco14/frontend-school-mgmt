import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import AddClass from "@/src/modules/class-mgmt/infrastructure/ui/components/AddClass";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function ClassHome() {
  const { selectedSchool } = useContext(AuthContext);
  const [classes, setClasses] = useState<Class[]>([]);
  const { user } = useContext(AuthContext);
  const [isAddClass, setIsAddClass] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      if (selectedSchool) {
        await classAdapter.listSchoolClasses({id: selectedSchool.id}).then((res) => {
          setClasses(res);
        });
      }
    }

    getData();
  }, [selectedSchool])

  if (!selectedSchool) {
    return (
      <Layout>
        <div>
          <section>
            <SchoolHeader />
            <div className="flex justify-between items-baseline mb-4">
              <Link href='/'>Click here to choose a school</Link>
            </div>
          </section>
        </div>
      </Layout>
    );
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
          <div className="flex justify-between items-baseline mb-4">
            <h2 className='text-3xl'>Your Classes</h2>
          </div>
          {classes.length === 0 ? (
            <article className="p-2 bg-gray-100 shadow-inner mb-4">
              <p>You have not created any classes for your school.</p>
            </article>
          ) : (
            <article className="p-2 bg-gray-100 shadow-inner mb-4">

              <ul className="flex flex-col divide-y mb-8 ">
                {classes?.map((currentClass: Class, index: number) => (
                  <li 
                    key={index}
                    className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
                  >
                    <Link href={`/class-mgmt/${currentClass.id}`} className="w-full">
                      {currentClass.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          )}
          <button 
            onClick={() => {
              console.log('click')
            setIsAddClass(true);
            }}
            className="bg-blue-300 p-2 rounded"
          >
            New Class
          </button>
          <Transition
            show={isAddClass}
            enter="transition ease-in duration-100"
            enterFrom="transform opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog
              onClose={() => setIsAddClass(false)}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div className="fixed inset-0 bg-blue-900/25" />
              <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
                <Dialog.Title>Add Class</Dialog.Title>
                <AddClass setClasses={setClasses}/>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddClass(false)}
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
  );
}
