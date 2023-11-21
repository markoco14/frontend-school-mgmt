import React, { useState } from "react";
import Modal from "@/src/modules/core/components/Modal";
import { UserProfile } from "../domain/entities/UserProfile";
import UserProfileForm from "../infrastructure/ui/UserProfileForm";

interface UserProfileProps {
  user: UserProfile;
  setUserProfile: Function;
}

const UserProfileSection: React.FC<UserProfileProps> = ({
  user,
  setUserProfile,
}) => {
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);

  return (
    <>
      <section className="max-w-[600px] border p-4 shadow">
        <div className="flex justify-between">
          <h1>User Profile</h1>
          <button onClick={() => setIsEditProfile(true)}>Edit</button>
        </div>
        <p>{user?.first_name}</p>
        <p>{user?.last_name}</p>
        <p>{user?.email}</p>
      </section>
      <Modal
        show={isEditProfile}
        close={setIsEditProfile}
        title={"Edit User Profile"}
      >
        <UserProfileForm userProfile={user} setUserProfile={setUserProfile} />
      </Modal>
    </>
  );
};

export default UserProfileSection;
