import { useUserContext } from "@/src/contexts/UserContext";
import { classAdapter } from "@/src/modules/classes/adapters/classAdapter";
import ManageClassStudents from "@/src/modules/classes/components/class-students/ManageClassStudents";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import Layout from "@/src/modules/core/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/components/ParamsPageTabNav";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const getServerSideProps: GetServerSideProps<{
  classEntity: ClassEntity;
}> = async (context) => {
  const id = Number(context.query.class_id);
  const classEntity = await classAdapter.getClassById({ class_id: id });

  return { props: { classEntity } };
};

export default function ManageClassDetails({
  classEntity,
}: {
  classEntity: ClassEntity;
}) {
  const selectedClass = classEntity
  const { user } = useUserContext();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "info";

  const links = [
    {
      value: 1,
      name: "Class Info",
      urlString: "info",
    },
    {
      value: 2,
      name: "Students",
      urlString: "students",
    }
  ];

  if (!user) {
    return (
      <GuestLayout>
        <p>You don&apos;t have permission to access this page.</p>
      </GuestLayout>
    )
  }

  if (user?.role === "TEACHER") {
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

  return (
    <Layout>
      <AdminLayout>
        <div className="h-full w-full bg-white">
          <section>
            <div className="min-h-[50vh] max-w-[1000px] bg-white">
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="text-3xl">{selectedClass?.name}</h2>
                <Link href="/classes">Back</Link>
              </div>
              <ParamsPageTabNav
                links={links}
                tab={tab}
                queryParam={classEntity.id}
              />
              {tab === "class info" ? (
                <article className="col-span-1 rounded border p-2 shadow md:row-span-2">
                  <p>Class info goes here.</p>
                </article>
              ) :  (
                <article className="col-span-1 md:row-span-2">
                  <ManageClassStudents selectedClass={selectedClass} />
                </article>
              )}
            </div>
          </section>
        </div>
      </AdminLayout>
    </Layout>
  );
}
