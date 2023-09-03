import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { Class } from "../../../../domain/entities/Class";
import { useContext, useEffect, useState } from "react";
import { classStudentAdapter } from "../../../adapters/classStudentAdapter";
import toast from "react-hot-toast";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { ClassStudent } from "@/src/modules/class-mgmt/domain/entities/ClassStudent";
import AuthContext from "@/src/AuthContext";

export default function AddStudentToClassSection ({
  selectedClass,
  classStudentList,
  setClassStudentList
}: {
  selectedClass: Class;
  classStudentList: ClassStudent[];
  setClassStudentList: Function;
}) {
  const {selectedSchool} =useContext(AuthContext)
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
  }, [selectedSchool,  page]);

  function checkStudentInClassList({student}: {student: Student}) {
    return classStudentList.some((classListStudent) => student.id === classListStudent.id)
	}

  return (
    <>
      {loading && (
        <article className="bg-gray-100 shadow-inner p-2 rounded">
          <p className="min-h-[480px]">loading...</p>
        </article>
      )}
      {!loading && (
        <article className="bg-gray-100 shadow-inner p-2 rounded">
          <ul className="divide-y items-baseline">
            {allStudents?.map((student, index) => (
              <li
                key={index}
                className={`${classStudentList.find((classListStudent) => {
                    if (student.id === classListStudent.id) {
                      return true;
                    }
                    return false;
                  }) ? '' : 'bg-white rounded'} items-baseline p-2 flex justify-between`}
              >
                {student.first_name} {student.last_name}{" "}
                <button
                  disabled={checkStudentInClassList({student: student})}
                  onClick={() => addClassStudent(student)}
                  className="px-2 py-1 rounded bg-blue-300 disabled:hover:cursor-not-allowed disabled:bg-gray-300"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-evenly gap-2">
            <button
              className="disabled:cursor-not-allowed bg-blue-300 disabled:bg-gray-300 px-2 py-1 w-full rounded"
              disabled={page === 1}
              onClick={() => {
                setPage((prevPage) => prevPage - 1);
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              className="disabled:cursor-not-allowed bg-blue-300 disabled:bg-gray-300 px-2 py-1 w-full rounded"
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
};