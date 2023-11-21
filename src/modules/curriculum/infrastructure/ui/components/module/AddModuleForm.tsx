import { useUserContext } from "@/src/UserContext";
import { Module } from "@/src/modules/curriculum/entities/Module";
import { SubjectLevel } from "@/src/modules/curriculum/entities/SubjectLevel";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModuleType } from "@/src/modules/curriculum/entities/ModuleType";
import { moduleAdapter } from "../../../adapters/moduleAdapter";
import { moduleTypeAdapter } from "../../../adapters/moduleTypeAdapter";

type Inputs = {
  name: string;
  type: number;
  order: number;
};

export default function AddModuleForm({
  setModules,
  currentSubjectLevel,
}: {
  setModules: Function;
  currentSubjectLevel: SubjectLevel;
}) {
  const { selectedSchool } = useUserContext();
  const [moduleTypes, setModuleTypes] = useState<ModuleType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    async function fetchSchoolModuleTypes({ schoolId }: { schoolId: number }) {
      await moduleTypeAdapter
        .listSchoolModuleTypes({ schoolId: schoolId })
        .then((res) => {
          setModuleTypes(res);
        });
    }

    selectedSchool && fetchSchoolModuleTypes({ schoolId: selectedSchool.id });
  }, [selectedSchool]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await moduleAdapter
      .add({
        name: data.name,
        type: Number(data.type),
        order: Number(data.order),
        subjectLevel: currentSubjectLevel.id,
      })
      .then((res) => {
        setModules((prevModules: Module[]) => [...prevModules, res]);
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="flex justify-between">
          <span>Name</span>{" "}
          {errors.name && <span className="text-red-500">required</span>}
        </label>
        <input
          className="rounded border p-2 shadow-inner"
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex justify-between">
          <span>Order</span>{" "}
          {errors.order && <span className="text-red-500">required</span>}
        </label>
        <input
          className="rounded border p-2 shadow-inner"
          type="number"
          {...register("order", {
            required: true,
            min: 1,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="flex justify-between">
            <span>Type</span>{" "}
            {errors.type && <span className="text-red-500">required</span>}
          </p>
          {moduleTypes?.map((type, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label
                key={index}
                className="relative flex w-full cursor-pointer"
              >
                <input
                  className="peer sr-only"
                  id={`checkbox-${type.id}`}
                  type="radio"
                  value={type.id}
                  {...register("type", {
                    required: true,
                  })}
                />
                <span className="w-full rounded border bg-gray-100 p-2 shadow-inner duration-200 ease-in-out hover:bg-gray-300 peer-checked:bg-gray-500 peer-checked:text-white">
                  {type.name}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full rounded bg-blue-600 p-2  text-white shadow duration-200 ease-in-out hover:bg-blue-900">
        Submit
      </button>
    </form>
  );
}
