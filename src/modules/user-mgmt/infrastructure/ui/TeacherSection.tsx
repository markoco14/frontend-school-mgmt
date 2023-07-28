import { useContext, useEffect, useState } from "react";
import { userAdapter } from "../adapters/userAdapter";
import AuthContext from "@/src/AuthContext";
import TeacherList from "./TeacherList";
import TeacherSignup from "./TeacherSignup";
import { Teacher } from "../../domain/entities/Teacher";


export default function TeacherSection() {
	const {user, selectedSchool} = useContext(AuthContext)
	const [teachers, setTeachers] = useState<Teacher[]>([]);

	useEffect(() => {
		async function getData(school_id: number, user_id: number) {
			await userAdapter.getTeachersBySchool({school: school_id, owner: user_id})
			.then((res) => {
				console.log(res)
				setTeachers(res)
			})
		}
		if (user && selectedSchool) {
			getData(selectedSchool.id, user.user_id)
		}
	}, [selectedSchool, user])
	

  return (
		
		<section>
			<h2>Teachers</h2>
			<TeacherList teachers={teachers}/>
			<TeacherSignup teachers={teachers} setTeachers={setTeachers}/>
		</section>
  );
}
