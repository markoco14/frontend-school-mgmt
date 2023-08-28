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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label>Name</label>
        <input
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
        />
        {errors.name && <span>This field is required</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label>Order</label>
        <input
          {...register("order", {
            required: true,
            min: 1,
          })}
        />
        {errors.order && <span>This field is required</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label>Type</label>
        <div>
          {moduleTypes?.map((type, index) => (
            <label key={index}>
              <span>{type.name}</span>
              <input
                type="checkbox"
                value={type.id}
                {...register("type", {
                  required: true,
                })}
              />
            </label>
          ))}
        </div>
      </div>
      <button>Submit</button>
    </form>
  );
};
