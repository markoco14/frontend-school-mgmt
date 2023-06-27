import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { FormEvent, useContext, useRef, useState } from 'react';
import { UserContext } from '../context';
import { userAdapter } from '../modules/user-mgmt/infrastructure/adapters/userAdapter';
import { User } from '../modules/user-mgmt/domain/entities/User';

export const getServerSideProps: GetServerSideProps<{
  users: User[];
}> = async () => {
  const users = await userAdapter.getUsers();

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

    const newUser: User = await userAdapter.addUser({firstName: ownerFirstName, lastName: ownerLastName})
    alert('User saved successfully');

		return newUser;
  }

 

  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        {context.user ? <Link href='/school-mgmt'>Schools</Link> : null}
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
          <h2>Sign up to get started.</h2>
          <div>
            <button onClick={() => setIsSignUp(true)}>Sign Up</button>
            <button onClick={() => setIsSignUp(false)}>Log In</button>
          </div>


          {isSignUp ? (
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const newUser = await handleSubmit();
                newUser ? users.push(newUser) : null;
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
