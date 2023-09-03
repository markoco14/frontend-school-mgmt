import toast from "react-hot-toast";
import { Class } from "../../../domain/entities/Class";
import { classAdapter } from "../../adapters/classAdapter";

export default function DeleteClass({
  selectedClass,
  setSelectedClass,
}: {
  selectedClass: Class;
  setSelectedClass: Function;
}) {

	async function handleDeleteClass() {
    setSelectedClass(undefined);
    toast.success("Class deleted!");
  }
	return (
    <section>
      <h2 className="text-xl mb-4">Manage Class Details</h2>
      <article className="bg-gray-100 shadow-inner p-2 rounded">
        <p className="mb-4">
          Delete class here. Warning you cannot undo this.
        </p>
        
          <button
            className="rounded underline underline-offset-2 text-red-500 hover:text-red-900"
            onClick={async () =>
              await classAdapter
                .deleteClass({ class_id: selectedClass.id })
                .then(handleDeleteClass)
            }
          >
            Delete Class
          </button>
        
      </article>
    </section>
  );
}




