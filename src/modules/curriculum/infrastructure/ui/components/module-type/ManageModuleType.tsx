import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ModuleType } from "@/src/modules/curriculum/entities/ModuleType";
import { moduleTypeAdapter } from "../../../adapters/moduleTypeAdapter";

type Inputs = {
  name: string;
};

export default function ManageModuleType({
  moduleTypes,
  setModuleTypes,
  selectedType,
  setSelectedType,
}: {
  moduleTypes: ModuleType[];
  setModuleTypes: Function;
  selectedType: ModuleType | null;
  setSelectedType: Function;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (selectedType?.name === data.name) {
      toast("You need to change the name to update module type");
      return;
    }
    selectedType &&
      (await moduleTypeAdapter
        .patch({ typeId: selectedType?.id, typeName: data.name })
        .then((res) => {
          // Find the index of the object to replace
          const index = moduleTypes.findIndex(
            (item) => item.id === selectedType?.id,
          );

          // Create a copy of the original array
          const updatedModuleTypes = [...moduleTypes];

          // Replace the object at the found index with the new object
          updatedModuleTypes[index] = res;

          // Update the state
          setModuleTypes(updatedModuleTypes);
          setSelectedType(res);
          toast.success("New name saved successfuly!");
        }));
  };

  const handleDelete = async () => {
    selectedType &&
      (await moduleTypeAdapter.delete({ typeId: selectedType.id }).then(() => {
        setModuleTypes((prevTypes: ModuleType[]) =>
          prevTypes.filter((type) => type.id !== selectedType.id),
        );
        setSelectedType(null);
        toast.success("Module Type deleted successfully!");
      }));
  };

  return !selectedType ? (
    <section>
      <p>This module type has been deleted.</p>
    </section>
  ) : (
    <article className="flex flex-col gap-4 divide-y">
      <section>
        <h3 className="mb-4 text-lg text-gray-700">{selectedType?.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="flex justify-between">
              <span>Name</span>{" "}
              {errors.name && <span className="text-red-500">required</span>}
            </label>
            <input
              className="rounded border p-2 shadow-inner"
              defaultValue={selectedType?.name}
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
      </section>
      <section className="pt-4">
        <h3 className="mb-4 text-lg text-gray-700">Delete Module Type</h3>
        <p className="mb-2">
          Warning, this will delete all data related to {selectedType?.name}
        </p>
        <button onClick={() => handleDelete()} className="text-gray-500">
          Delete
        </button>
      </section>
    </article>
  );
}
