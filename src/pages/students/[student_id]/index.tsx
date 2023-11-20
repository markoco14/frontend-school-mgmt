import { useUserContext } from "@/src/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/components/ParamsPageTabNav";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { studentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAdapter";
import Evaluations from "@/src/modules/students/infrastructure/ui/evaluation/Evaluations";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const StudentPhoto = ({ student }: { student: Student }) => {
  return (
    <section className="flex items-center gap-4 border shadow sm:grid">
      <div className="relative h-24 w-24 sm:aspect-square sm:h-full sm:w-full">
        <Image
          src={student ? student.photo_url : ""}
          alt={`An image of ${student.first_name}`}
          fill={true}
          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <article className="sm:mb-4">
        <p className="text-center text-2xl">
          {student.first_name} {student.last_name}
        </p>
      </article>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<{
  student: Student;
}> = async (context) => {
  const id = Number(context.query.student_id);
  const student = await studentAdapter.getStudent({ id: id });

  return { props: { student } };
};

export default function Home({
  student,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = useUserContext();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";

  const links = [
    {
      value: 1,
      name: "Profile",
      urlString: "profile",
    },
    {
      value: 2,
      name: "Evaluations",
      urlString: "evaluations",
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
          {/* <SchoolHeader /> */}
          <Link href="/students">Back</Link>
          <div className="grid max-w-[1000px] gap-4 sm:grid-cols-8">
            <div className="sm:col-span-2">
              <StudentPhoto student={student} />
            </div>
            <div className="flex flex-col gap-4 sm:col-span-6">
              <ParamsPageTabNav
                queryParam={student.id}
                links={links}
                tab={tab}
              />
              {/* <PageTabNavigation links={links} tab={tab} setTab={setTab} /> */}
              {tab === "profile" && (
                <section className="rounded border p-2 shadow">
                  <h2>Profile</h2>
                </section>
              )}
              {tab === "evaluations" && (
                <section className="rounded border p-2 shadow">
                  <Evaluations student={student} />
                </section>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
}
