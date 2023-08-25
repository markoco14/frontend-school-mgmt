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

	
	const [response, setResponse] = useState<any[]>([])
	const [subjectLevels, setSubjectLevels] = useState<any[]>([])
	const [uniqueSubjects, setUniqueSubjects] = useState<Subject[]>([])
	const [currentSubject, setCurrentSubject] = useState<string>("")


	useEffect(() => {
		 async function getSubjectLevels() {
			await subjectLevelAdapter.listSchoolSubjectLevels({id: selectedSchool.id})
			.then((res) => {
				const uniqueSubjects = res.reduce((acc: Subject[], subjectLevel: SubjectLevel) => {
					if (!acc.find((subject: Subject) => subject.name === subjectLevel.subject.name)) {
						acc.push(subjectLevel.subject);
					}
					return acc;
				}, []);
				const filteredLevels = res.filter(subjectLevel => subjectLevel.subject.name === uniqueSubjects[0].name).map(subjectLevel => subjectLevel.level);
				
				setResponse(res)
				setUniqueSubjects(uniqueSubjects);
				setCurrentSubject(uniqueSubjects[0].name)
				setSubjectLevels(filteredLevels);
			})
		 }
		 getSubjectLevels();
	}, [selectedSchool])

	function handleChangeLevel(response: SubjectLevel[], subjectName: string) {
		const filteredLevels = response.filter(subjectLevel => subjectLevel.subject.name === subjectName).map(subjectLevel => subjectLevel.level);
		setCurrentSubject(subjectName)
		setSubjectLevels(filteredLevels)
	}
	
	return (
		<section className="col-span-2">
			<h2 className="text-3xl mb-2">Subjects/Levels</h2>
			<article className="grid grid-cols-2">
				<div className="col-span-3 xs:col-span-1">
					<h3 className="text-center">Subjects</h3>
					<ul className="bg-gray-100 rounded shadow-inner mb-4">
						{uniqueSubjects?.map((subject: Subject, index) => (
							<li key={index}
							className={`${subject.name === currentSubject ? "bg-blue-300" : "bg-white" } p-2 hover:bg-gray-300`}
							onClick={() => {
								handleChangeLevel(response, subject.name)
							}}
							
							>{subject.name}</li>
						))}
					</ul>
				</div>
				<div className="col-span-3 xs:col-span-1">
					<h3 className="text-center">Levels</h3>
					<ul className="bg-gray-100 rounded shadow-inner mb-4">
						{subjectLevels?.map((level, index) => (
							<li key={index}
							className="p-2 hover:bg-gray-300"
							>{level.name}</li>
						))}
					</ul>
				</div>
			</article>
		</section>
	);
}