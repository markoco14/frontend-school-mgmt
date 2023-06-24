import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { FormEvent, useContext, useRef, useState } from 'react';
import { UserContext } from '../context';


type User = {
  id: number;
  first_name: string;
  last_name: string;
};

export const getServerSideProps: GetServerSideProps<{
  users: User[];
}> = async () => {
  const res = await fetch('http://localhost:8000/get-users/');
  // const res = await fetch('https://api.cramschoolcloud.com/get-users/');
  const users = await res.json();
  return { props: { users } };
};

export default function Home({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const context = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [ownerFirstName, setOwnerFirstName] = useState<string>('');
  const [ownerLastName, setOwnerLastName] = useState<string>('');

  const ownerFirstNameRef = useRef<HTMLInputElement>(null);
  const ownerLastNameRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!ownerFirstName || !ownerLastName) {
      alert('You need to choose your full name');
      return;
    }
    setOwnerFirstName('');
    ownerFirstNameRef.current ? ownerFirstNameRef.current.value = '' : null;
    setOwnerLastName('');
    ownerLastNameRef.current ? ownerLastNameRef.current.value = '' : null;

    const response = await fetch('http://localhost:8000/add-user/', { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: ownerFirstName, last_name: ownerLastName }) 
		});
    alert('User saved successfully');

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
      {context.user ? (
         <section>
        <p>Welcome back, {context.user.name}!</p>
        <p>Register your school to get started</p>
        <div>
          <button onClick={() => context.setUser()}>Log Out</button>
        </div>
      </section>
      ) : (
        <section>
        <h2>Sign up your school to get started.</h2>
        <div>
          <button onClick={() => setIsSignUp(true)}>Sign Up</button>
          <button onClick={() => setIsSignUp(false)}>Log In</button>
        </div>


        {isSignUp ? (
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const newUser = await handleSubmit();
              newUser ? users.push(newUser.data) : null;
            }}
          >
            <div className='flex flex-col'>
              <label>First Name</label>
              <input ref={ownerFirstNameRef} type="text" onChange={(e) => setOwnerFirstName(e.target.value)}/>
            </div>
            <div className='flex flex-col'>
              <label>Last Name</label>
              <input ref={ownerLastNameRef} type="text" onChange={(e) => setOwnerLastName(e.target.value)}/>
            </div>
            <button>Save</button>
          </form>
        ) : (
          <ul>
            {users?.map((user, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    console.log(user.first_name)
                    context.setUser({name: user.first_name, id: user.id})
                  }} 
                >{user.first_name} {user.last_name}</button>
              </li>
            ))}
          </ul>
        )}
      </section>
      )}
    </main>
  )
}
