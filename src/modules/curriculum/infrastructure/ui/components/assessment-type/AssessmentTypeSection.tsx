import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { assessmentTypeAdapter } from "../../../adapters/assessmentTypeAdapter";
import { AssessmentType } from "@/src/modules/curriculum/domain/entities/AssessmentType";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
};

export default function AssessmentTypeSection() {
	const { selectedSchool } = useContext(AuthContext);
	const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

	const [assessmentTypes, setAssessmentTypes] = useState<AssessmentType[]>([])


	const onSubmit: SubmitHandler<Inputs> = async (data) => {
    selectedSchool &&
      (await assessmentTypeAdapter
        .add({ schoolId: selectedSchool?.id, typeName: data.name })
        .then((res) => {
          toast.success("Module Type saved successfully!");
          setAssessmentTypes((prevTypes: AssessmentType[]) => [...prevTypes, res]);
        }));
    reset();
    return;
  };

	useEffect(() => {
    async function getData() {
      await assessmentTypeAdapter
        .list({ schoolId: selectedSchool?.id })
        .then((res) => {
          setAssessmentTypes(res);
        });
    }

    selectedSchool && getData();
  }, [selectedSchool]);
	return (
		<section>
			<h2 className="text-3xl mb-4">Assessment Types</h2>
				<div className="grid sm:grid-cols-2 gap-4">
				<article className="border rounded shadow mb-4 p-4 flex flex-col gap-6 text-gray-700">
					<h3 className="text-xl">Your Assessment Types</h3>
					{assessmentTypes?.length === 0 ? (
						<p>There are no module types.</p>
					) : (
						<ul>
							{assessmentTypes?.map((type, index) => (
								<li
									key={index}
									onClick={() => {
										// setSelectedType(type);
										// setIsManageType(true);
									}}
								>
									{type.name}
								</li>
							))}
						</ul>
					)}
				</article>
				<article className="border rounded shadow mb-4 p-4 flex flex-col gap-6 text-gray-700">
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
				</article>
			</div>
		</section>
	);
}