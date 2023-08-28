import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Module } from "../../../../domain/entities/Module";
import { ModuleType } from "../../../../domain/entities/ModuleType";
import { SubjectLevel } from "../../../../domain/entities/SubjectLevel";
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
	const { selectedSchool } = useContext(AuthContext);
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
        <label className="flex justify-between"><span>Name</span> {errors.name && <span className="text-red-500">required</span>}</label>
        <input
          className="border shadow-inner rounded p-2"
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex justify-between"><span>Order</span> {errors.order && <span className="text-red-500">required</span>}</label>
        <input
          className="border shadow-inner rounded p-2"
          type="number"
          {...register("order", {
            required: true,
            min: 1,
          })}
        />
        
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="flex justify-between"><span>Type</span> {errors.type && <span className="text-red-500">required</span>}</p>
          {moduleTypes?.map((type, index) => (
            <div key={index} className="flex flex-col gap-2">
            <label key={index} className="relative cursor-pointer w-full flex">
              <input
                className="sr-only peer"
                id={`checkbox-${type.id}`} 
                type="checkbox"
                value={type.id}
                {...register("type", {
                  required: true,
                })}
              />
              <span className="w-full hover:bg-gray-300 ease-in-out duration-200 bg-gray-100 peer-checked:bg-gray-500 peer-checked:text-white p-2 border shadow-inner rounded">{type.name}</span>
            </label>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full ease-in-out duration-200 bg-blue-600  hover:bg-blue-900 p-2 rounded shadow text-white">Submit</button>
    </form>
  );
};
