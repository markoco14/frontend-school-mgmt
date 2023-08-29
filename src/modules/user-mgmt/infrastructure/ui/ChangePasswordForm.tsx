import AuthContext from "@/src/AuthContext";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { userAdapter } from "../adapters/userAdapter";
import toast from "react-hot-toast";

type Inputs = {
  current_password: string;
  new_password: string;
};

export default function ChangePasswordForm() {
  const { user } = useContext(AuthContext);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (user) {
			await userAdapter.changeUserPassword({id: user.user_id, current_password: data.current_password, new_password: data.new_password})
			.then((res) => {
				if (res.detail) {
					toast.success(res.detail)
					reset();
					
					return;
				}

				if (res.current_password) {
					toast.error(res.current_password)
					return
				}
			})
		}
  };

  return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col mb-4">
					<label className="mb-2">Current Password</label>
					<input
						
						className="px-1 py-2 rounded shadow"
						type="password"
						{...register("current_password", {
							required: true,
							minLength: 8,
							maxLength: 50,
						})}
					/>
					{errors.current_password?.type === 'required' && (
						<p role="alert" className="text-red-500 mt-2">
							Current password required.
						</p>
					)}
					{errors.current_password?.type === 'minLength' && (
						<p role="alert" className="text-red-500 mt-2">
							Current password needs to be longer.
						</p>
					)}
					{errors.current_password?.type === 'maxLength' && (
						<p role="alert" className="text-red-500 mt-2">
							Current password needs to be shorter.
						</p>
					)}
				</div>
				<div className="flex flex-col mb-4">
					<label className="mb-2">New Password</label>
					<input
						className="px-1 py-2 rounded shadow"
						type="password"
						{...register("new_password", {
							required: true,
							minLength: 8,
							maxLength: 50,
						})}
					/>
					{errors.new_password?.type === 'required' && (
						<p role="alert" className="text-red-500 mt-2">
							New password required.
						</p>
					)}
					{errors.new_password?.type === 'minLength' && (
						<p role="alert" className="text-red-500 mt-2">
							New password needs to be longer.
						</p>
					)}
					{errors.new_password?.type === 'maxLength' && (
						<p role="alert" className="text-red-500 mt-2">
							New password needs to be shorter.
						</p>
					)}
				</div>
				
				<button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
					Save
				</button>
			</form>
  );
}
