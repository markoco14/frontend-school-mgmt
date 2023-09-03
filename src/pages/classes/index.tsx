import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/classes/domain/entities/Class";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import AddClass from "@/src/modules/classes/infrastructure/ui/components/AddClass";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
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

  function handleClose() {
    setIsAddClass(false)
  }

  return (
    <Layout>
      <div>
        <SchoolHeader />
        <section className="grid grid-cols-2">
          <div className="border-2 shadow rounded p-4">
            <div className="flex justify-between items-baseline mb-4">
              <h2 className='text-3xl'>Your Classes</h2>
              <button 
                onClick={() => {
                setIsAddClass(true);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            {classes.length === 0 ? (
              <article>
                <p>You have not created any classes for your school.</p>
              </article>
            ) : (
              <article>
                <ul className="flex flex-col divide-y">
                  {classes?.map((currentClass: Class, index: number) => (
                    <li 
                      key={index}
                      className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
                    >
                      <Link href={`/classes/${currentClass.id}`} className="w-full">
                        {currentClass.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </div>
          <Modal show={isAddClass} close={handleClose} title="Add Class">
            <AddClass setClasses={setClasses} />
          </Modal>
        </section>
      </div>
    </Layout>
  );
}
