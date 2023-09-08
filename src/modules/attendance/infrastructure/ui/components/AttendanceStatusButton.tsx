import toast from "react-hot-toast";
import { StudentAttendance } from "../../../domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "../../adapters/studentAttendanceAdapter";

const AttendanceStatusButton = ({
  studentAttendance,
  status,
  handleUpdateAttendance,
}: {
  studentAttendance: StudentAttendance;
  status: number;
  handleUpdateAttendance: Function;
}) => {
  return (
    <>
      {status === 0 && (
        <span
          onClick={async () => {
            if (studentAttendance.status === status) {
              toast(`Student ${studentAttendance.student_id} already checked`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: studentAttendance.id,
                status: 0,
              })
              .then((res) => {
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`Student ${studentAttendance.student_id} updated`);
          }}
          className={`${
            studentAttendance.status === 0
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
            if (studentAttendance.status === status) {
              toast(`Student ${studentAttendance.student_id} already checked`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: studentAttendance.id,
                status: 1,
              })
              .then((res) => {
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`Student ${studentAttendance.student_id} updated`);
          }}
          className={`${
            studentAttendance.status === 1
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
            if (studentAttendance.status === status) {
              toast(`Student ${studentAttendance.student_id} already checked`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: studentAttendance.id,
                status: 2,
              })
              .then((res) => {
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`Student ${studentAttendance.student_id} updated`);
          }}
          className={`${
            studentAttendance.status === 2
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