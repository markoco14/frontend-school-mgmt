import { useUserContext } from "@/src/UserContext";
import { AssessmentType } from "@/src/modules/curriculum/domain/entities/AssessmentType";
import { Module } from "@/src/modules/curriculum/domain/entities/Module";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { assessmentAdapter } from "../../../adapters/assessmentAdapter";
import { assessmentTypeAdapter } from "../../../adapters/assessmentTypeAdapter";

type Inputs = {
  name: string;
  description: string;
  module: number;
  type: number;
  order: number;
  max_score: number;
  status: number;
};

export default function NewAssessmentForm({
  selectedModule,
}: {
  selectedModule: Module;
}) {
  const { selectedSchool } = useUserContext();

  const statusValues = [
    {
      value: 0,
      string: "Active",
    },
    {
      value: 1,
      string: "Inactive",
    },
    {
      value: 2,
      string: "Draft",
    },
  ];

  const [types, setTypes] = useState<AssessmentType[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    selectedSchool &&
      (await assessmentAdapter
        .add({
          name: data.name,
          description: data.description,
          module: selectedModule.id,
          type: data.type,
          order: data.order,
          max_score: data.max_score,
          status: data.status,
        })
        .then((res) => {
          toast.success("Assessment saved successfully!");
          // make copy of modules
          // const tempModules = [...modules]
          // append response to the corresponding assessment array
          // setModules to that
          // setModules((prevTypes: Module[]) => [...prevTypes, res]);
        }));
    reset();
    return;
  };

  useEffect(() => {
    async function getTypes() {
      selectedSchool &&
        (await assessmentTypeAdapter
          .list({ schoolId: selectedSchool.id })
          .then((res) => {
            setTypes(res);
          }));
    }

    getTypes();
  }, [selectedSchool]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="flex justify-between">
          <span>Name</span>{" "}
          {errors.name && <span className="text-red-500">required</span>}
        </label>
        <input
          type="text"
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
          <span>Description</span>{" "}
          {errors.description && <span className="text-red-500">required</span>}
        </label>
        <textarea
          className="rounded border p-2 shadow-inner"
          {...register("description", {
            required: true,
            minLength: 2,
            maxLength: 255,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex justify-between">
          <span>Type</span>{" "}
          {errors.status && <span className="text-red-500">required</span>}
        </label>
        {types?.map((type, valueIndex) => (
          <div key={`type-${valueIndex}`} className="flex gap-2">
            <label className="relative flex w-full cursor-pointer peer-checked:bg-blue-500">
              <input
                type="radio"
                value={type.id}
                className="peer sr-only"
                {...register("type", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
              <span className="w-full rounded border bg-gray-100 p-2 shadow-inner duration-200 ease-in-out hover:bg-gray-300 peer-checked:bg-gray-500 peer-checked:text-white">
                {type.name}
              </span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex justify-between">
          <span>Order</span>{" "}
          {errors.order && <span className="text-red-500">required</span>}
        </label>
        <input
          type="number"
          className="rounded border p-2 shadow-inner"
          {...register("order", {
            required: true,
            min: 1,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex justify-between">
          <span>Max Score</span>{" "}
          {errors.max_score && <span className="text-red-500">required</span>}
        </label>
        <input
          type="number"
          className="rounded border p-2 shadow-inner"
          {...register("max_score", {
            required: true,
            min: 1,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex justify-between">
          <span>Status</span>{" "}
          {errors.status && <span className="text-red-500">required</span>}
        </label>
        {statusValues.map((value, valueIndex) => (
          <div key={`value-${valueIndex}`} className="flex gap-2">
            <label className="relative flex w-full cursor-pointer peer-checked:bg-blue-500">
              <input
                type="radio"
                value={value.value}
                className="peer sr-only"
                {...register("status", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
              <span className="w-full rounded border bg-gray-100 p-2 shadow-inner duration-200 ease-in-out hover:bg-gray-300 peer-checked:bg-gray-500 peer-checked:text-white">
                {value.string}
              </span>
            </label>
          </div>
        ))}
      </div>
      <button className="w-full rounded bg-blue-600 p-2  text-white shadow duration-200 ease-in-out hover:bg-blue-900">
        Submit
      </button>
    </form>
  );
}
