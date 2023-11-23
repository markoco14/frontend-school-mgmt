import { Student } from "@/src/modules/students/entities/Student";
import toast from "react-hot-toast";
import { studentAttendanceAdapter } from "../../../adapters/studentAttendanceAdapter";

const AttendanceStatusButton = ({
  student,
  status,
  handleUpdateAttendance,
  setIsWriteNote,
  setSelectedStudent,
}: {
  student: Student;
  status: number;
  handleUpdateAttendance: Function;
  setIsWriteNote: Function;
  setSelectedStudent: Function;
}) => {
  return (
    <>
      {status === 0 && (
        <span
          onClick={async () => {
            if (student.attendance_for_day?.status === status) {
              toast(`Student ${student?.first_name} already present`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: Number(student.attendance_for_day?.id),
                status: 0,
                reason: null,
              })
              .then((res) => {
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`${student?.first_name}'s attendance set to on time`);
          }}
          className={`${
            student.attendance_for_day?.status === 0
              ? `bg-green-300 hover:bg-green-500`
              : "hover:bg-gray-300"
          } grid aspect-square w-8 cursor-pointer place-items-center rounded border`}
        >
          <i className="fa-solid fa-check" />
        </span>
      )}
      {status === 1 && (
        <span
          onClick={async () => {
            if (student.attendance_for_day?.status === status) {
              toast(`Student ${student?.first_name} already late`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: Number(student.attendance_for_day?.id),
                status: 1,
              })
              .then((res) => {
                setIsWriteNote(true);
                setSelectedStudent(student);
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`${student?.first_name}'s attendance set to late`);
          }}
          className={`${
            student.attendance_for_day?.status === 1
              ? `bg-orange-300 hover:bg-orange-500`
              : "hover:bg-gray-300"
          } grid aspect-square w-8 cursor-pointer place-items-center rounded border`}
        >
          <span>L</span>
        </span>
      )}
      {status === 2 && (
        <span
          onClick={async () => {
            if (student.attendance_for_day?.status === status) {
              toast(`Student ${student?.first_name} already absent`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: Number(student.attendance_for_day?.id),
                status: 2,
              })
              .then((res) => {
                setIsWriteNote(true);
                setSelectedStudent(student);
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`${student?.first_name}'s attendance set to absent`);
          }}
          className={`${
            student.attendance_for_day?.status === 2
              ? `bg-red-300 hover:bg-red-500`
              : "hover:bg-gray-300"
          } grid aspect-square w-8 cursor-pointer place-items-center rounded border`}
        >
          <span>A</span>
        </span>
      )}
    </>
  );
};

export default AttendanceStatusButton;
