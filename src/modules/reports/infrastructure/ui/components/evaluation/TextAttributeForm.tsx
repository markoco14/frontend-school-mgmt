import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

type Inputs = {
  evaluation_value: string;
};

const TextAttributeForm = ({
  evaluation,
}: {
  evaluation: StudentEvaluation;
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await studentEvaluationAdapter
      .patch({
        evaluation_id: Number(evaluation.id),
        evaluation_value: data.evaluation_value,
      })
      .then((res) => {
        toast.success("Comment updated successfully!");
        setLoading(false);
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
        {...register("evaluation_value")}
      />
      <div>
        <button className="w-1/2 rounded bg-blue-600 p-2 text-white shadow duration-200 ease-in-out hover:bg-blue-900">
          {!loading ? 'Save' : 'Saving'}
        </button>
      </div>
    </form>
  );
};

export default TextAttributeForm;
