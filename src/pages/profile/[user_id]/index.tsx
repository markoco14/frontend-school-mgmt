import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../AuthContext";
import Layout from "../../../modules/core/infrastructure/ui/components/Layout";
import { UserProfile } from "@/src/modules/user-mgmt/domain/entities/UserProfile";
import { userAdapter } from "@/src/modules/user-mgmt/infrastructure/adapters/userAdapter";
import ChangePasswordModal from "@/src/modules/user-mgmt/infrastructure/ui/ChangePasswordModal";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import UserProfileForm from "@/src/modules/user-mgmt/infrastructure/ui/UserProfileForm";

export default function UserProfilePage() {
	const [userProfile, setUserProfile] = useState<UserProfile>()
	const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
	const [isEditPassword, setIsEditPassword] = useState<boolean>(false);
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
			<section className="mb-4">
				<div className="flex justify-between">
					<h1>User Profile</h1>
					<button
					onClick={() => setIsEditProfile(true)}
					>Edit</button>
				</div>
				<p>{userProfile?.first_name}</p>
				<p>{userProfile?.last_name}</p>
				<p>{userProfile?.email}</p>
			</section>
			<section>
				<h1>Secure info</h1>
				<button onClick={() => setIsEditPassword(true)}>Edit password</button>
			</section>
			<Modal show={isEditProfile} close={setIsEditProfile} title={"Edit User Profile"}>
				<UserProfileForm userProfile={userProfile} setUserProfile={setUserProfile}/>
			</Modal>
			
			<ChangePasswordModal isEditPassword={isEditPassword} setIsEditPassword={setIsEditPassword} />
    </Layout>
  );
}
