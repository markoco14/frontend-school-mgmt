import { Student } from "@/src/modules/students/domain/entities/Student";
import { StudentAttendance } from "../../../domain/entities/StudentAttendance";

const AttendanceNoteButton = ({
  student,
  setSelectedStudent,
  setIsWriteNote,
}: {
  student: Student;
  setSelectedStudent: Function;
  setIsWriteNote: Function;
}) => {
  return (
    <>
      {student?.attendance_for_day?.status !== 0 && (
        <span
          onClick={() => {
            setIsWriteNote(true);
            setSelectedStudent(student);
          }}
          className={`${
            student?.attendance_for_day?.status === 1
              ? "hover:text-orange-300"
              : "hover:text-red-700"
          } cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-2`}
        >
          Note
        </span>
      )}
    </>
  );
};

export default AttendanceNoteButton;
