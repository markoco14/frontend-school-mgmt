import AuthContext from "@/src/AuthContext";
import { subjectAdapter } from "@/src/modules/curriculum/infrastructure/adapters/subjectAdapter";
import { Dialog, Transition } from "@headlessui/react";
import { useContext, useState, } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Subject } from "../../../domain/entities/Subject";

type Inputs = {
  subjectName: string;
}

export default function AddSubject({setSubjects}: { setSubjects: Function, }) {
	const { selectedSchool } = useContext(AuthContext);
  const [isAddSubject, setIsAddSubject] = useState<boolean>(false)

  const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await subjectAdapter.addSubject({name: data.subjectName, school: selectedSchool.id}).then((res) => {
				setSubjects((prevSubjects: Subject[]) => [...prevSubjects, res])
        toast.success('Subject added.');
      });
      reset();
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <button
        className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded"
        onClick={() => setIsAddSubject(true)}
      >
        Add Subject
      </button>
      <Transition
        show={isAddSubject}
        enter="transition ease-in duration-100"
        enterFrom="transform opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition ease-out duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Dialog
          onClose={() => setIsAddSubject(false)}
          className="fixed inset-0 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-blue-900/25" />
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
            <Dialog.Title>Add Subject</Dialog.Title>
            <form 
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col mb-4">
                <label>Name</label>
                <input 
                  className="shadow p-2"
                  type="text" 
                  {...register("subjectName", {required: true, minLength: 1, maxLength: 50})}
                />
                {errors.subjectName?.type === "required" && (
                  <p 
                    role="alert"
                    className='text-red-500 mt-2'
                  >
                    Level name is required
                  </p>
                )}
              </div>
              <button className="bg-blue-300 px-2 py-1 rounded text-blue-900">
                Submit
              </button>
            </form>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAddSubject(false)}
                className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
}
