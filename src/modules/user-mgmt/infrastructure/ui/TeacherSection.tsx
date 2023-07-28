import { Fragment, useContext, useEffect, useState } from "react";
import { userAdapter } from "../adapters/userAdapter";
import AuthContext from "@/src/AuthContext";
import TeacherList from "./TeacherList";
import TeacherSignup from "./TeacherSignup";
import { Teacher } from "../../domain/entities/Teacher";
import { Dialog, Transition } from "@headlessui/react";

export default function TeacherSection() {
  const { user, selectedSchool } = useContext(AuthContext);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isAddTeacher, setIsAddTeacher] = useState<boolean>(false);

  useEffect(() => {
    async function getData(school_id: number, user_id: number) {
      await userAdapter
        .getTeachersBySchool({ school: school_id, owner: user_id })
        .then((res) => {
          console.log(res);
          setTeachers(res);
        });
    }
    if (user && selectedSchool) {
      getData(selectedSchool.id, user.user_id);
    }
  }, [selectedSchool, user]);

  return (
    <section>
      <h2>Teachers</h2>
      <TeacherList teachers={teachers} />
      <button
        className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded"
        onClick={() => setIsAddTeacher(true)}
      >
        Add Teacher
      </button>
      <Transition
        show={isAddTeacher}
        enter="transition ease-in duration-100"
        enterFrom="transform opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition ease-out duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Dialog
          onClose={() => setIsAddTeacher(false)}
          className="fixed inset-0 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-blue-900/25" />
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
            <Dialog.Title>Add Teacher</Dialog.Title>
            <TeacherSignup
              teachers={teachers}
              setTeachers={setTeachers}
              setIsAddTeacher={setIsAddTeacher}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAddTeacher(false)}
                className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </section>
  );
}
