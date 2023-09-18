import { useUserContext } from "@/src/UserContext";
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
  const { selectedSchool } = useUserContext();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await handleAddLevel({
      name: data.name,
      school: selectedSchool?.id,
      order: data.order,
    }).then(reset());
  };

  return (
    <div className="xs:col-span-1">
      <h2 className="text-2xl">Add new level</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col">
          <label>Name</label>
          <input
            className="p-2 shadow"
            type="text"
            {...register("name", {
              required: true,
              minLength: 1,
              maxLength: 50,
            })}
          />
          {errors.name?.type === "required" && (
            <p role="alert" className="mt-2 text-red-500">
              Level name is required
            </p>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label>Order</label>
          <input
            className="p-2 shadow"
            type="number"
            {...register("order", { required: true, min: 1 })}
          />
          {errors.order?.type === "required" && (
            <p role="alert" className="mt-2 text-red-500">
              Order is required
            </p>
          )}
        </div>
        <button className="rounded bg-blue-300 px-2 py-1 text-blue-900">
          Submit
        </button>
      </form>
    </div>
  );
}
