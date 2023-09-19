import { useUserContext } from "@/src/UserContext";
import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { TextAttributePayload } from "@/src/modules/evaluation/domain/entities/payloads/TextAttributePayload";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { textAttributeAdapter } from "../../../adapters/textAttributeAdapter";

type Inputs = {
  name: string;
};

const NewTextMetricForm = ({ setAttributes }: { setAttributes: Function }) => {
  const { selectedSchool } = useUserContext();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payload: TextAttributePayload = {
      name: data.name,
      school_id: selectedSchool?.id,
      data_type_id: 1,
    };
    try {
      await textAttributeAdapter.add({ payload: payload }).then((res) => {
        setAttributes((prevAttributes: EvaluationAttribute[]) => [
          ...prevAttributes,
          res,
        ]);
        toast.success("Saved!");
        reset();
      });
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 p-8">
      <div className="grid gap-2">
        <label>Name</label>
        <input
          {...register("name", {
            minLength: 1,
            maxLength: 50,
            required: true,
          })}
          className="rounded border p-2 shadow"
        ></input>
        {errors.name?.type === "required" && (
          <p role="alert" className="text-red-500">
            Metric name is required
          </p>
        )}
      </div>
      <hr></hr>
      <div className="grid grid-cols-2 gap-4">
        <button className="col-start-2 rounded bg-blue-700 px-2 py-1 text-white disabled:bg-gray-700 ">
          Save
        </button>
      </div>
    </form>
  );
};

export default NewTextMetricForm;
