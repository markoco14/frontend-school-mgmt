import Image from "next/image";
import { ClassStudent } from "@/src/modules/classes/entities/ClassStudent";
import ListContainer from "@/src/modules/core/components/ListContainer";

export default function ClassStudentList({
  classStudentList,
}: {
  classStudentList: ClassStudent[];
}) {
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
      {classStudentList?.length === 0 ? (
        <article>
          <p>There are no students in this class. Click here to add some.</p>
        </article>
      ) : (
        <article>
          <ListContainer>
            {classStudentList?.map((student: ClassStudent, index: number) => (
              <li
                key={index}
                className="flex items-center gap-4 rounded p-2 hover:bg-blue-200"
              >
                <div className="relative col-span-1 flex justify-center">
                  <Image
                    src={student.student ? student.student?.photo_url : ""}
                    alt={`An image of ${student.student?.first_name}`}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </div>
                <div className="text-lg">
                  {student.student?.first_name} {student.student?.last_name}
                </div>
                {/* <button
                  onClick={() => {
                    removeStudentFromClassList(selectedClass?.id, student.id);
                  }}
                >
                  <i className="fa-solid fa-minus"></i>
                </button> */}
              </li>
            ))}
          </ListContainer>
        </article>
      )}
    </>
  );
}
