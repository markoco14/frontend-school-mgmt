import { AuthUser } from "@/src/contexts/UserContext";
import AddClassModal from "@/src/modules/classes/components/AddClassModal";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import listClasses from "@/src/modules/classes/requests/listClasses";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import ListContainer from "@/src/modules/core/components/ListContainer";
import Modal from "@/src/modules/core/components/Modal";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { NextPageWithLayout } from "@/src/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";

type ClassesPageProps = {
  user: AuthUser
}

const ClassesPage: NextPageWithLayout<ClassesPageProps> = ({ user }) => {

  const [classes, setClasses] = useState<ClassEntity[] | null>(null);
  const [isAddClass, setIsAddClass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const schoolSlug = router.query.school as string

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getData() {
      setLoading(true)

      if (!schoolSlug) {
        toast("No school selected")
        return
      }

      try {
        const classes = await listClasses({ schoolSlug: schoolSlug, signal: signal })
        setClasses(classes)
      } catch (error) {
        if (signal.aborted) {
          return
        }

        if (error instanceof (Error)) {
          toast.error(error.message)
        } else {
          toast.error("Something went wrong getting your classes.")
        }
      } finally {
        setLoading(false)
      }
    }

    try {
      getData();
    } catch (error) {
      if (error instanceof (Error)) {
        toast.error(error.message)
      } else {
        toast.error("Something went wrong getting your classes.")
      }
    }

    return () => {
      controller.abort();
    }
  }, [schoolSlug]);

  function handleClose() {
    setIsAddClass(false);
  }

  if (user && user.membership !== "OWNER") {
    return (
      <Layout>
        <AdminLayout>
          <PermissionDenied />
        </AdminLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminLayout>
        {/* <SchoolHeader /> */}
        <div className="h-full w-full bg-white">
          <section>
            <div className="max-w-[1000px]">
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
              <div className="min-h-[200px] rounded border p-4 shadow">

              {loading ? (
                <ul className=" flex flex-col divide-y divide-white">
                  <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
                  <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
                  <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
                  <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
                </ul>
              ) : (classes && classes.length === 0) ? (
                <p>You have not created any classes for your school.</p>
              ) : (
                <ListContainer>
                  {classes?.map(
                    (currentClass: ClassEntity, index: number) => (
                      <li
                        key={index}
                        className="flex justify-between rounded-md p-2 hover:bg-blue-200"
                      >
                        <Link
                          href={`/schools/${schoolSlug}/classes/${currentClass.id}`}
                          className="w-full"
                        >
                          {currentClass.name}
                        </Link>
                      </li>
                    ),
                  )}
                </ListContainer>
              )}
              </div>
            </div>
            <Modal show={isAddClass} close={handleClose} title="Add Class">
              <AddClassModal schoolSlug={schoolSlug} setClasses={setClasses} />
            </Modal>
          </section>
        </div>
      </AdminLayout>
    </Layout>
  );
}

ClassesPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default ClassesPage