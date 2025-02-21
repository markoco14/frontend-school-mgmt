import { AuthUser } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import ListContainer from "@/src/modules/core/components/ListContainer";
import Modal from "@/src/modules/core/components/Modal";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { studentAdapter } from "@/src/modules/students/adapters/studentAdapter";
import RegisterNewStudentModal from "@/src/modules/students/components/RegisterNewStudentModal";
import { Student } from "@/src/modules/students/entities/Student";
import { NextPageWithLayout } from "@/src/pages/_app";
import { getSelectedSchool } from "@/src/utils/getSelectedSchool";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";

type StudentsPageProps = {
  user: AuthUser | null
}

const StudentsPage: NextPageWithLayout<StudentsPageProps> = ({ user }) => {
  const [isAddStudent, setIsAddStudent] = useState<boolean>(false);
  const router = useRouter();
  const selectedSchool = getSelectedSchool(router.asPath);
  const [loading, setLoading] = useState<boolean>(false);

  const [students, setStudents] = useState<Student[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isNext, setIsNext] = useState<boolean>(false);


  useEffect(() => {
    async function getData() {
      setLoading(true);
      await studentAdapter
        .listSchoolStudents({ schoolSlug: selectedSchool, page: page })
        .then((res) => {
          if (res.next) {
            setIsNext(true);
          } else {
            setIsNext(false);
          }

          setStudents(res.results);
        });
      setLoading(false);
    }

    if (user) {
      try {
        getData();
      } catch (error) {
        toast.error("Unable to get student data.")
      }
    }
  }, [user, selectedSchool, page]);

  if (user && user.membership !== "OWNER") {
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
              <article className="min-h-[200px] rounded border p-4 shadow">
                <ul className="flex flex-col divide-y divide-white">
                  <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
                  <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
                  <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
                  <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
                </ul>
              </article>
            ) : students && students.length === 0 ? (
              <article className="mb-4 grid gap-2 rounded border p-4 shadow">
                No students found
              </article>
            ) : (
              <article className="mb-4 grid gap-2 rounded border p-4 shadow">
                <ListContainer>
                  {students?.map((student: Student, index) => (
                    <li key={index} className="flex justify-between gap-4">
                      <Link
                        href={`/schools/${selectedSchool}/students/${student.id}`}
                        className="w-full rounded p-2 hover:bg-blue-300"
                      >
                        {student.first_name} {student.last_name}
                      </Link>
                    </li>
                  ))}
                </ListContainer>
                <div className="flex justify-evenly gap-2">
                  <button
                    className="w-full rounded bg-blue-300 px-2 py-1 hover:cursor-pointer hover:disabled:cursor-default disabled:bg-gray-300 disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => {
                      setPage((prevPage) => prevPage - 1);
                    }}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button
                    className="w-full rounded bg-blue-300 px-2 py-1 hover:cursor-pointer hover:disabled:cursor-default disabled:bg-gray-300 disabled:opacity-50"
                    disabled={!isNext}
                    onClick={() => {
                      setPage((prevPage) => prevPage + 1);
                    }}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
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

StudentsPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default StudentsPage;

// export default function StudentsHome() {
//   const [isAddStudent, setIsAddStudent] = useState<boolean>(false);

//   const { user, selectedSchool } = useUserContext();
//   const [loading, setLoading] = useState<boolean>(false);

//   const [students, setStudents] = useState<Student[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [isNext, setIsNext] = useState<boolean>(false);

//   useEffect(() => {
//     async function getData() {
//       setLoading(true);
//       if (selectedSchool) {
//         await studentAdapter
//           .listSchoolStudents({ schoolId: selectedSchool.id, page: page })
//           .then((res) => {
//             if (res.next) {
//               setIsNext(true);
//             } else {
//               setIsNext(false);
//             }

//             setStudents(res.results);
//           });
//       }
//       setLoading(false);
//     }

//     if (user) {
//       try {
//         getData();
//       } catch (error) {
//         toast.error("Unable to get student data.")
//       }
//     }
//   }, [user, selectedSchool, page]);

//   if (user?.role !== "OWNER") {
//     return (
//       <Layout>
//         <AdminLayout>
//           <PermissionDenied />
//         </AdminLayout>
//       </Layout>
//     );
//   }

//   function handleClose() {
//     setIsAddStudent(false);
//   }
//   return (
//     <Layout>
//       <AdminLayout>
//         <div className="h-full w-full bg-white">
//           {/* <SchoolHeader /> */}
//           <section className="max-w-[1000px]">
//             <div className="mb-4 flex items-baseline justify-between">
//               <h2 className="text-3xl">Students</h2>
//               <button
//                 onClick={() => {
//                   setIsAddStudent(true);
//                 }}
//                 className="rounded bg-blue-300 p-2 hover:bg-blue-500"
//               >
//                 <i className="fa-solid fa-plus"></i>{" "}
//                 <i className="fa-solid fa-user"></i>
//               </button>
//             </div>
//             {loading ? (
//               <article className="min-h-[200px] rounded bg-gray-100 p-2 shadow-inner">
//                 <p>loading...</p>
//               </article>
//             ) : (
//               <article className="mb-4 grid gap-2 rounded border p-4 shadow">
//                 {!students && <NoData text={"No students found"} />}
//                 {students && (
//                   <>
//                     <ListContainer>
//                       {students?.map((student: Student, index) => (
//                         <li key={index} className="flex justify-between gap-4">
//                           <Link
//                             href={`/students/${student.id}`}
//                             className="w-full rounded p-2 hover:bg-blue-300"
//                           >
//                             {student.first_name} {student.last_name}
//                           </Link>
//                         </li>
//                       ))}
//                     </ListContainer>
//                     <div className="flex justify-evenly gap-2">
//                       <button
//                         className="w-full rounded bg-blue-300 px-2 py-1 disabled:cursor-not-allowed disabled:bg-gray-300"
//                         disabled={page === 1}
//                         onClick={() => {
//                           setPage((prevPage) => prevPage - 1);
//                         }}
//                       >
//                         <i className="fa-solid fa-arrow-left"></i>
//                       </button>
//                       <button
//                         className="w-full rounded bg-blue-300 px-2 py-1 disabled:cursor-not-allowed disabled:bg-gray-300"
//                         disabled={!isNext}
//                         onClick={() => {
//                           setPage((prevPage) => prevPage + 1);
//                         }}
//                       >
//                         <i className="fa-solid fa-arrow-right"></i>
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </article>
//             )}
//           </section>
//           <Modal
//             show={isAddStudent}
//             close={handleClose}
//             title="Add New Student"
//           >
//             <RegisterNewStudentModal setStudents={setStudents} />
//           </Modal>
//         </div>
//       </AdminLayout>
//     </Layout>
//   );
// }


