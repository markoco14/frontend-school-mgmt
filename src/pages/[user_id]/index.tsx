import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';


export default function User() {
	const router = useRouter()
  
  const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false);
  const [schoolName, setSchoolName] = useState<string>('');

  const schoolNameRef = useRef<HTMLInputElement>(null);

  async function handleAddSchool() {
    if (!schoolName) {
      alert('You need to set a school name')
      return;
    }
    console.log({ name: schoolName, owner: Number(router.query.user_id) })

    const response = await fetch('http://localhost:8000/add-school/', { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: schoolName, owner: Number(router.query.user_id) }) 
		})

    console.log('making new school')
    console.log(schoolName)
    schoolNameRef.current ? schoolNameRef.current.value = '' : null;
    setSchoolName('')

    alert('School added successfully!');

    return response.json();
  }

  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
      </nav>
      <h1>Easy Cram School Management In The Cloud.</h1>
      <section>
        <h2>Welcome back user {router.query.user_id}</h2>
        <div>
          <button>Schools</button>
        </div>
        <article>
          <div className='flex justify-between'>
            <h3>Your schools</h3>
            <button onClick={() => setIsAddingSchool(!isAddingSchool)}>+</button>
          </div>
        </article>
        <article>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const response = await handleAddSchool();
            console.log(response)
          }
          }>
            <div>
              <label>Name</label>
              <input 
                ref={schoolNameRef} 
                type="text" 
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
            <button>Add</button>
          </form>
        </article>
      </section>
    </main>
  )
}
