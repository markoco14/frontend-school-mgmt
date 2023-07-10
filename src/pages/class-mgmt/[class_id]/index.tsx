import { classListAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classListAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import StudentList from "@/src/modules/student-mgmt/infrastructure/ui/StudentList";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async (context) => {
  const id = context?.query?.class_id;
  const students = await studentAdapter.listStudentsByClassId({
    id: Number(id),
  });

  return { props: { students } };
};

type Props = {
  classList: Student[];
  setClassList: Function;
}

const AllStudentList = (props: Props) => {
  const router = useRouter();
  const classId = Number(router.query.class_id);
  const [allStudents, setAllStudents] = useState<Student[]>();

  async function addStudentToClassList(student: Student) {
    await classListAdapter.addStudentToClassList({
      class_id: classId,
      student_id: student.id,
    }).then(res => {
      toast.success(`Student added to class!`)
      props.setClassList([...props.classList, student])
    });
    return;
  }

  useEffect(() => {
    async function getData() {
      const allStudents = await studentAdapter.getStudents().then((res) => {
        setAllStudents(res);
      });
    }

    getData();
  }, []);
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
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [classList, setClassList] = useState<Student[]>(students);

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Create classes here</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-3xl">Class name goes here</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
          <div className="flex items-baseline gap-4 mb-4">
            <p className="text-xl">Student List</p>
            <button
              onClick={() => {
                setIsAddingStudent(!isAddingStudent);
              }}
            >
              {isAddingStudent ? <span>Cancel</span> : <span>+ Student</span>}
            </button>
          </div>
          {isAddingStudent ? (
            <article>
              <AllStudentList classList={classList} setClassList={setClassList}/>
            </article>
          ) : (
            <StudentList students={classList} />
          )}
        </section>
      </div>
    </Layout>
  );
}
