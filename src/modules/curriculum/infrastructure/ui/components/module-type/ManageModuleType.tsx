import { SubmitHandler, useForm } from "react-hook-form";
import { ModuleType } from "../../../../domain/entities/ModuleType";
import { moduleTypeAdapter } from "../../../adapters/moduleTypeAdapter";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
};

export default function ManageModuleType({
  moduleTypes,
  setModuleTypes,
  selectedType,
	setSelectedType,
  handleDelete,
}: {
	moduleTypes: ModuleType[];
  setModuleTypes: Function;
  selectedType: ModuleType;
	setSelectedType: Function;
  handleDelete: Function;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
		if (selectedType.name === data.name) {
			toast('You need to change the name to update module type')
			return
		}
    await moduleTypeAdapter
      .patch({ typeId: selectedType?.id, typeName: data.name })
      .then((res) => {
        console.log(res);
        // Find the index of the object to replace
        const index = moduleTypes.findIndex(
          (item) => item.id === selectedType?.id
        );

        // Create a copy of the original array
        const updatedModuleTypes = [...moduleTypes];

        // Replace the object at the found index with the new object
        updatedModuleTypes[index] = res;

        // Update the state
        setModuleTypes(updatedModuleTypes);
				setSelectedType(res)
				toast.success('New name saved successfuly!')
      });
    return;
  };

  return (
    <article className="flex flex-col gap-4 divide-y">
      <section>
        <h3 className="text-lg mb-4 text-gray-700">Edit Module Type</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="flex justify-between">
              <span>Name</span>{" "}
              {errors.name && <span className="text-red-500">required</span>}
            </label>
            <input
              className="border shadow-inner rounded p-2"
              defaultValue={selectedType?.name}
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
      </section>
      <section className="pt-4">
        <h3 className="text-lg mb-4 text-gray-700">Delete Module Type</h3>
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
