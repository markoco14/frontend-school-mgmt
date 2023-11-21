import { Student } from "@/src/modules/students/entities/Student";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { studentAttendanceAdapter } from "../../adapters/studentAttendanceAdapter";

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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function setReason({ suggestion }: { suggestion: string }) {
    setValue("reason", suggestion);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await studentAttendanceAdapter
      .patch({
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
    <article className="grid grid-cols-3 gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="col-span-2 grid gap-2">
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
        <div>
          <button className="w-1/4 rounded bg-blue-600 p-2  text-white shadow duration-200 ease-in-out hover:bg-blue-900">
            Save
          </button>
        </div>
      </form>
      <div className="grid divide-y border p-4 rounded-lg">
        <p className="text-xl mb-4">Quick reasons</p>
        <button
          className="py-1 text-left"
          onClick={() => setReason({ suggestion: "Doctor appointment." })}
        >
          Doctor appointment.
        </button>
        <button
          className="py-1 text-left"
          onClick={() => setReason({ suggestion: "School photos." })}
        >
          School photos.
        </button>
        <button
          className="py-1 text-left"
          onClick={() => setReason({ suggestion: "Too much rain." })}
        >
          Too much rain.
        </button>
        <button
          className="py-1 text-left"
          onClick={() => setReason({ suggestion: "School detention." })}
        >
          School detention.
        </button>
      </div>
    </article>
  );
}
