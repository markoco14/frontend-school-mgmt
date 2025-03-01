import { Level } from "@/src/modules/curriculum/levels/entities/Level";
import { NewLevel } from "@/src/modules/curriculum/levels/entities/NewLevel";
import addLevel from "@/src/modules/curriculum/levels/requests/addLevel";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  order: number;
};

export default function AddLevelForm({ setLevels }: { setLevels: Function }) {
  const [loading, setLoading] = useState<boolean>(false)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newLevel = new NewLevel(
      data.name,
      data.order,
      13
    )
    try {
      setLoading(true);
      const level = await addLevel(newLevel);
      setLevels((prevLevels: Level[]) => [...prevLevels, level])
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Unable to add level.")
      }
    } finally {
      setLoading(false)
      reset();
    }
    return
  };

  return (
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
      <button className="rounded bg-blue-300 px-2 py-1 text-blue-900">{loading ? "Saving" : "Save"}</button>
    </form>
  );
}
