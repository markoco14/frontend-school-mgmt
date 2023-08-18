import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../../AuthContext";
import Layout from "../../../modules/core/infrastructure/ui/components/Layout";
import { UserProfile } from "@/src/modules/user-mgmt/domain/entities/UserProfile";
import { userAdapter } from "@/src/modules/user-mgmt/infrastructure/adapters/userAdapter";
import { Dialog, Transition } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ChangePasswordModal from "@/src/modules/user-mgmt/infrastructure/ui/ChangePasswordModal";

type Inputs = {
  first_name: string;
  last_name: string;
};

export default function UserProfilePage() {
	const [userProfile, setUserProfile] = useState<UserProfile>()
	const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
	const [isEditPassword, setIsEditPassword] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

	const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data)
		if (!user) {
			return
		}

    try {
      const profile: UserProfile = await userAdapter.updateUser({
        id: user.user_id,
        first_name: data.first_name,
        last_name: data.last_name,
      });
      toast.success("User Profile Updated");
			setUserProfile(profile)
      reset();
    } catch (error) {
      console.error(error);
    }
  };
	
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
			<Transition
				appear={true}
				show={isEditProfile}
			>
				<Dialog
					onClose={() => setIsEditProfile(false)}
					className="fixed top-0 left-0 w-screen sm:inset-0 sm:top-8 sm:w-full flex items-center justify-center"
				>	
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-blue-900 bg-opacity-50" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity transition-scale ease-in duration-500"
						enterFrom="opacity-0 scale-90"
						enterTo="opacity-100 scale-100"
						leave="transition-opacity transition-scale ease-out duration-150"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0"
					>
						<Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
							<Dialog.Title>Edit User Profile</Dialog.Title>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col mb-4">
									<label className="mb-2">First Name</label>
									<input
										defaultValue={userProfile?.first_name}
										className="px-1 py-2 rounded shadow"
										type="text"
										{...register("first_name", {
											required: true,
											minLength: 2,
											maxLength: 50,
										})}
									/>
									{errors.first_name?.types?.minLength && (
										<p role="alert" className="text-red-500 mt-2">
											First name needs to be longer.
										</p>
									)}
									{errors.first_name?.types?.maxLength && (
										<p role="alert" className="text-red-500 mt-2">
											First name needs to be shorter.
										</p>
									)}
								</div>
								<div className="flex flex-col mb-4">
									<label className="mb-2">Last Name</label>
									<input
										defaultValue={userProfile?.last_name}
										className="px-1 py-2 rounded shadow"
										type="text"
										{...register("last_name", {
											required: true,
											maxLength: 50,
										})}
									/>
									{errors.last_name?.types?.required && (
										<p role="alert" className="text-red-500 mt-2">
											Last name needs to be longer.
										</p>
									)}
									{errors.last_name?.types?.maxLength && (
										<p role="alert" className="text-red-500 mt-2">
											Last name needs to be shorter.
										</p>
									)}
								</div>
								
								<button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
									Save
								</button>
							</form>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => setIsEditProfile(false)}
									className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
								>
									Cancel
								</button>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</Dialog>
			</Transition>
			<ChangePasswordModal isEditPassword={isEditPassword} setIsEditPassword={setIsEditPassword} />
    </Layout>
  );
}
