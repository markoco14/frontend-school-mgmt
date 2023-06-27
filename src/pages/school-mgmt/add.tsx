import { UserContext } from '@/src/context';
import Link from 'next/link';
import { useContext, useRef } from 'react';

export default function Home() {
  const context = useContext(UserContext);
  const schoolNameRef = useRef<HTMLInputElement>(null);

  async function handleAddSchool() {

    if (context.user?.id && schoolNameRef.current?.value) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-school/`, { 
          method: 'POST', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: schoolNameRef.current?.value, owner: context.user.id }) 
        })
        schoolNameRef.current.value = '';
        return response.json()
      } catch (error) {
        console.error(error)
      }
    }

  }

  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/school-mgmt/">Schools</Link>
        <Link href="/student-mgmt/">Students</Link>
      </nav>
      <h1>The School Management Page</h1>
            <form 
        className='bg-blue-500 p-2'
        onSubmit={(e) => {
          e.preventDefault();
          
          handleAddSchool();
        }
      }>
        <div className='flex flex-col'>
          <label>School Name</label>
          <input 
            ref={schoolNameRef} 
            type="text" 
          />
        </div>
        <button>Save</button>
      </form>
    </main>
  )
}
