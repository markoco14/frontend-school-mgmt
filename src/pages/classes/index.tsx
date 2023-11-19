import { useUserContext } from "@/src/UserContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import AddClass from "@/src/modules/classes/infrastructure/ui/components/AddClass";
import AdminLayout from "@/src/modules/core/infrastructure/ui/components/AdminLayout";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClassHome() {
  const { user, selectedSchool } = useUserContext();
  const [classes, setClasses] = useState<ClassEntity[]>([]);
  const [isAddClass, setIsAddClass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      if (selectedSchool) {
        setLoading(true);
        await classAdapter
          .list({ school_id: selectedSchool.id })
          .then((res) => {
            setClasses(res);
            setLoading(false);
          });
      }
    }

    getData();
  }, [selectedSchool]);

  if (!selectedSchool) {
    return (
      <Layout>
        <AdminLayout>
          <div>
            <section>
              {/* <SchoolHeader /> */}
              <p>You need to choose a school first.</p>
              <div className="mb-4 flex items-baseline justify-between">
                <Link href="/">Click here to choose a school</Link>
              </div>
            </section>
          </div>
        </AdminLayout>
      </Layout>
    );
  }

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <AdminLayout>
          <PermissionDenied />
        </AdminLayout>
      </Layout>
    );
  }

  function handleClose() {
    setIsAddClass(false);
  }

  return (
    <Layout>
      <AdminLayout>
        {/* <SchoolHeader /> */}
        <section>
          <div className="max-w-[1000px] rounded border-2 bg-white p-4 shadow">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-3xl">Your Classes</h2>
              <button
                onClick={() => {
                  setIsAddClass(true);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            {loading && (
              <Skeleton>
                <ClassListSkeletonProps />
              </Skeleton>
            )}
            {!loading && classes.length === 0 ? (
              <article>
                <p>You have not created any classes for your school.</p>
              </article>
            ) : (
              <article>
                <ul className="flex flex-col divide-y">
                  {classes?.map((currentClass: ClassEntity, index: number) => (
                    <li
                      key={index}
                      className="flex justify-between rounded-md p-2 hover:bg-blue-200"
                    >
                      <Link
                        href={`/classes/${currentClass.id}`}
                        className="w-full"
                      >
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
      </AdminLayout>
    </Layout>
  );
}
