import AdminLayout from "@/src/modules/core/components/AdminLayout";
import UserPasswordSection from "@/src/modules/user-mgmt/components/UserPasswordSection";
import UserProfileSection from "@/src/modules/user-mgmt/components/UserProfileSection";
import { UserProfile } from "@/src/modules/user-mgmt/entities/UserProfile";
import { userAdapter } from "@/src/modules/user-mgmt/adapters/userAdapter";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import Layout from "@/src/modules/core/components/Layout";

export default function UserProfilePage() {
  const { user } = useUserContext();
  const [userProfile, setUserProfile] = useState<UserProfile>();

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
        <div className="flex h-full w-full flex-col gap-16 bg-white">
          {userProfile && (
            <UserProfileSection
              user={userProfile}
              setUserProfile={setUserProfile}
            />
          )}
          {userProfile && <UserPasswordSection />}
        </div>
      </AdminLayout>
    </Layout>
  );
}
