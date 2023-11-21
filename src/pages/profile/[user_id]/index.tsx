import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Modal from "@/src/modules/core/components/Modal";
import { UserProfile } from "@/src/modules/user-mgmt/domain/entities/UserProfile";
import { userAdapter } from "@/src/modules/user-mgmt/infrastructure/adapters/userAdapter";
import ChangePasswordForm from "@/src/modules/user-mgmt/infrastructure/ui/ChangePasswordForm";
import UserProfileForm from "@/src/modules/user-mgmt/infrastructure/ui/UserProfileForm";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import Layout from "../../../modules/core/components/Layout";
import UserProfileSection from "@/src/modules/user-mgmt/components/UserProfileSection";
import UserPasswordSection from "@/src/modules/user-mgmt/components/UserPasswordSection";

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
        <div className="h-full w-full bg-white flex flex-col gap-16">
          {userProfile && <UserProfileSection user={userProfile} setIsEditProfile={setIsEditProfile}/>}
          {userProfile && <UserPasswordSection user={userProfile} setIsEditPassword={setIsEditPassword}/>}
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
