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
        console.error(error)
      }
    }
  }, [context])

  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/school-mgmt/">Schools</Link>
        <Link href="/student-mgmt/">Students</Link>
      </nav>
      <h1>Manage all your schools from here!</h1>
      
      <section>
        {mySchools.length > 0 ? (
          <>
            <div className="flex justify-between">
              <p>Your schools</p>
              <Link href="/school-mgmt/add">Add School</Link>
            </div>
            {mySchools?.map((school: School, index) => (
              <p key={index}>School: {school.name} Owner: {school.owner} Id: {school.id}</p>
            ))}
          </>
        ) : (
          <p>You have no schools</p>
        )}
        
      </section>


    </main>
  )
}
