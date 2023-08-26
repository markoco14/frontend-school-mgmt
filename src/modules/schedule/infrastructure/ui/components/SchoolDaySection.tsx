import AuthContext from "@/src/AuthContext";
import AddSchoolDay from "@/src/modules/school-mgmt/infrastructure/ui/components/AddSchoolDay";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { schoolDayAdapter } from "../adapters/schoolDayAdapter";
import { SchoolDay } from "@/src/modules/school-mgmt/domain/entities/SchoolDay";

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

	async function handleDeleteSchoolDay({schoolDayId}: {schoolDayId: number}) {
    await schoolDayAdapter.deleteSchoolDay({schoolDayId: schoolDayId}).then((res) => {
      setSchoolDays((prevSchoolDays: SchoolDay[]) => prevSchoolDays?.filter((schoolDay: SchoolDay) => schoolDay.id !== schoolDayId))
      toast.success('Subject deleted.');
    })
  }


	return (
		<ul className="bg-gray-100 rounded shadow-inner mb-4">
			{schoolDays?.map((schoolDay, index) => (
				<li 
					key={index}
					className="p-2 hover:bg-gray-300 flex justify-between"
				>
					<span>{schoolDay.day}</span>
					<button 
					onClick={() => handleDeleteSchoolDay({schoolDayId: schoolDay.id})}
					className="text-red-500 hover:text-red-600"
					>delete</button>
				</li>
			))}
		</ul>
	);
}

export default function SchoolDaySection() {
  const { selectedSchool } = useContext(AuthContext)
	const [schoolDays, setSchoolDays] = useState<SchoolDay[]>([])


  useEffect(() => {
    async function getSchoolDays() {
      if(selectedSchool) {
				await schoolDayAdapter.listSchoolSchoolDays({schoolId: selectedSchool.id})
				.then((res) => {
					setSchoolDays(res)})
      }
    }
    getSchoolDays();
  }, [selectedSchool])
  
  return (
    <section>
			<article>
				<h2 className="text-3xl mb-2">School Days</h2>
				<SchoolDayList schoolDays={schoolDays} setSchoolDays={setSchoolDays}/>
				<AddSchoolDay schoolDays={schoolDays} setSchoolDays={setSchoolDays}/>
			</article>
		</section>
  );
}
