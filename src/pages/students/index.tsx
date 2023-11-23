import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import Modal from "@/src/modules/core/components/Modal";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { studentAdapter } from "@/src/modules/students/adapters/studentAdapter";
import RegisterNewStudentModal from "@/src/modules/students/components/RegisterNewStudentModal";
import { Student } from "@/src/modules/students/entities/Student";
import Link from "next/link";
import { useEffect, useState } from "react";

const NoData = ({ text }: { text: string }) => {
  return (
    <article className="mb-4 grid gap-2 rounded border p-4 shadow xs:grid-cols-2">
      <p>{text}</p>
    </article>
  );
};

export default function StudentsHome() {
  const [isAddStudent, setIsAddStudent] = useState<boolean>(false);

  const { user, selectedSchool } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isNext, setIsNext] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (selectedSchool) {
        await studentAdapter
          .listSchoolStudents({ schoolId: selectedSchool.id, page: page })
          .then((res) => {
            if (res.next) {
              setIsNext(true);
            } else {
              setIsNext(false);
            }

            setStudents(res.results);
          });
      }
      setLoading(false);
    }

    if (user) {
      try {
        getData();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user, selectedSchool, page]);

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
    setIsAddStudent(false);
  }
  return (
    <Layout>
      <AdminLayout>
        <div className="h-full w-full bg-white">
          {/* <SchoolHeader /> */}
          <section className="max-w-[1000px]">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-3xl">Students</h2>
              <button
                onClick={() => {
                  setIsAddStudent(true);
                }}
                className="rounded bg-blue-300 p-2 hover:bg-blue-500"
              >
                <i className="fa-solid fa-plus"></i>{" "}
                <i className="fa-solid fa-user"></i>
              </button>
            </div>
            {loading ? (
              <article className="min-h-[200px] rounded bg-gray-100 p-2 shadow-inner">
                <p>loading...</p>
              </article>
            ) : (
              <article className="mb-4 grid gap-2 rounded border p-4 shadow">
                {!students && <NoData text={"No students found"} />}
                {students && (
                  <>
                    <ul className="min-h-[420px] divide-y divide-gray-300 sm:h-full">
                      {students?.map((student: Student, index) => (
                        <li key={index} className="flex justify-between gap-4">
                          <Link
                            href={`/students/${student.id}`}
                            className="w-full rounded p-2 hover:bg-blue-300"
                          >
                            {student.first_name} {student.last_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-evenly gap-2">
                      <button
                        className="w-full rounded bg-blue-300 px-2 py-1 disabled:cursor-not-allowed disabled:bg-gray-300"
                        disabled={page === 1}
                        onClick={() => {
                          setPage((prevPage) => prevPage - 1);
                        }}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                      <button
                        className="w-full rounded bg-blue-300 px-2 py-1 disabled:cursor-not-allowed disabled:bg-gray-300"
                        disabled={!isNext}
                        onClick={() => {
                          setPage((prevPage) => prevPage + 1);
                        }}
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </>
                )}
              </article>
            )}
          </section>
          <Modal
            show={isAddStudent}
            close={handleClose}
            title="Add New Student"
          >
            <RegisterNewStudentModal setStudents={setStudents} />
          </Modal>
        </div>
      </AdminLayout>
    </Layout>
  );
}
