import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Level } from "../../../domain/entities/Level";
import { Subject } from "../../../domain/entities/Subject";
import PaginationButtons from "@/src/modules/core/infrastructure/ui/components/PaginationButtons";
import { subjectLevelAdapter } from "../../adapters/subjectLevelAdapter";
import { SubjectLevel } from "../../../domain/entities/SubjectLevel";
import { resolve } from "dns";

export default function SubjectLevelSection() {
	const { selectedSchool } = useContext(AuthContext);

	const [levels, setLevels] = useState<any[]>([])


	const [subjects, setSubjects] = useState<Subject[]>([])
	const [currentSubject, setCurrentSubject] = useState<string>("")


	useEffect(() => {
		 async function getSubjectLevels() {
			await subjectLevelAdapter.listSchoolSubjectLevels({id: selectedSchool.id})
			.then((res) => {
				// Extract unique subject names
				const uniqueSubjects = res.reduce((acc: Subject[], item: SubjectLevel) => {
						if (!acc.find((subject: Subject) => subject.name === item.subject.name)) {
								acc.push(item.subject);
						}
						return acc;
				}, []);
				console.log(uniqueSubjects)

				const filteredLevels = res.filter(item => item.subject.name === currentSubject);

				setLevels(filteredLevels);
				// Using useState
				setSubjects(uniqueSubjects);
				console.log(uniqueSubjects[0].name)
				setCurrentSubject(uniqueSubjects[0].name)
				console.log(res)
			})
		 }
		 getSubjectLevels();
	}, [selectedSchool, currentSubject])
	
	return (
		<section className="col-span-2">
			<h2 className="text-3xl mb-2">Subjects/Levels</h2>
			<article className="grid grid-cols-2">
				<div className="col-span-3 xs:col-span-1">
					<h3 className="text-center">Subjects</h3>
					<ul className="bg-gray-100 rounded shadow-inner mb-4">
						{subjects?.map((subject: Subject, index) => (
							<li key={index}
							className={`${subject.name === currentSubject ? "bg-blue-300" : "bg-white" } p-2 hover:bg-gray-300`}
							onClick={() => {
								console.log(subject.name)
								setCurrentSubject(subject.name)
							}}
							
							>{subject.name}</li>
						))}
					</ul>
				</div>
				<div className="col-span-3 xs:col-span-1">
					<h3 className="text-center">Levels</h3>
					<ul className="bg-gray-100 rounded shadow-inner mb-4">
						{levels?.map((subjectLevel, index) => (
							<li key={index}
							className="p-2 hover:bg-gray-300"
							onClick={() => {
								console.log(subjectLevel)
							}}
							>{subjectLevel.level.name}</li>
						))}
					</ul>
				</div>
			</article>
		</section>
	);
}