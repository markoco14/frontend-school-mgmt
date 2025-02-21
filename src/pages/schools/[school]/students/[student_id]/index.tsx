import { AuthUser } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { studentAdapter } from "@/src/modules/students/adapters/studentAdapter";
import { Student } from "@/src/modules/students/entities/Student";
import { NextPageWithLayout } from "@/src/pages/_app";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";

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

type StudentShowPageProps = {
  user: AuthUser | null;
  student: Student | null; // server side prop
  error: string | null; // server side prop
}

const StudentShowPage: NextPageWithLayout<StudentShowPageProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const studentID = router.query.student_id


  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        await studentAdapter
          .getStudentByID({ id: Number(studentID) })
          .then((res) => {
            setStudent(res)
          })
      } catch (error) {
        if (error instanceof (Error)) {
          setError(error.message)
        } else {
          setError("No student found.")
        }
      } finally {
        setLoading(false)
      }
    }

    if (studentID) {
      try {
        getData()
      } catch (error) {
        toast.error("Unable to get student data.")
      }
    }
  }, [studentID])

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
          {loading ? (
            <p>loading</p>
          ) : !student ? (
                <article className="rounded border p-4 shadow">
                  <p>{error}</p>
                </article>
          ) : (

            <div className="grid max-w-[1000px] gap-4 sm:grid-cols-8">
              <div className="sm:col-span-2">
                <StudentPhoto student={student} />
              </div>
              <div className="flex flex-col gap-4 sm:col-span-6">
                <section className="rounded border p-2 shadow">
                  <p>A wonderful student with lots of potential.</p>
                </section>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </Layout>
  );
}

StudentShowPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default StudentShowPage;
