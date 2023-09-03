import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { ClassStudent } from "@/src/modules/class-mgmt/domain/entities/ClassStudent";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import { classStudentAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classStudentAdapter";
import ClassStudentList from "@/src/modules/class-mgmt/infrastructure/ui/components/ClassStudentList";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { Teacher } from "@/src/modules/user-mgmt/domain/entities/Teacher";
import { userAdapter } from "@/src/modules/user-mgmt/infrastructure/adapters/userAdapter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";







export default function ManageClassDetails() {
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [classList, setClassList] = useState<Student[]>();
  const [selectedClass, setSelectedClass] = useState<Class>();
  const { user, selectedSchool } = useContext(AuthContext);
  const [teachers, setTeachers] = useState<Teacher[]>()
  const [isAddTeacher, setIsAddTeacher] = useState<boolean>(false)
  const router = useRouter();

  async function removeStudentFromClassList(
    classId: number,
    studentId: number
  ) {
    await classStudentAdapter
      .deleteClassStudent({ class_id: classId, student_id: studentId })
      .then((res) => {
        toast.success("student removed from class");
      });
    setClassList((prevClassList) =>
      prevClassList?.filter((student) => student.id !== studentId)
    );
  }

  useEffect(() => {
    async function getClassData() {
      await classAdapter.getClassById({id: Number(router?.query.class_id)})
      .then((res) => {
        console.log('class data', res)
        setSelectedClass(res)
      })
    }

    if (router) {
      getClassData();
    }
  }, [router])

  async function handleAddTeacher({id, teacherId}: {id: number, teacherId: number}) {
    await classAdapter.addClassTeacher({id: id, teacherId: teacherId})
    .then((res) => setSelectedClass(res));
  }

  async function handleRemoveTeacher({id}: {id: number}) {
    await classAdapter.deleteClassTeacher({id: id})
    .then((res) => setSelectedClass(res));
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
        {selectedClass && (
          <>
            <section className="mb-4">
              <div className="flex justify-between items-baseline mb-2">
                <h2 className="text-3xl">{selectedClass?.name}</h2>
                <Link href="/class-mgmt">Back</Link>
              </div>
              {selectedClass.day && (
                <p className="text-xl">{selectedClass.day[0] === 1 ? "Monday" : "Wednesday"} & {selectedClass.day[1] === 4 ? "Thursday" : "Friday"}</p>
              )}
            </section>
              <div className="flex justify-between items-baseline gap-4 mb-4">
                <h3 className="text-xl">Student List</h3>
                <button
                className="bg-blue-300 p-2 rounded"
                  onClick={() => {
                    setIsAddingStudent(!isAddingStudent);
                  }}
                >
                  {isAddingStudent ? <span><i className="fa-solid fa-check"></i></span> : <span><i className="fa-solid fa-plus"></i> <i className="fa-solid fa-user"></i></span>}
                </button>
              </div>
              <ClassStudentList />
          </>
        )}
        {!selectedClass && (
          <div className="flex flex-col xs:flex-row xs:justify-between xs:gap-2 items-baseline mb-4 bg-gray-100 shadow-inner p-2 rounded">
            <h2 className="text-3xl">This class was deleted.</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
        )}
      </>
    </Layout>
  );
}
