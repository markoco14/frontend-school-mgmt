import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { Level } from "@/src/modules/class-mgmt/domain/entities/Level";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  className: string;
  level: number;
  daysOfWeek: string[];
};

export default function AddClass() {
  const { user, selectedSchool } = useContext(AuthContext);
  const [levels, setLevels] = useState<Level[]>([]);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const days: number[] = [];
    data.daysOfWeek.forEach((day) => days.push(Number(day)));

    try {
      const newClass: Class = await classAdapter.addClass({
        name: data.className,
        school_id: selectedSchool.id,
        level: Number(data.level),
        day: days,
      });
      toast.success("New class added.");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getLevels() {
      await classAdapter.getLevelsBySchoolId({id: selectedSchool?.id}).then((res) => {
        setLevels(res);
      });
    }

    if (user) {
      try {
        getLevels();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user, selectedSchool]);

  return (
    <Layout>
      <div>
        <section>
          <SchoolHeader />
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-3xl">Add Class</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-4">
              <label className="mb-2">Class Name</label>
              <input
                className="px-1 py-2 rounded shadow"
                type="text"
                {...register("className", {
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                })}
              />
              {errors.className?.type === "required" && (
                <p role="alert" className="text-red-500 mt-2">
                  Class name is required
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2">Level</label>
              <select
                className="py-2 rounded bg-white shadow"
                {...register("level", { required: true })}
              >
                <option value="">Choose a level</option>
                {levels?.map((level: Level, index: number) => (
                  <option key={index} value={level.id} className="p-4">
                    {level.name}
                  </option>
                ))}
              </select>
              {errors.level?.type === "required" && (
                <p role="alert" className="text-red-500 mt-2">
                  Level is required
                </p>
              )}
            </div>
            <div className="grid grid-cols-5 mb-4">
              <div className="flex flex-col">
                <label className="text-center">Monday</label>
                <input
                  type="checkbox"
                  {...register("daysOfWeek", { required: true })}
                  value={1}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-center">Tuesday</label>
                <input
                  type="checkbox"
                  {...register("daysOfWeek", { required: true })}
                  value={2}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-center">Wednesday</label>
                <input
                  type="checkbox"
                  {...register("daysOfWeek", { required: true })}
                  value={3}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-center">Thursday</label>
                <input
                  type="checkbox"
                  {...register("daysOfWeek", { required: true })}
                  value={4}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-center">Friday</label>
                <input
                  type="checkbox"
                  {...register("daysOfWeek", { required: true })}
                  value={5}
                />
              </div>
              {errors.daysOfWeek?.type === "required" && (
                <p role="alert" className="text-red-500 mt-2 col-span-5">
                  Days are required
                </p>
              )}
            </div>
            <button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
              Add
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}
