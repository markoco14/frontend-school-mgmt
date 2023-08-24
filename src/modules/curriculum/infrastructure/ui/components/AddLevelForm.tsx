import AuthContext from "@/src/AuthContext";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  order: number;
};

export default function AddLevelForm({
  handleAddLevel,
}: {
  handleAddLevel: Function;
}) {
  const { selectedSchool } = useContext(AuthContext);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await handleAddLevel({name: data.name, school: selectedSchool?.id, order: data.order})
		.then(reset());
  };

  return (
    <div className="xs:col-span-1">
      <h2 className="text-2xl">Add new level</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <label>Name</label>
          <input
            className="shadow p-2"
            type="text"
            {...register("name", {
              required: true,
              minLength: 1,
              maxLength: 50,
            })}
          />
          {errors.name?.type === "required" && (
            <p role="alert" className="text-red-500 mt-2">
              Level name is required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label>Order</label>
          <input
            className="shadow p-2"
            type="number"
            {...register("order", { required: true, min: 1 })}
          />
          {errors.order?.type === "required" && (
            <p role="alert" className="text-red-500 mt-2">
              Order is required
            </p>
          )}
        </div>
        <button className="bg-blue-300 px-2 py-1 rounded text-blue-900">
          Submit
        </button>
      </form>
    </div>
  );
}
