import { userAdapter } from "@/src/modules/user-mgmt/infrastructure/adapters/userAdapter";
import { Class } from "../../../domain/entities/Class";
import { classAdapter } from "../../adapters/classAdapter";
import { useContext, useEffect, useState } from "react";
import { Teacher } from "@/src/modules/user-mgmt/domain/entities/Teacher";
import AuthContext from "@/src/AuthContext";

export default function ManageClassTeacher({selectedClass, setSelectedClass}: {selectedClass: Class, setSelectedClass: Function;}) {
	const {selectedSchool } = useContext(AuthContext)
	const [teachers, setTeachers] = useState<Teacher[]>()
	const [isAddTeacher, setIsAddTeacher] = useState<boolean>(false)

  async function handleAddTeacher({class_id, teacher_id}: {class_id: number, teacher_id: number}) {
    await classAdapter.addClassTeacher({class_id: class_id, teacher_id: teacher_id})
    .then((res) =>{
			console.log(res)
			setSelectedClass(res)
		});
  }

  async function handleRemoveTeacher({class_id}: {class_id: number}) {
    await classAdapter.deleteClassTeacher({class_id: class_id})
    .then((res) =>{
			console.log(res)
			setSelectedClass(res)
		});
  }

	useEffect(() => {
		async function getTeachers() {
		await userAdapter.listSchoolTeachers({id: selectedSchool.id})
				.then((res) => setTeachers(res))
			}

	getTeachers();
	}, [selectedSchool])


	return (
		<section className="mb-4">
			<h3 className="text-xl">Teacher Details</h3>
			<article className="bg-gray-100 shadow-inner p-2 rounded mb-4">
				<div className="flex justify-between items-baseline">
					<p>Primary Teacher: {selectedClass.teacher ? selectedClass.teacher : 'No teacher assigned'}</p>
					<button 
					className="text-red-500 underline underline-offset-2 p-2 rounded hover:bg-red-100 hover:text-red-900" 
					onClick={() => handleRemoveTeacher({class_id: selectedClass.id})}
					>
						Remove
					</button>
				</div>
				<button 
				className="text-blue-700 underline underline-offset-2 hover:text-blue-900 hover:-translate-y-1 hover:underline-offset-4 ease-in-out duration-200" 
				onClick={() => setIsAddTeacher(!isAddTeacher)}
				>
					{isAddTeacher ? 'Hide Teachers' : 'Assign Teacher'}
				</button>
				{isAddTeacher && (
					<>
						<p className="text-xl">Available Teachers</p>
						<ul className=" bg-white shadow-inner p-2 rounded mb-4">
							{teachers?.map((teacher, index) => (
								<li key={index} className="flex justify-between">
									<span>{teacher.first_name} {teacher.last_name}</span>
									<button 
									disabled={selectedClass.teacher ? true : false}
									className="text-blue-500 p-2 rounded hover:bg-blue-100 hover:text-blue-900 disabled:cursor-not-allowed" onClick={() => {
										handleAddTeacher({class_id: selectedClass.id, teacher_id: teacher.id})
									}}>
										<i className="fa-solid fa-plus"></i>
									</button>
								</li>
							))}
						</ul>
					</>
				)}
			</article>
		</section>
	);
}
