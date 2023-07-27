import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { userAdapter } from "../adapters/userAdapter";
import { Teacher } from "../../domain/entities/Teacher";
import { useContext } from "react";
import AuthContext from "@/src/AuthContext";


type Inputs = {
  email: string;
  password: string;
}

export default function TeacherSignup() {
	const { selectedSchool } = useContext(AuthContext);

	const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
			const teacher: Teacher = await userAdapter.addTeacher({
				email: data.email,
				password: data.password,
				school_id: selectedSchool.id
			});
		
			// @ts-ignore
			if (teacher === 'Teacher already exists') {
				toast.success('Teacher already exists')
			} else {
				toast.success(`User added: ${teacher.email}`);
			}
      reset();
    } catch (error) {
      console.error(error)
    }
  };

  return (
		<form
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col mb-4">
				<label className="mb-2">Email</label>
				<input
					type="email"
					{...register("email", { required: true, minLength: 3, maxLength: 50 })}
					className="shadow-md border p-2 rounded"
				/>
			</div>
			<div className="flex flex-col mb-4">
				<label className="mb-2">Password</label>
				<input
					type="password"
					{...register("password", { required: true, minLength: 2, maxLength: 50 })}
					className="shadow-md border p-2 rounded"
				/>
			</div>
			<button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
				Save
			</button>
		</form>
  );
}
