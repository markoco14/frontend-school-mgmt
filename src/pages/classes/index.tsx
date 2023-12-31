import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import { useUserContext } from "@/src/contexts/UserContext";
import { classAdapter } from "@/src/modules/classes/adapters/classAdapter";
import AddClass from "@/src/modules/classes/components/AddClass";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import ListContainer from "@/src/modules/core/components/ListContainer";
import Modal from "@/src/modules/core/components/Modal";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
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
          <div className="h-full w-full bg-white">
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
          <div className="h-full w-full bg-white">
            <PermissionDenied />
          </div>
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
        <div className="h-full w-full bg-white">
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
                  <ListContainer>
                    {classes?.map(
                      (currentClass: ClassEntity, index: number) => (
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
                      ),
                    )}
                  </ListContainer>
                </article>
              )}
            </div>
            <Modal show={isAddClass} close={handleClose} title="Add Class">
              <AddClass setClasses={setClasses} />
            </Modal>
          </section>
        </div>
      </AdminLayout>
    </Layout>
  );
}
