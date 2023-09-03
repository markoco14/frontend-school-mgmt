import { useRouter } from "next/router";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { useEffect, useState } from "react";
import { classStudentAdapter } from "../../adapters/classStudentAdapter";

export default function ClassStudentList() {
	
  const router = useRouter();
  const [classStudentList, setClassStudentList] = useState<ClassStudent[]>([]);
  useEffect(() => {
    async function getClassList() {
      await classStudentAdapter.list({class_id: Number(router?.query.class_id)})
      .then((res) => {
        console.log('class student list', res);
        setClassStudentList(res);
      })
    }
    if (router) {
      getClassList();
    }
  }, [router])
  return (
    <>
      {classStudentList?.length === 0 && (
        <article className="bg-gray-100 shadow-inner p-2 rounded">
          <p>There are no students in this class. Click here to add some.</p>
        </article>
      )}
      {classStudentList?.length >= 1 && (
        <article className="bg-gray-100 shadow-inner p-2 rounded">
          <ul className="flex flex-col gap-2 divide-y">
            {classStudentList?.map((student: ClassStudent, index: number) => (
              <li
                key={index}
                className="p-2 rounded hover:bg-blue-200 flex justify-between "
              >
                {student.student_id}
                {/* <button
                  onClick={() => {
                    removeStudentFromClassList(selectedClass?.id, student.id);
                  }}
                >
                  <i className="fa-solid fa-minus"></i>
                </button> */}
              </li>
            ))}
          </ul>
        </article>
      )}
    </>
  );
};