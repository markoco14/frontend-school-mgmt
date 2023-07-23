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
  const selectedClass = await classAdapter.getClassById({id: Number(context.query.class_id)});
  const students = await studentAdapter.getStudentsByClassId({id: Number(context.query.class_id)});
  return {
    props: {
      selectedClass,
      students
    },
  };
};

type AllStudentListProps = {
  classList: Student[];
  setClassList: Function;
  selectedClass: Class;
}

const AllStudentList = (props: AllStudentListProps) => {
  const router = useRouter();
  const [allStudents, setAllStudents] = useState<Student[]>();

  async function addStudentToClassList(student: Student) {
    await classListAdapter.addStudentToClassList({
      class_id: props.selectedClass.id,
      student_id: student.id,
    }).then(res => {
      toast.success(`Student added to class!`)
      props.setClassList([...props.classList, student])
    });
    return;
  }

  useEffect(() => {
    async function getData() {
      const allStudents = await studentAdapter.getStudentsBySchoolId({id: props.selectedClass.school_id}).then((res) => {
        setAllStudents(res);
      });
    }

    getData();
  }, [props.selectedClass]);
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
  students
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [classList, setClassList] = useState<Student[]>(students);
  const router = useRouter();

  async function removeStudentFromClassList(classId: number, studentId: number) {
    await classListAdapter.removeStudentFromClassList({class_id: classId, student_id: studentId}).then((res) => {
      toast.success("student removed from class")
    })
    setClassList(prevClassList => prevClassList.filter(student => student.id !== studentId));
  }

  return (
    <Layout>
      <div>
        <section>
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-3xl">{selectedClass?.name}</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
          <article>
            <button onClick={async () => await classAdapter.deleteClassById({id: selectedClass.id})}>Delete</button>
          </article>
          <div className="flex items-baseline gap-4 mb-4">
            <p className="text-xl">Student List</p>
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
              <AllStudentList classList={classList} setClassList={setClassList} selectedClass={selectedClass}/>
            </article>
          ) : (
            <ul className="flex flex-col gap-2">
              {classList?.map((student: Student, index: number) => (
                <li
                  key={index}
                  className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
                >
                  {student.first_name} {student.last_name} <button onClick={() => {
                    removeStudentFromClassList(selectedClass?.id, student.id)
                  }}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Layout>
  );
}
