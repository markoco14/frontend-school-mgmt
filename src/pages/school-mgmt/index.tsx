import { UserContext } from '@/src/context';
import { schoolAdapter } from '@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';

type School = {
  name: string;
  owner: number;
  id: number;
};

export default function Home() {
  const context = useContext(UserContext);
  const schoolNameRef = useRef<HTMLInputElement>(null);
  const [mySchools, setMySchools] = useState<School[]>([]);

  useEffect(() => {
    async function getSchoolsByOwnerId(id: number) {
      await schoolAdapter.getSchoolsByOwnerId({id: id})
      .then((res) => {
        setMySchools(res)
      })
    }

    if (context.user?.id) {
      try {
        getSchoolsByOwnerId(context.user?.id);
      } catch (error) {
        console.log(error)
      }
    }
  }, [context])

  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
      </nav>
      <h1>Manage all your schools from here!</h1>
      <section>
        {mySchools.length > 0 ? (
          <>
            <p>Your schools</p>
            {mySchools?.map((school: School, index) => (
              <p key={index}>School: {school.name} Owner: {school.owner} Id: {school.id}</p>
            ))}
          </>
        ) : (
          <p>You have no schools</p>
        )}
        
      </section>

      {/* <form 
        className='bg-blue-500 p-2'
        onSubmit={(e) => {
          e.preventDefault();
          console.log('You just made a school!');
          console.log(context)
          schoolNameRef.current ? schoolNameRef.current.value = '' : null;
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
      </form> */}
    </main>
  )
}
