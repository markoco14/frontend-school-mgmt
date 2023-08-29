import { useContext } from "react";
import { UserProfile } from "@/src/modules/user-mgmt/domain/entities/UserProfile";
import { userAdapter } from "@/src/modules/user-mgmt/infrastructure/adapters/userAdapter";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthContext from "@/src/AuthContext";

type Inputs = {
  first_name: string;
  last_name: string;
};

export default function UserProfileForm({userProfile, setUserProfile}: {userProfile: any, setUserProfile: Function}) {
  const { user } = useContext(AuthContext);

	const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
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

  return (
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
  );
}