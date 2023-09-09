import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { StudentAttendance } from "../../../domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "../../adapters/studentAttendanceAdapter";
import toast from "react-hot-toast";

type Inputs = {
  reason: string;
};

export default function AttendanceReasonForm({
  selectedAttendance,
  handleUpdateAttendance,
}: {
  selectedAttendance: StudentAttendance;
  handleUpdateAttendance: Function;
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
        attendance_id: selectedAttendance.id,
        reason: data.reason,
      })
      .then((res) => {
        toast.success('Reason updated successfully!')
        handleUpdateAttendance({newAttendance: res});
      });
    return;
  };

  return (
    <article className="grid gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <label>
          {selectedAttendance?.status === 1 ? (
            <span>
              Why is the {selectedAttendance.student?.first_name}{" "}
              <span className="underline decoration-orange-500 decoration-2 underline-offset-2">
                Late
              </span>
              ?
            </span>
          ) : (
            <span>
              Why is the {selectedAttendance.student?.first_name}{" "}
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
          defaultValue={selectedAttendance.reason}
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
