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
  //   selectedSchool &&
  //     (await assessmentTypeAdapter
  //       .add({ schoolId: selectedSchool?.id, typeName: data.name })
  //       .then((res) => {
  //         toast.success("Module Type saved successfully!");
  //         setAssessmentTypes((prevTypes: AssessmentType[]) => [...prevTypes, res]);
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
									Module {assessment.module} {assessment.name} ( /{assessment.max_score})
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
								className="border shadow-inner rounded p-2"
								{...register("name", {
									required: true,
									minLength: 2,
									maxLength: 50,
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