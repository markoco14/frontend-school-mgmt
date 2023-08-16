import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import { classListAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classListAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const getServerSideProps: GetServerSideProps<{
  selectedClass: Class;
  students: Student[];
}> = async (context) => {
  const selectedClass = await classAdapter.getClassById({
    id: Number(context.query.class_id),
  });
  const students = await studentAdapter.getStudentsByClassId({
    id: Number(context.query.class_id),
  });
  return {
    props: {
      selectedClass,
      students,
    },
  };
};

const AddStudentToClassSection = ({
  classList,
  setClassList,
  selectedClass,
}: {
  classList: Student[];
  setClassList: Function;
  selectedClass: Class;
}) => {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [page, setPage] = useState<number>(1);
  const [next, setNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function addStudentToClassList(student: Student) {
    await classListAdapter
      .addStudentToClassList({
        class_id: selectedClass.id,
        student_id: student.id,
      })
      .then((res) => {
        toast.success(`Student added to class!`);
        setClassList([...classList, student]);
      });
    return;
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await studentAdapter
        .getStudentsBySchoolId({ id: selectedClass.school_id, page: page })
        .then((res) => {
          if (res.next) {
            setNext(true);
          } else {
            setNext(false);
          }
          setAllStudents(res.results);
          setLoading(false);
        });
    }
    getData();
  }, [selectedClass, classList, page]);

  return (
    <>
      {loading && (
        <p className="min-h-[480px]">loading...</p>
      )}
      {!loading && (
        <>
          <ul className="min-h-[480px]">
            {allStudents?.map((student, index) => (
              <li
                key={index}
                className="items-baseline p-2 flex justify-between"
              >
                {student.first_name} {student.last_name}{" "}
                <button
                  // @ts-ignore
                  disabled={classList.find((classListStudent) => {
                    if (student.id === classListStudent.id) {
                      return true;
                    }
                    return false;
                  })}
                  onClick={() => addStudentToClassList(student)}
                  className="px-2 py-1 rounded bg-blue-300 disabled:hover:cursor-not-allowed disabled:bg-gray-300"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
          <section className="flex justify-evenly gap-2">
            <button
              className="disabled:cursor-not-allowed bg-blue-300 disabled:bg-gray-300 px-2 py-1 w-full rounded"
              disabled={page === 1}
              onClick={() => {
                setPage((prevPage) => prevPage - 1);
                console.log(page - 1);
              }}
            >
              Prev
            </button>
            <button
              className="disabled:cursor-not-allowed bg-blue-300 disabled:bg-gray-300 px-2 py-1 w-full rounded"
              disabled={!next}
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
                console.log(page + 1);
              }}
            >
              Next
            </button>
          </section>
        </>
      )}
    </>
  );
};

const ClassListSection = ({
  selectedClass,
  classList,
  removeStudentFromClassList,
}: {
  selectedClass: Class;
  classList: Student[];
  removeStudentFromClassList: Function;
}) => {
  return (
    <section>
      {classList.length === 0 && (
        <article className="bg-gray-100 shadow-inner p-2 rounded">
          <p>There are no students in this class. Click here to add some.</p>
        </article>
      )}
      {classList.length >= 1 && (
        <ul className="flex flex-col rounded gap-2 divide-y mb-8 bg-gray-100 shadow-inner">
          {classList?.map((student: Student, index: number) => (
            <li
              key={index}
              className="p-2 rounded-md hover:bg-blue-200 flex justify-between "
            >
              {student.first_name} {student.last_name}{" "}
              <button
                onClick={() => {
                  removeStudentFromClassList(selectedClass?.id, student.id);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const DeleteClassSection = ({
  selectedClass,
  setCurrentClass,
}: {
  selectedClass: Class;
  setCurrentClass: Function;
}) => {
  async function handleDeleteClass() {
    setCurrentClass(undefined);
    toast.success("Class deleted!");
  }

  return (
    <section>
      <h2 className="text-xl mb-4">Danger Zone</h2>
      <article className="bg-gray-100 shadow-inner p-2 rounded">
        <p className="mb-8">
          Warning, you cannot undo this. Student data will not be deleted, but
          all report data associated with the class will be gone forever.
        </p>
        <div className="flex justify-center">
          <button
            className="rounded underline underline-offset-2 text-red-500 p-2 hover:bg-red-300 hover:text-red-900"
            onClick={async () =>
              await classAdapter
                .deleteClassById({ id: selectedClass.id })
                .then(handleDeleteClass)
            }
          >
            Delete Class
          </button>
        </div>
      </article>
    </section>
  );
};

export default function ManageClassDetails({
  selectedClass,
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [classList, setClassList] = useState<Student[]>(students);
  const [currentClass, setCurrentClass] = useState<Class | undefined>(
    selectedClass
  );
  const { user } = useContext(AuthContext);

  async function removeStudentFromClassList(
    classId: number,
    studentId: number
  ) {
    await classListAdapter
      .removeStudentFromClassList({ class_id: classId, student_id: studentId })
      .then((res) => {
        toast.success("student removed from class");
      });
    setClassList((prevClassList) =>
      prevClassList.filter((student) => student.id !== studentId)
    );
  }

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        {currentClass && (
          <>
            <section>
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-3xl">{selectedClass?.name}</h2>
                <Link href="/class-mgmt">Back</Link>
              </div>
              <div className="flex items-baseline gap-4 mb-4">
                <h3 className="text-xl">Student List</h3>
                <button
                  onClick={() => {
                    setIsAddingStudent(!isAddingStudent);
                  }}
                >
                  {isAddingStudent ? <span>Done</span> : <span>+ Student</span>}
                </button>
              </div>
            </section>
            {isAddingStudent && (
              <AddStudentToClassSection
                classList={classList}
                setClassList={setClassList}
                selectedClass={selectedClass}
              />
            )}
            {!isAddingStudent && (
              <ClassListSection
                selectedClass={selectedClass}
                classList={classList}
                removeStudentFromClassList={removeStudentFromClassList}
              />
            )}
            <DeleteClassSection
              selectedClass={selectedClass}
              setCurrentClass={setCurrentClass}
            />
          </>
        )}
        {!currentClass && (
          <div className="flex flex-col xs:flex-row xs:justify-between xs:gap-2 items-baseline mb-4 bg-gray-100 shadow-inner p-2 rounded">
            <h2 className="text-3xl">This class was deleted.</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
        )}
      </>
    </Layout>
  );
}
