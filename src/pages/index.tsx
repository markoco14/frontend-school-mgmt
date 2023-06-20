import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRef, useState } from 'react';

type Student = {
  first_name: string;
  last_name: string;
  age: number;
};

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async () => {
  const res = await fetch('https://api.cramschoolcloud.com/get-students/');
  const students = await res.json();
  return { props: { students } };
};

export default function Home({students}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [ownerName, setOwnerName] = useState<string>('');

  const ownerNameRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (ownerName === '' || ownerName === undefined || ownerName === null) {
              alert('You need to choose your name')
              return;
            }
            console.log("Name saved in the DB")
            setOwnerName('')
            ownerNameRef.current ? ownerNameRef.current.value = '' : null;
            alert('Name saved successfully')
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
        <h2>Sign up your school to get started.</h2>
        <div>
          <button onClick={() => setIsSignUp(true)}>Sign Up</button>
          <button onClick={() => setIsSignUp(false)}>Log In</button>
        </div>
        {isSignUp ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            }}>
            <div>
              <label>Name</label>
              <input ref={ownerNameRef} type="text" onChange={(e) => setOwnerName(e.target.value)}/>
            </div>
            <button>Save</button>
          </form>
        ) : (
          <ul>
            <li>Owner A</li>
            <li>Owner B</li>
            <li>Owner C</li>
            <li>Owner D</li>
            <li>Owner E</li>
            <li>Owner F</li>
          </ul>
        )}
      </section>
    </main>
  )
}
