import { useUserContext } from "@/src/UserContext";
import Modal from "@/src/modules/core/components/Modal";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ModuleType } from "../../../../domain/entities/ModuleType";
import { moduleTypeAdapter } from "../../../adapters/moduleTypeAdapter";
import ManageModuleType from "./ManageModuleType";

type Inputs = {
  name: string;
};

export default function ModuleTypeSection() {
  const { selectedSchool } = useUserContext();
  const [isManageType, setIsManageType] = useState<boolean>(false);

  const [moduleTypes, setModuleTypes] = useState<ModuleType[]>([]);
  const [selectedType, setSelectedType] = useState<ModuleType | null>(null);

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

    selectedSchool && getData();
  }, [selectedSchool]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    selectedSchool &&
      (await moduleTypeAdapter
        .add({ schoolId: selectedSchool?.id, typeName: data.name })
        .then((res) => {
          toast.success("Module Type saved successfully!");
          setModuleTypes((prevTypes: ModuleType[]) => [...prevTypes, res]);
        }));
    reset();
    return;
  };

  function handleClose() {
    setSelectedType(null);
    setIsManageType(false);
  }

  return (
    <section>
      <h2 className="mb-4 text-3xl">Module Types</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="mb-4 flex flex-col gap-6 rounded border p-4 text-gray-700 shadow">
          <h3 className="text-xl">Your Module Types</h3>
          {moduleTypes.length === 0 ? (
            <p>There are no module types.</p>
          ) : (
            <ul>
              {moduleTypes?.map((type, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedType(type);
                    setIsManageType(true);
                  }}
                >
                  {type.name}
                </li>
              ))}
            </ul>
          )}
        </article>
        <article className="mb-4 flex flex-col gap-6 rounded border p-4 text-gray-700 shadow">
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
                className="rounded border p-2 shadow-inner"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                })}
              />
            </div>
            <button className="w-full rounded bg-blue-600 p-2  text-white shadow duration-200 ease-in-out hover:bg-blue-900">
              Submit
            </button>
          </form>
        </article>
      </div>
      <Modal
        show={isManageType}
        close={handleClose}
        title={`Manage Module Type`}
      >
        <ManageModuleType
          moduleTypes={moduleTypes}
          setModuleTypes={setModuleTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </Modal>
    </section>
  );
}
