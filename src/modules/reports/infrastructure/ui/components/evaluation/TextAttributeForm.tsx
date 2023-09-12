import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

type Inputs = {
  comment: string;
};

const TextAttributeForm = ({
  student,
  evaluation,
  attribute,
}: {
  student: Student;
  evaluation: StudentEvaluation;
  attribute: EvaluationAttribute;
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
	console.log(data)
    await studentEvaluationAdapter
      .patch({
        evaluation_id: Number(evaluation.id),
      })
    //   .then((res) => {
    //     toast.success("Reason updated successfully!");
    //     // handleUpdateAttendance({ newAttendance: res });
    //     // setTimeout(() => {
    //     //   handleClose();
    //     // }, 250);
    //   });
    return;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-span-2 grid gap-2">
      <label>Teacher&apos;s Comment</label>
      <TextareaAutosize
        rows={2}
        defaultValue={evaluation?.evaluation_value}
        className="col-span-3 w-full rounded border p-2"
        {...register("comment")}
      />
      <div>
        <button className="w-1/4 rounded bg-blue-600 p-2  text-white shadow duration-200 ease-in-out hover:bg-blue-900">
          Save
        </button>
      </div>
    </form>
  );
};

export default TextAttributeForm;
