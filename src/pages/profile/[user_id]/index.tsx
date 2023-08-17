import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../AuthContext";
import Layout from "../../../modules/core/infrastructure/ui/components/Layout";
import { UserProfile } from "@/src/modules/user-mgmt/domain/entities/UserProfile";
import { userAdapter } from "@/src/modules/user-mgmt/infrastructure/adapters/userAdapter";

export default function UserProfilePage() {
	const [userProfile, setUserProfile] = useState<UserProfile>()
  const { user } = useContext(AuthContext);
	
	useEffect(() => {
		async function getData() {
			if (user) {
				await userAdapter.getUserProfileById({id: user?.user_id})
				.then((res) => setUserProfile(res))
			}
		}

		getData();
	}, [user])

  return (
    <Layout>
			<div className="flex justify-between">
				<h1>Your User Profile</h1>
				<button
				onClick={() => console.log('editing')}
				>Edit</button>
			</div>
			<p>{userProfile?.first_name}</p>
			<p>{userProfile?.last_name}</p>
			<p>{userProfile?.email}</p>
    </Layout>
  );
}
