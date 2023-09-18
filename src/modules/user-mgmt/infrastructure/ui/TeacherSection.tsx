import { useUserContext } from "@/src/UserContext";
import { useEffect, useState } from "react";

import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { Teacher } from "../../domain/entities/Teacher";
import { userAdapter } from "../adapters/userAdapter";
import StaffList from "./StaffList";
import TeacherSignup from "./TeacherSignup";

export default function TeacherSection() {
  const { user, selectedSchool } = useUserContext();
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

  function handleClose() {
    setIsAddTeacher(false);
  }

  return (
    <section className="grid gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-3xl">Teachers</h2>
        <button
          className="text-gray-700 underline decoration-2 underline-offset-2 hover:text-blue-700"
          onClick={() => setIsAddTeacher(true)}
        >
          Add Teacher
        </button>
      </div>
      <StaffList staffList={teachers} />
      <Modal show={isAddTeacher} close={handleClose} title="Add New Teacher">
        <TeacherSignup teachers={teachers} setTeachers={setTeachers} />
      </Modal>
    </section>
  );
}
