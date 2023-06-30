import Layout from "@/src/modules/core/infrastructure/ui/components/Layout"
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student"
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter"
import Link from "next/link"
import { FormEvent, useState } from "react"

export default function AddStudent() {

	const [firstName, setFirstName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [age, setAge] = useState<number>(0)

	async function handleAddStudent(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();	
		if (!firstName || !lastName || !age) {
			return
		}	

		const student: Student = await studentAdapter.addStudent({firstName: firstName, lastName: lastName, age: age})
		
		return student;
	}

	return (
		<Layout>
			<h1>Add student</h1>
			<Link href="/student-mgmt/add">Add</Link>
			<Link href="/student-mgmt/delete">Delete</Link>
			<form onSubmit={(e) => handleAddStudent(e)}>
				<div className="flex flex-col">
					<label>First Name</label>
					<input className='px-1 py-2 rounded shadow'required type="text" onChange={(e) => setFirstName(e.target.value)}/>
				</div>
				<div className="flex flex-col">
					<label>Last Name</label>
					<input className='px-1 py-2 rounded shadow'required type="text" onChange={(e) => setLastName(e.target.value)}/>
				</div>
				<div className="flex flex-col">
					<label>Age</label>
					<input className='px-1 py-2 rounded shadow'required type="number" onChange={(e) => setAge(Number(e.target.value))}/>
				</div>
				<button>Add</button>
			</form>
		</Layout>
	)
}