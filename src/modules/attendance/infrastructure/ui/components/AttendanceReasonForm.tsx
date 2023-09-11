import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { studentAttendanceAdapter } from "../../adapters/studentAttendanceAdapter";
import toast from "react-hot-toast";
import { Student } from "@/src/modules/students/domain/entities/Student";

type Inputs = {
  reason: string;
};

export default function AttendanceReasonForm({
  selectedStudent,
  handleUpdateAttendance,
  handleClose,
}: {
  selectedStudent: Student;
  handleUpdateAttendance: Function;
  handleClose: Function;
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await studentAttendanceAdapter
      .patchReason({
        attendance_id: Number(selectedStudent?.attendance_for_day?.id),
        reason: data.reason,
      })
      .then((res) => {
        toast.success("Reason updated successfully!");
        handleUpdateAttendance({ newAttendance: res });
        setTimeout(() => {
          handleClose();
        }, 250);
      });
    return;
  };

  return (
    <article className="grid gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <label>
          {selectedStudent?.attendance_for_day?.status === 1 ? (
            <span>
              Why is {selectedStudent?.first_name}{" "}
              <span className="underline decoration-orange-500 decoration-2 underline-offset-2">
                Late
              </span>
              ?
            </span>
          ) : (
            <span>
              Why is {selectedStudent?.first_name}{" "}
              <span className="underline decoration-red-500 decoration-2 underline-offset-2">
                Absent
              </span>
              ?
            </span>
          )}
          {errors.reason && <span className="text-red-500">required</span>}
        </label>
        <TextareaAutosize
          minRows={2}
          className="rounded border p-2 shadow-inner"
          defaultValue={selectedStudent?.attendance_for_day?.reason}
          {...register("reason", {
            minLength: 2,
            maxLength: 50,
          })}
        />
        <button className="w-full rounded bg-blue-600 p-2  text-white shadow duration-200 ease-in-out hover:bg-blue-900">
          Submit
        </button>
      </form>
    </article>
  );
}
