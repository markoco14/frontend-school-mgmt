import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModuleType } from "../../../../domain/entities/ModuleType";
import { moduleTypeAdapter } from "../../../adapters/moduleTypeAdapter";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import toast from "react-hot-toast";
import ManageModuleType from "./ManageModuleType";

type Inputs = {
  name: string;
};

export default function ModuleTypeSection() {
  const { selectedSchool } = useContext(AuthContext);
  const [moduleTypes, setModuleTypes] = useState<ModuleType[]>([]);
  const [isManageType, setIsManageType] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<ModuleType>();
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
          console.log(res);
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
    setIsManageType(false);
  }

  const handleDelete = async () => {
    selectedType &&
      (await moduleTypeAdapter.delete({ typeId: selectedType.id }).then(() => {
        setModuleTypes((prevTypes: ModuleType[]) =>
          prevTypes.filter((type) => type.id !== selectedType.id)
        );
        toast.success("Module Type deleted successfully!");
      }));
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
            <button className="w-full ease-in-out duration-200 bg-blue-600  hover:bg-blue-900 p-2 rounded shadow text-white">
              Submit
            </button>
          </form>
        </article>
      </div>
      <Modal
        show={isManageType}
        close={handleClose}
        title={`Manage ${selectedType?.name}`}
      >
        {selectedType && (
          <ManageModuleType
            moduleTypes={moduleTypes}
            setModuleTypes={setModuleTypes}
            selectedType={selectedType}
						setSelectedType={setSelectedType}
            handleDelete={handleDelete}
          />
        )}
      </Modal>
    </section>
  );
}
