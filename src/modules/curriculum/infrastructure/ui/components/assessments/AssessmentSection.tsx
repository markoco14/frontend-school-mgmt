import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
import { assessmentAdapter } from "../../../adapters/assessmentAdapter";
import { Assessment } from "@/src/modules/curriculum/domain/entities/Assessment";
// import toast from "react-hot-toast";
// import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
// import ManageAssessmentType from "@/src/modules/curriculum/infrastructure/ui/components/assessment-type/ManageAssessmentType";


// type Inputs = {
//   name: string;
// 	description: string;
// 	module: number;
// 	type: number;
// 	order: number;
// 	max_score: number;
// 	status: number;
// };

export default function AssessmentSection() {
	const { selectedSchool } = useContext(AuthContext);
	// const {
  //   register,
  //   reset,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>();

	const [assessments, setAssessments] = useState<Assessment[]>([])

	// const [isManageType, setIsManageType] = useState<boolean>(false);
	// const [selectedType, setSelectedType] = useState<AssessmentType | null>(null);


	// const onSubmit: SubmitHandler<Inputs> = async (data) => {
	// 	console.log(data)
	// 	// return
  //   selectedSchool &&
  //     (await assessmentAdapter
  //       .add({ 
	// 				name: data.name,
	// 				description: data.description,
	// 				module: data.module,
	// 				type: data.type,
	// 				order: data.order,
	// 				max_score: data.max_score,
	// 				status: data.status,
	// 			})
  //       .then((res) => {
  //         toast.success("Assessment saved successfully!");
  //         setAssessments((prevTypes: Assessment[]) => [...prevTypes, res]);
  //       }));
  //   reset();
  //   return;
  // };

	//  function handleClose() {
	// 		setSelectedType(null);
	// 		setIsManageType(false);
	// 	}

	useEffect(() => {
    async function getData() {
      await assessmentAdapter
        .list({ schoolId: selectedSchool?.id })
        .then((res) => {
					console.log(res)
          setAssessments(res);
        });
    }

    selectedSchool && getData();
  }, [selectedSchool]);

	return (
		<section>
			<h2 className="text-3xl mb-4">Assessments</h2>
				<div className="grid sm:grid-cols-2 gap-4">
				<article className="border rounded shadow mb-4 p-4 flex flex-col gap-6 text-gray-700">
					<h3 className="text-xl">{selectedSchool.name} Assessments</h3>
					{assessments?.length === 0 ? (
						<p>There are no assessments.</p>
					) : (
						<ul>
							{assessments?.map((assessment, index) => (
								<li
									key={index}
									// onClick={() => {
									// 	setSelectedType(assessment);
									// 	setIsManageType(true);
									// }}
								>
									{assessment.module.name}: {assessment.name} Order {assessment.order} Type {assessment.type} ( /{assessment.max_score})
								</li>
							))}
						</ul>
					)}
				</article>
				{/* <article className="border rounded shadow mb-4 p-4 flex flex-col gap-6 text-gray-700">
					<h3 className="text-xl">New Assessment Type</h3>
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
								{errors.description && <span className="text-red-500">required</span>}
							</label>
							<textarea
								className="border shadow-inner rounded p-2"
								{...register("description", {
									// required: true,
									minLength: 2,
									maxLength: 255,
								})}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label className="flex justify-between">
								<span>Module</span>{" "}
								{errors.module?.type && <span className="text-red-500">1 or higher</span>}
							</label>
							<input
								type="number"
								className="border shadow-inner rounded p-2"
								{...register("module", {
									required: true,
									min: 1,
									valueAsNumber: true,
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
								{errors.max_score && <span className="text-red-500">required</span>}
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
								{errors.status && <span className="text-red-500">required</span>}
							</label>
							<input
								type="number"
								className="border shadow-inner rounded p-2"
								{...register("status", {
									required: true,
									min: 0,
									max: 4,
									valueAsNumber: true,
								})}
							/>
						</div>
						<button className="w-full ease-in-out duration-200 bg-blue-600  hover:bg-blue-900 p-2 rounded shadow text-white">
							Submit
						</button>
					</form>
				</article> */}
			</div>
			{/* <Modal show={isManageType} close={handleClose} title={"Manage Assessment Type"}>
				<ManageAssessmentType 
					types={assessmentTypes}
          setTypes={setAssessmentTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
				/>
			</Modal> */}
		</section>
	);
}