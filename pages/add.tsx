import Link from "next/link"

export default function AddStudent() {

	async function handleAddStudent() {		
		const response = await fetch('http://127.0.0.1:8000/add-student/', { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: "Java", last_name: "Script", age: 8 }) 
		})

		return response.json()
	}

	return (
		<main
      className='flex min-h-screen flex-col items-center p-24'
    >
			<nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/add">Add</Link>
      </nav>
			<h1>Add student</h1>
			<button onClick={handleAddStudent}>Add</button>
		</main>
	)
}