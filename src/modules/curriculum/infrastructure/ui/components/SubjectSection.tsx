import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { subjectAdapter } from "../../adapters/subjectAdapter";
import { Subject } from "../../../domain/entities/Subject";
import AddSubject from "./AddSubject";

const SubjectList = ({
	subjects, 
	setSubjects, 
	}: {
		subjects: Subject[], 
		setSubjects: Function
}) => {
	  const { selectedSchool } = useContext(AuthContext)

	useEffect(() => {
    async function getSubjects() {
      if(selectedSchool) {
				await subjectAdapter.listSchoolSubjects({schoolId: selectedSchool.id})
				.then((res) => {
					setSubjects(res.results)})
      }
    }

    getSubjects();
  }, [selectedSchool, setSubjects])

	async function handleDeleteSubject({subjectId}: {subjectId: number}) {
    await subjectAdapter.deleteSubject({id: subjectId}).then((res) => {
			// because prevSubjects has any type 
			// @ts-ignore
      setSubjects(prevSubjects => prevSubjects?.filter((subject) => subject.id !== subjectId))
      toast.success('Subject deleted.');
    })
  }


	return (
		<ul className="bg-gray-100 rounded shadow-inner mb-4">
			{subjects?.map((subject, index) => (
				<li 
					key={index}
					className="p-2 hover:bg-gray-300 flex justify-between"
				>
					<span>{subject.name}</span>
					<button 
					onClick={() => handleDeleteSubject({subjectId: subject.id})}
					className="text-red-500 hover:text-red-600"
					>delete</button>
				</li>
			))}
		</ul>
	);
}

export default function SubjectSection() {
  const { selectedSchool } = useContext(AuthContext)
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    async function getSubjects() {
      if(selectedSchool) {
				await subjectAdapter.listSchoolSubjects({schoolId: selectedSchool.id})
				.then((res) => {
					setSubjects(res.results)})
      }
    }

    getSubjects();
  }, [selectedSchool])
  
  return (
    <section>
			<article>
				<h2 className="text-3xl mb-2">Subjects</h2>
				<SubjectList subjects={subjects} setSubjects={setSubjects} />
				<AddSubject setSubjects={setSubjects} />
			</article>
		</section>
  );
}
