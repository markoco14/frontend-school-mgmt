import React from "react";
import { UserProfile } from "../domain/entities/UserProfile";

interface UserPasswordProps {
  user: UserProfile;
  setIsEditPassword: Function;
}

const UserPasswordSection: React.FC<UserPasswordProps> = ({
  user,
  setIsEditPassword,
}) => {
  return (
    <section className="max-w-[600px] border p-4 shadow">
      <h1>Secure info</h1>
      <button onClick={() => setIsEditPassword(true)}>Edit password</button>
    </section>
  );
};

export default UserPasswordSection;
