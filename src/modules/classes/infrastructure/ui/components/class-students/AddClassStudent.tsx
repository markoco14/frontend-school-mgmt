import AuthContext from "@/src/AuthContext";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { ClassStudent } from "@/src/modules/classes/domain/entities/ClassStudent";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { studentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAdapter";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClassEntity } from "../../../../domain/entities/ClassEntity";
import { classStudentAdapter } from "../../../adapters/classStudentAdapter";

export default function AddStudentToClassSection({
  selectedClass,
  classStudentList,
  setClassStudentList,
}: {
  selectedClass: ClassEntity;
  classStudentList: ClassStudent[];
  setClassStudentList: Function;
}) {
  const { selectedSchool } = useContext(AuthContext);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [page, setPage] = useState<number>(1);
  const [next, setNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function addClassStudent(student: Student) {
    await classStudentAdapter
      .add({
        class_id: selectedClass.id,
        student_id: student.id,
      })
      .then((res) => {
        toast.success(`Student added to class!`);
        setClassStudentList([...classStudentList, student]);
      });
    return;
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await studentAdapter
        .listSchoolStudents({ id: selectedSchool.id, page: page })
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
    selectedSchool && getData();
  }, [selectedSchool, page]);

  function checkStudentInClassList({ student }: { student: Student }) {
    return classStudentList.some(
      (classListStudent) => student.id === classListStudent.id,
    );
  }

  return (
    <>
      {loading ? (
        <Skeleton>
          <StudentListSkeletonProps studentQuantity={15} />
        </Skeleton>
      ) : (
        <article className="rounded bg-gray-100 p-2 shadow-inner">
          <ul className="items-baseline divide-y">
            {allStudents?.map((student, index) => (
              <li
                key={index}
                className={`${
                  classStudentList.find((classListStudent) => {
                    if (student.id === classListStudent.id) {
                      return true;
                    }
                    return false;
                  })
                    ? ""
                    : "rounded bg-white"
                } flex items-baseline justify-between p-2`}
              >
                {student.first_name} {student.last_name}{" "}
                <button
                  disabled={checkStudentInClassList({ student: student })}
                  onClick={() => addClassStudent(student)}
                  className="rounded bg-blue-300 px-2 py-1 disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
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
              disabled={!next}
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </article>
      )}
    </>
  );
}
