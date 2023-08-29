import AuthContext from "@/src/AuthContext";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModuleType } from "../../../../domain/entities/ModuleType";

type Inputs = {
name: string;
school: number;
};

export default function ModuleTypeSection() {
	const { selectedSchool } = useContext(AuthContext);
  const [moduleTypes, setModuleTypes] = useState<ModuleType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data);
		console.log(selectedSchool?.id)
		return
		// send data
		// get response
		// change state
		// reset
  };
  
  return (
		<>
			<h2>Module Types</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<label className="flex justify-between"><span>Name</span> {errors.name && <span className="text-red-500">required</span>}</label>
					<input
						className="border shadow-inner rounded p-2"
						{...register("name", {
							required: true,
							minLength: 2,
							maxLength: 50,
						})}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="flex justify-between"><span>Order</span> {errors.school && <span className="text-red-500">required</span>}</label>
					<input
						className="border shadow-inner rounded p-2"
						type="number"
						{...register("school", {
							required: true,
							min: 1,
						})}
					/>
				</div>
				<button className="w-full ease-in-out duration-200 bg-blue-600  hover:bg-blue-900 p-2 rounded shadow text-white">Submit</button>
			</form>
		</>
  );
}
