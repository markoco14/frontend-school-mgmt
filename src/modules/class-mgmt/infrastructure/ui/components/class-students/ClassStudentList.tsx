
import { ClassStudent } from "../../../../domain/entities/ClassStudent";

export default function ClassStudentList({classStudentList}: {classStudentList: ClassStudent[]}) {
	// async function removeStudentFromClassList(
  //   classId: number,
  //   studentId: number
  // ) {
  //   await classStudentAdapter
  //     .delete({ class_id: classId, student_id: studentId })
  //     .then((res) => {
  //       toast.success("student removed from class");
  //     });
  //   setClassList((prevClassList) =>
  //     prevClassList?.filter((student) => student.id !== studentId)
  //   );
  // }
  
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