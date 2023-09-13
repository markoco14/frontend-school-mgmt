import { useContext, useEffect, useState } from "react";
import AuthContext from "@/src/AuthContext";
import TeacherList from "./TeacherList";
import TeacherSignup from "./TeacherSignup";
import { Teacher } from "../../domain/entities/Teacher";
import { Dialog, Transition } from "@headlessui/react";
import { schoolTeacherAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolTeacherAdapter";
import { userAdapter } from "../adapters/userAdapter";
import StaffList from "./StaffList";

export default function AdminSection() {
  const { user, selectedSchool } = useContext(AuthContext);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isAddTeacher, setIsAddTeacher] = useState<boolean>(false);

  useEffect(() => {
    async function getData(school_id: number, user_id: number) {
      await userAdapter.listSchoolTeachers({ id: school_id }).then((res) => {
        setTeachers(res);
      });
    }
    if (user && selectedSchool) {
      getData(selectedSchool.id, user.user_id);
    }
  }, [selectedSchool, user]);

  return (
    <section>
      <h2 className="mb-2 text-3xl">Administrators</h2>
      <StaffList teachers={teachers} />
      <button
        className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white"
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
          <Dialog.Panel className="z-10 rounded-2xl bg-white p-8 shadow-xl">
            <Dialog.Title>Add Teacher</Dialog.Title>
            <TeacherSignup teachers={teachers} setTeachers={setTeachers} />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAddTeacher(false)}
                className="rounded bg-gray-300 px-4 py-1 text-gray-900 hover:bg-gray-500 hover:text-white"
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
