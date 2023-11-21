import React from "react";
import { UserProfile } from "../domain/entities/UserProfile";


interface UserProfileProps {
  user: UserProfile;
  setIsEditProfile: Function;
}

const UserProfileSection: React.FC<UserProfileProps> = ({
  user,
  setIsEditProfile,
}) => {
  return (
    <section className="max-w-[600px] border p-4 shadow">
      <div className="flex justify-between">
        <h1>User Profile</h1>
        <button onClick={() => setIsEditProfile(true)}>Edit</button>
      </div>
      <p>{user?.first_name}</p>
      <p>{user?.last_name}</p>
      <p>{user?.email}</p>
    </section>
  );
};

export default UserProfileSection;
