import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { SchoolDay } from "../../../domain/entities/SchoolDay";
import { schoolDayAdapter } from "../adapters/schoolDayAdapter";
import { scheduleAdapter } from "../adapters/scheduleAdapter";
import { WeekDay } from "../../../domain/entities/WeekDay";

const SchoolDayList = ({
	schoolDays,
	setSchoolDays
	}: {
	schoolDays: SchoolDay[];
	setSchoolDays: Function;
}) => {
	const { selectedSchool } = useContext(AuthContext)
	

	useEffect(() => {
    async function getSubjects() {
      if(selectedSchool) {
				await schoolDayAdapter.listSchoolSchoolDays({schoolId: selectedSchool.id})
				.then((res) => {
					setSchoolDays(res)})
      }
    }

    getSubjects();
  }, [selectedSchool, setSchoolDays])

	// async function handleDeleteSubject({subjectId}: {subjectId: number}) {
  //   await subjectAdapter.deleteSubject({id: subjectId}).then((res) => {
	// 		// because prevSubjects has any type 
	// 		// @ts-ignore
  //     setSubjects(prevSubjects => prevSubjects?.filter((subject) => subject.id !== subjectId))
  //     toast.success('Subject deleted.');
  //   })
  // }


	return (
		<>
			<ul className="bg-gray-100 rounded shadow-inner mb-4">
				{schoolDays?.map((schoolDay, index) => (
					<li 
						key={index}
						className="p-2 hover:bg-gray-300 flex justify-between"
					>
						<span>{schoolDay.day}</span>
						{/* <button 
						onClick={() => handleDeleteSubject({subjectId: subject.id})}
						className="text-red-500 hover:text-red-600"
						>delete</button> */}
					</li>
				))}
			</ul>
		</>
	);
}

export default function SchoolDaySection() {
  const { selectedSchool } = useContext(AuthContext)
	const [schoolDays, setSchoolDays] = useState<SchoolDay[]>([])
	const [weekDays, setWeekDays] = useState<WeekDay[]>([])


  useEffect(() => {
		async function getWeekDays() {
			await scheduleAdapter.listWeekDays()
			.then((res) => {
				setWeekDays(res)
			})
		}
    async function getSchoolDays() {
      if(selectedSchool) {
				await schoolDayAdapter.listSchoolSchoolDays({schoolId: selectedSchool.id})
				.then((res) => {
					setSchoolDays(res)})
      }
    }

    getSchoolDays();
		getWeekDays();
  }, [selectedSchool])
  
  return (
    <section>
			<article>
				<h2 className="text-3xl mb-2">School Days</h2>
				<SchoolDayList schoolDays={schoolDays} setSchoolDays={setSchoolDays}/>
				{/* <button className="bg-blue-300 p-2 rounded" onClick={() => console.log('adding new school day')}>Add Days</button> */}
				{/* <h3>Days</h3>
				<ul>
					{weekDays.map((weekday, index) => (
						<li key={index}>{weekday.day} ({weekday.id})</li>
					))}
				</ul> */}
			</article>
		</section>
  );
}