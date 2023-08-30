import AuthContext from "@/src/AuthContext";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { assessmentAdapter } from "../../../adapters/assessmentAdapter";
import toast from "react-hot-toast";
import { Module } from "@/src/modules/curriculum/domain/entities/Module";

type Inputs = {
  name: string;
  description: string;
  module: number;
  type: number;
  order: number;
  max_score: number;
  status: number;
};

export default function NewAssessmentForm({selectedModule}: {selectedModule: Module}) {
  const { selectedSchool } = useContext(AuthContext);

	const statusValues = [
		{
			"value": 0,
			"string": 'Active'
		},
		{
			"value": 1,
			"string": 'Inactive'
		},
		{
			"value": 2,
			"string": 'Draft'
		},
	];
	
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    selectedSchool &&
      (await assessmentAdapter
        .add({
          name: data.name,
          description: data.description,
          module: data.module,
          type: data.type,
          order: data.order,
          max_score: data.max_score,
          status: data.status,
        })
        .then((res) => {
          toast.success("Assessment saved successfully!");
					// make copy of modules
					// const tempModules = [...modules]
					// append response to the corresponding assessment array
					// setModules to that
          // setModules((prevTypes: Module[]) => [...prevTypes, res]);
        }));
    reset();
    return;
  };

	useEffect(() => {
		console.log('effecting')
	}, [])

  return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4"
		>
			<div className="flex flex-col gap-2">
				<label className="flex justify-between">
					<span>Name</span>{" "}
					{errors.name && <span className="text-red-500">required</span>}
				</label>
				<input
					type="text"
					className="border shadow-inner rounded p-2"
					{...register("name", {
						required: true,
						minLength: 2,
						maxLength: 50,
					})}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="flex justify-between">
					<span>Description</span>{" "}
					{errors.description && (
						<span className="text-red-500">required</span>
					)}
				</label>
				<textarea
					className="border shadow-inner rounded p-2"
					{...register("description", {
						required: true,
						minLength: 2,
						maxLength: 255,
					})}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="flex justify-between">
					<span>Type</span>{" "}
					{errors.type && <span className="text-red-500">required</span>}
				</label>
				<input
					type="number"
					className="border shadow-inner rounded p-2"
					{...register("type", {
						required: true,
						min: 1,
						valueAsNumber: true,
					})}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="flex justify-between">
					<span>Order</span>{" "}
					{errors.order && <span className="text-red-500">required</span>}
				</label>
				<input
					type="number"
					className="border shadow-inner rounded p-2"
					{...register("order", {
						required: true,
						min: 1,
						valueAsNumber: true,
					})}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="flex justify-between">
					<span>Max Score</span>{" "}
					{errors.max_score && (
						<span className="text-red-500">required</span>
					)}
				</label>
				<input
					type="number"
					className="border shadow-inner rounded p-2"
					{...register("max_score", {
						required: true,
						min: 1,
						valueAsNumber: true,
					})}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="flex justify-between">
					<span>Status</span>{" "}
					{errors.status && (
						<span className="text-red-500">required</span>
					)}
				</label>
				{statusValues.map((value, valueIndex) => (
					<div key={`value-${valueIndex}`} className="flex gap-2">
						<label className="peer-checked:bg-blue-500 relative cursor-pointer w-full flex">
							<input
								type="radio"
								value={value.value}
								className="sr-only peer"
								{...register("status", {
									required: true,
									valueAsNumber: true,
								})}
							/>
							<span className="w-full hover:bg-gray-300 ease-in-out duration-200 bg-gray-100 peer-checked:bg-gray-500 peer-checked:text-white p-2 border shadow-inner rounded">{value.string}</span>
						</label>
					</div>
				))}
			</div>
			<button className="w-full ease-in-out duration-200 bg-blue-600  hover:bg-blue-900 p-2 rounded shadow text-white">
				Submit
			</button>
		</form>
  );
}
