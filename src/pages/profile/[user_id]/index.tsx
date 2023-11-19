import AdminLayout from "@/src/modules/core/infrastructure/ui/components/AdminLayout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { UserProfile } from "@/src/modules/user-mgmt/domain/entities/UserProfile";
import { userAdapter } from "@/src/modules/user-mgmt/infrastructure/adapters/userAdapter";
import ChangePasswordForm from "@/src/modules/user-mgmt/infrastructure/ui/ChangePasswordForm";
import UserProfileForm from "@/src/modules/user-mgmt/infrastructure/ui/UserProfileForm";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import Layout from "../../../modules/core/infrastructure/ui/components/Layout";

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);
  const { user } = useUserContext();

  useEffect(() => {
    async function getData() {
      if (user) {
        await userAdapter
          .getUserProfileById({ id: user?.user_id })
          .then((res) => setUserProfile(res));
      }
    }

    getData();
  }, [user]);
  return (
    <Layout>
      <AdminLayout>
        <div className="h-full w-full bg-white pt-16">
          <section className="mb-16 max-w-[600px] mx-auto">
            <div className="flex justify-between">
              <h1>User Profile</h1>
              <button onClick={() => setIsEditProfile(true)}>Edit</button>
            </div>
            <p>{userProfile?.first_name}</p>
            <p>{userProfile?.last_name}</p>
            <p>{userProfile?.email}</p>
          </section>
          <section className="mb-16 max-w-[600px] mx-auto">
            <h1>Secure info</h1>
            <button onClick={() => setIsEditPassword(true)}>
              Edit password
            </button>
          </section>
          <Modal
            show={isEditProfile}
            close={setIsEditProfile}
            title={"Edit User Profile"}
          >
            <UserProfileForm
              userProfile={userProfile}
              setUserProfile={setUserProfile}
            />
          </Modal>
          <Modal
            show={isEditPassword}
            close={setIsEditPassword}
            title={"Change Password"}
          >
            <ChangePasswordForm />
          </Modal>
        </div>
      </AdminLayout>
    </Layout>
  );
}
