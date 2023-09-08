import { StudentAttendance } from "../../../domain/entities/StudentAttendance";

const AttendanceNoteButton = ({
  studentAttendance,
  setIsWriteNote,
  setSelectedAttendance,
}: {
  studentAttendance: StudentAttendance;
  setIsWriteNote: Function;
  setSelectedAttendance: Function;
}) => {
  return (
    <>
      {studentAttendance.status !== 0 && (
        <span
          onClick={() => {
            setIsWriteNote(true);
            setSelectedAttendance(studentAttendance);
          }}
          className={`${
            studentAttendance.status === 1
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