import toast from "react-hot-toast";

import { classAdapter } from "@/src/modules/classes/adapters/classAdapter";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";

export default function DeleteClass({
  selectedClass,
  setSelectedClass,
}: {
  selectedClass: ClassEntity;
  setSelectedClass: Function;
}) {
  async function handleDeleteClass() {
    setSelectedClass(undefined);
    toast.success("Class deleted!");
  }
  return (
    <section>
      <h2 className="mb-4 text-xl">Manage Class Details</h2>
      <article className="rounded bg-gray-100 p-2 shadow-inner">
        <p className="mb-4">Delete class here. Warning you cannot undo this.</p>

        <button
          className="rounded text-red-500 underline underline-offset-2 hover:text-red-900"
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
