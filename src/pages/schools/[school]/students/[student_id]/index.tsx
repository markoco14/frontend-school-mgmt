import { AuthUser } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { studentAdapter } from "@/src/modules/students/adapters/studentAdapter";
import { Student } from "@/src/modules/students/entities/Student";
import { NextPageWithLayout } from "@/src/pages/_app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";

type StudentShowPageProps = {
  user: AuthUser | null;
  student: Student | null;
  error: string | null;
}

const StudentShowPage: NextPageWithLayout<StudentShowPageProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [student, setStudent] = useState<Student | null>(null);
  const router = useRouter();
  const studentID = router.query.student_id
  const selectedSchool = router.query.school ? router.query.school : null

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getData() {
      setLoading(true);
      try {
        const response = await studentAdapter
          .getStudentByID({ id: Number(studentID), signal })
        setStudent(response)
        setLoading(false)
      } catch (error) {
        if (signal.aborted) {
          return
        }

        if (error instanceof (Error)) {
          toast.error(error.message)
          setLoading(false)
        } else {
          toast.error("No student found.")
          setLoading(false)
        }
      }
    }

    if (studentID) {
      try {
        getData()
      } catch (error) {
        toast.error("Unable to get student data.")
      }
    }

    return () => {
      controller.abort();
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
          <Link href={`/schools/${selectedSchool}/students`} className="inline-block p-2 rounded-md border mb-4">Back</Link>
          {loading ? (
            <>
              <section className="flex justify-center sm:justify-start mb-4">
                <div className="h-[100px] aspect-square bg-gray-300 animate-pulse rounded-md">
                  
                </div>
              </section>
              <section className="grid divide-y divide-white">
                <h2 className="text-xl font-semibold bg-gray-200 animate-pulse rounded-md h-[28px]"></h2>
                <p className="bg-gray-200 animate-pulse rounded-md h-[24px]"></p>
                <p className="bg-gray-200 animate-pulse rounded-md h-[24px]"></p>
              </section>
            </>
          ) : !student ? (
            <p>No student found.</p>
          ) : (
            <>
              <section className="flex justify-center sm:justify-start mb-4">
                <div className="h-[100px] aspect-square">
                  {student.photoUrl ? (
                    <Image
                      src={student ? student.photoUrl : ""}
                      alt={`An image of ${student.firstName}`}
                      width={250}
                      height={250}
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded-md"></div>
                  )}
                </div>
              </section>
              <section className="">
                <h2 className="text-xl font-semibold">{student.firstName} {student.lastName}</h2>
                <p>Age: {student.age}</p>
                <p>Gender: {student.gender === 0 ? "Male" : "Female"}</p>
              </section>
            </>
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
