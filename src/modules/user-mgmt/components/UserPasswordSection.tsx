import Modal from "@/src/modules/core/components/Modal";
import { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

const UserPasswordSection = () => {
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);

  return (
    <>
      <section className="max-w-[600px] border p-4 shadow">
        <h1>Secure info</h1>
        <button onClick={() => setIsEditPassword(true)}>Edit password</button>
      </section>
      <Modal
        show={isEditPassword}
        close={setIsEditPassword}
        title={"Change Password"}
      >
        <ChangePasswordForm />
      </Modal>
    </>
  );
};

export default UserPasswordSection;
