import { Spinner } from "@/src/components/ui/spinner";
import { AuthUser } from "@/src/contexts/UserContext";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import getClass from "@/src/modules/classes/requests/getClass";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { NextPageWithLayout } from "@/src/pages/_app";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";

type ClassDetailPageProps = {
  user: AuthUser
}


const ClassDetailPage: NextPageWithLayout<ClassDetailPageProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentClass, setCurrentClass] = useState<ClassEntity | null>(null);
  const router = useRouter();
  const classID = Number(router.query.class_id as string)

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getData() {
      if (!classID) {
        toast("Error loading class data. Please refresh the page.")
        return
      }

      try {
        const classEntity = await getClass(classID, signal);
        setCurrentClass(classEntity)
      } catch (error) {
        if (signal.aborted) {
          return
        }

        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error("Error getting class data. Please try again.")
        }
      } finally {
        setLoading(false)
      }
    }

    getData()

    return () => {
      controller.abort();
    }
  }, [classID])

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
        <div className="h-full w-full bg-white">
          <section>
            <div className="min-h-[50vh] max-w-[1000px] bg-white">
              <article className="col-span-1 rounded border p-2 shadow md:row-span-2">
                {loading ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : !currentClass ? (
                  <p>No class found</p>
                ) : (
                  <>
                    <h1>{currentClass.name} Class</h1>
                    <p>Level {currentClass.level}</p>
                    {currentClass.days ? (
                      currentClass.days.map((index, day) => (
                        <p key={index + 1}>{day}</p>
                      ))
                    ) : (
                      <p>No days assigned.</p>
                    )}
                  </>
                )}
              </article>
            </div>
          </section>
        </div>
      </AdminLayout>
    </Layout>
  );
}

ClassDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default ClassDetailPage