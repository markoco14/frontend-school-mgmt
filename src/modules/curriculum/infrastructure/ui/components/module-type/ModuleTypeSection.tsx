import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModuleType } from "../../../../domain/entities/ModuleType";
import { moduleTypeAdapter } from "../../../adapters/moduleTypeAdapter";

type Inputs = {
  name: string;
  school: number;
};

export default function ModuleTypeSection() {
  const { selectedSchool } = useContext(AuthContext);
  const [moduleTypes, setModuleTypes] = useState<ModuleType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    async function getData() {
      await moduleTypeAdapter
        .listSchoolModuleTypes({ schoolId: selectedSchool?.id })
        .then((res) => {
          setModuleTypes(res);
        });
    }

		selectedSchool && getData()
  }, [selectedSchool]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    console.log(selectedSchool?.id);
    return;
    // send data
    // get response
    // change state
    // reset
  };

  return (
    <section>
      <h2 className="text-3xl mb-4">Module Types</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <article className="border rounded shadow mb-4 p-4 flex flex-col gap-6 text-gray-700">
          <h3 className="text-xl">Your Module Types</h3>
          {moduleTypes.length === 0 ? (
            <p>There are no module types.</p>
          ) : (
            <ul>
              {moduleTypes?.map((type, index) => (
                <li key={index}>{type.name}</li>
              ))}
            </ul>
          )}
        </article>
        <article className="border rounded shadow mb-4 p-4 flex flex-col gap-6 text-gray-700">
          <h3 className="text-xl">New Module Type</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label className="flex justify-between">
                <span>Name</span>{" "}
                {errors.name && <span className="text-red-500">required</span>}
              </label>
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
              <label className="flex justify-between">
                <span>Order</span>{" "}
                {errors.school && (
                  <span className="text-red-500">required</span>
                )}
              </label>
              <input
                className="border shadow-inner rounded p-2"
                type="number"
                {...register("school", {
                  required: true,
                  min: 1,
                })}
              />
            </div>
            <button className="w-full ease-in-out duration-200 bg-blue-600  hover:bg-blue-900 p-2 rounded shadow text-white">
              Submit
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
