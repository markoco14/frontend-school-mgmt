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
    <section>
      <h2 className="mb-2 text-3xl">Administrators</h2>
      <StaffList staffList={admins} />
      <button
        className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white"
        onClick={() => setIsAddAdmin(true)}
      >
        Add Admin
      </button>
      <Modal show={isAddAdmin} close={handleClose} title="Add New Admin">
        <AdminSignup admins={admins} setAdmins={setAdmins} />
      </Modal>
    </section>
  );
}
