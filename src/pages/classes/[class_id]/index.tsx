import { useUserContext } from "@/src/UserContext";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/adapters/classAdapter";
import ManageClassTeacher from "@/src/modules/classes/components/ManageClassTeacher";
import ManageClassStudents from "@/src/modules/classes/components/class-students/ManageClassStudents";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/components/ParamsPageTabNav";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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
  const [selectedClass, setSelectedClass] = useState<ClassEntity>(classEntity);
  const { user } = useUserContext();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "class info";

  const links = [
    {
      value: 1,
      name: "Class Info",
      urlString: "class info",
    },
    {
      value: 2,
      name: "Students",
      urlString: "students",
    },
    {
      value: 3,
      name: "Teachers",
      urlString: "teachers",
    },
  ];

  if (!user?.permissions.includes(1)) {
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
              ) : tab === "students" ? (
                <article className="col-span-1 md:row-span-2">
                  <ManageClassStudents selectedClass={selectedClass} />
                </article>
              ) : (
                tab === "teachers" && (
                  <article className="col-span-1 row-span-1">
                    <ManageClassTeacher
                      selectedClass={selectedClass}
                      setSelectedClass={setSelectedClass}
                    />
                  </article>
                )
              )}
            </div>
          </section>
        </div>
      </AdminLayout>
    </Layout>
  );
}
