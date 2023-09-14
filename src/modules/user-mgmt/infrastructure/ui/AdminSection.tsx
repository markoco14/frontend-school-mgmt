import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Teacher } from "../../domain/entities/Teacher";
import { userAdapter } from "../adapters/userAdapter";
import StaffList from "./StaffList";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import AdminSignup from "./AdminSignup";

export default function AdminSection() {
  const { user, selectedSchool } = useContext(AuthContext);
  const [admins, setAdmins] = useState<Teacher[]>([]);
  const [isAddAdmin, setIsAddAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function getData(school_id: number, user_id: number) {
      await userAdapter
        .listSchoolAdmins({ school_id: school_id })
        .then((res) => {
          setAdmins(res);
        });
    }
    if (user && selectedSchool) {
      getData(selectedSchool.id, user.user_id);
    }
  }, [selectedSchool, user]);

  function handleClose() {
	setIsAddAdmin(false)
  }

  return (
    <section className="grid gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-3xl">Admins</h2>
        <button
          className="text-gray-700 underline decoration-2 underline-offset-2 hover:text-blue-700"
          onClick={() => setIsAddAdmin(true)}
        >
          Add Admin
        </button>
      </div>
      <StaffList staffList={admins} />
      <Modal show={isAddAdmin} close={handleClose} title="Add New Admin">
        <AdminSignup admins={admins} setAdmins={setAdmins} />
      </Modal>
    </section>
  );
}
