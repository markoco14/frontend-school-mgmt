import AuthContext from "@/src/AuthContext";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import ManageClassTeacher from "@/src/modules/classes/infrastructure/ui/components/ManageClassTeacher";
import ManageClassStudents from "@/src/modules/classes/infrastructure/ui/components/class-students/ManageClassStudents";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

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
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState<number>(1);

  const links = [
    {
      value: 1,
      name: "Class Info",
    },
    {
      value: 2,
      name: "Students",
    },
    {
      value: 3,
      name: "Teachers",
    },
  ];

  if (!user?.permissions.includes(1)) {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="grid gap-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-3xl">{selectedClass?.name}</h2>
          <Link href="/classes">Back</Link>
        </div>
        <nav className="flex gap-4 overflow-x-auto rounded border p-2 shadow">
          {links.map((button) => (
            <button
              className={`${
                button.value === tab &&
                "duration underline decoration-blue-500 decoration-2 underline-offset-2 ease-in-out"
              }`}
              key={button.value}
              onClick={() => {
                setTab(button.value);
                // router.push(`/?tab=${button.value}`)
              }}
            >
              {button.name}
            </button>
          ))}
        </nav>
        {/* <PageTabNavigation links={links} tab={tab} setTab={setTab} /> */}
        {tab === 1 ? (
          <article className="col-span-1 rounded border p-2 shadow md:row-span-2">
            <p>Class info goes here.</p>
          </article>
        ) : tab === 2 ? (
          <article className="col-span-1 md:row-span-2">
            <ManageClassStudents selectedClass={selectedClass} />
          </article>
        ) : (
          tab === 3 && (
            <article className="col-span-1 row-span-1">
              <ManageClassTeacher
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
              />
            </article>
          )
        )}
      </section>
    </Layout>
  );
}
