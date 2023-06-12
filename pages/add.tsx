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
		const response = await fetch('http://54.95.13.158/8000/add-student/', { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: firstName, last_name: lastName, age: age }) 
		})

		return response.json()
	}

	return (
		<main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
			<nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/add">Add</Link>
        <Link href="/delete">Delete</Link>
      </nav>
			<h1>Add student</h1>
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
		</main>
	)
}