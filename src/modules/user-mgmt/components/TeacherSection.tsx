import { useUserContext } from "@/src/contexts/UserContext";
import { useEffect, useState } from "react";

import Modal from "@/src/modules/core/components/Modal";
import StaffList from "@/src/modules/user-mgmt/components/StaffList";
import { Teacher } from "@/src/modules/user-mgmt/entities/Teacher";
import { userAdapter } from "../adapters/userAdapter";
import TeacherSignup from "./TeacherSignup";

export default function TeacherSection() {
  const { user, selectedSchool } = useUserContext();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isAddTeacher, setIsAddTeacher] = useState<boolean>(false);

  useEffect(() => {
    async function getData(school_id: number) {
      await userAdapter
        .listSchoolTeachers({ schoolId: school_id })
        .then((res) => {
          setTeachers(res);
        });
    }
    if (user && selectedSchool) {
      getData(selectedSchool.id);
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
