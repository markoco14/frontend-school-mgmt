import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import { classListAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classListAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

type AllStudentListProps = {
  classList: Student[];
  setClassList: Function;
  selectedClass: Class;
};

const AllStudentList = (props: AllStudentListProps) => {
  const router = useRouter();
  const [allStudents, setAllStudents] = useState<Student[]>();

  async function addStudentToClassList(student: Student) {
    await classListAdapter
      .addStudentToClassList({
        class_id: props.selectedClass.id,
        student_id: student.id,
      })
      .then((res) => {
        toast.success(`Student added to class!`);
        setAllStudents((prevAllStudents) =>
          prevAllStudents?.filter(
            (thisStudent) => thisStudent.id !== student.id
          )
        );
        props.setClassList([...props.classList, student]);
      });
    return;
  }

  useEffect(() => {
    async function getData() {
      await studentAdapter
        .getStudentsBySchoolId({ id: props.selectedClass.school_id })
        .then((res) => {
          setAllStudents(
            res.filter(
              (allStudent) =>
                !props.classList.some(
                  (classStudent) => classStudent.id === allStudent.id
                )
            )
          );
        });
    }
    getData();
  }, [props.selectedClass, props.classList]);
  return (
    <ul>
      {allStudents?.map((student, index) => (
        <li key={index}>
          {student.first_name} {student.last_name}{" "}
          <button onClick={() => addStudentToClassList(student)}>Add</button>
        </li>
      ))}
    </ul>
  );
};

export default function ClassList({
  selectedClass,
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [classList, setClassList] = useState<Student[]>(students);
  const [currentClass, setCurrentClass] = useState<Class | undefined>(
    selectedClass
  );

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

  async function handleDeleteClass() {
    setCurrentClass(undefined);
    toast.success('Class deleted!')
  }

  return (
    <Layout>
      <div>
        <section>
          {currentClass ? (
            <>
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
              {isAddingStudent ? (
                <article>
                  <AllStudentList
                    classList={classList}
                    setClassList={setClassList}
                    selectedClass={selectedClass}
                  />
                </article>
              ) : (
                <ul className="flex flex-col rounded gap-2 divide-y mb-8 bg-gray-100 shadow-inner">
                  {classList?.map((student: Student, index: number) => (
                    <li
                      key={index}
                      className="p-2 rounded-md hover:bg-blue-200 flex justify-between "
                    >
                      {student.first_name} {student.last_name}{" "}
                      <button
                        onClick={() => {
                          removeStudentFromClassList(
                            selectedClass?.id,
                            student.id
                          );
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              
              
            </>
          ) : (
            <div className="flex justify-between items-baseline mb-4">
              <h2 className="text-3xl">This class was deleted.</h2>
              <Link href="/class-mgmt">Back</Link>
            </div>
          )}
        </section>
        <section>
          <h2 className="text-xl mb-4">Danger Zone</h2>
          <article className="bg-gray-100 shadow-inner p-2 rounded">
            <p className="mb-8">Warning, you cannot undo this. Student data will not be deleted, but all report data associated with the class will be gone forever.</p>
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
      </div>
    </Layout>
  );
}
