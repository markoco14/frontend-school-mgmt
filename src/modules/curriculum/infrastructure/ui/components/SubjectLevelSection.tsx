import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Subject } from "../../../domain/entities/Subject";
import { SubjectLevel } from "../../../domain/entities/SubjectLevel";
import { Level } from "../../../domain/entities/Level";
import { Module } from "../../../domain/entities/Module";
import { moduleAdapter } from "../../adapters/moduleAdapter";

export default function SubjectLevelSection({subjectLevels}: {subjectLevels: SubjectLevel[]}) {
  const { selectedSchool } = useContext(AuthContext);

  const [currentSubjectLevels, setCurrentSubjectLevels] = useState<Level[]>([]);
  const [uniqueSubjects, setUniqueSubjects] = useState<Subject[]>([]);
  const [currentSubject, setCurrentSubject] = useState<string>("");

	const [currentLevel, setCurrentLevel] = useState<number>(0);

	const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {

		async function getSchoolModules() {
			if (selectedSchool) {
				await moduleAdapter.listSchoolModules({schoolId: selectedSchool.id})
					.then((res) => setModules(res))
			}
		}

		const uniqueSubjects = subjectLevels.reduce(
			(acc: Subject[], subjectLevel: SubjectLevel) => {
				if (
					!acc.find(
						(subject: Subject) =>
						subject.name === subjectLevel.subject.name
						)
						) {
							acc.push(subjectLevel.subject);
						}
						return acc;
					},
		[]
		);
		setUniqueSubjects(uniqueSubjects);
		setCurrentSubject(uniqueSubjects[0]?.name);
		
		const filteredLevels = subjectLevels
		.filter(
			(subjectLevel) =>
			subjectLevel.subject.name === uniqueSubjects[0]?.name
			)
			.map((subjectLevel) => subjectLevel.level)
			.sort((a, b) => a.order - b.order);
		setCurrentSubjectLevels(filteredLevels);
		setCurrentLevel(filteredLevels[0]?.order)

		getSchoolModules();
  }, [selectedSchool, subjectLevels]);

  function handleChangeLevel(subjectLevels: SubjectLevel[], subjectName: string) {
    const filteredLevels = subjectLevels
      .filter((subjectLevel) => subjectLevel.subject.name === subjectName)
      .map((subjectLevel) => subjectLevel.level)
      .sort((a, b) => a.order - b.order);
    setCurrentSubject(subjectName);
    setCurrentSubjectLevels(filteredLevels);
  }

  return (
    <section className="col-span-2">
      <h2 className="text-3xl mb-2">Modules</h2>
			{!subjectLevels.length ? (
				<p>there are no levels connected to your subjects</p>
			) : (
				<article className="grid grid-cols-4">
					<div className="col-span-4 xs:col-span-1">
						<h3 className="text-xl">Subjects</h3>
						<ul className="bg-gray-100 rounded shadow-inner mb-4">
							{uniqueSubjects?.map((subject: Subject, index) => (
								<li
									key={index}
									className={`${
										subject.name === currentSubject ? "bg-blue-300 hover:bg-blue-500" : "bg-white hover:bg-gray-300"
									} p-2 hover:cursor-pointer`}
									onClick={() => {
										handleChangeLevel(subjectLevels, subject.name);
									}}
								>
									{subject.name}
								</li>
							))}
						</ul>
					</div>
					<div className="col-span-4 xs:col-span-1">
						<h3 className="text-xl">Levels</h3>
						<ul className="bg-gray-100 rounded shadow-inner mb-4">
							{currentSubjectLevels?.map((level, index) => (
								<li 
								key={index} 
								className={`${
									level.order === currentLevel ? "bg-blue-300 hover:bg-blue-500" : "bg-white hover:bg-gray-300"
									} p-2 hover:cursor-pointer`
								}
								onClick={() => setCurrentLevel(level.order)}
								>
									{level.name}
								</li>
							))}
						</ul>
					</div>
					<div className="col-span-4 xs:col-span-2">
						<h3 className="text-xl">Modules</h3>
						<ul className="bg-gray-100 rounded shadow-inner mb-4">
							{modules?.map((module, index) => (
								<li key={index} className="p-2 hover:bg-gray-300">
									{module.name}
								</li>
							))}
						</ul>
					</div>
				</article>
			)}
    </section>
  );
}
