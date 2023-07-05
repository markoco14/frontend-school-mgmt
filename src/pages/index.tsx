import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "../context";
import { userAdapter } from "../modules/user-mgmt/infrastructure/adapters/userAdapter";
import { User } from "../modules/user-mgmt/domain/entities/User";
import { useRouter } from "next/router";
import Layout from "../modules/core/infrastructure/ui/components/Layout";

export const getServerSideProps: GetServerSideProps<{
  users: User[];
}> = async () => {
  const users = await userAdapter.getUsers();

  return { props: { users } };
};

export default function Home({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log('logging users', users)

  const context = useContext(UserContext);
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [ownerFirstName, setOwnerFirstName] = useState<string>("");
  const [ownerLastName, setOwnerLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const ownerFirstNameRef = useRef<HTMLInputElement>(null);
  const ownerLastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!ownerFirstName || !ownerLastName || !email) {
      alert("You need to choose your full name");
      return;
    }
    setOwnerFirstName("");
    ownerFirstNameRef.current ? (ownerFirstNameRef.current.value = "") : null;
    setOwnerLastName("");
    ownerLastNameRef.current ? (ownerLastNameRef.current.value = "") : null;
    setEmail("");
    emailRef.current ? (emailRef.current.value = "") : null;

    const newUser: User = await userAdapter.addUser({
      firstName: ownerFirstName,
      lastName: ownerLastName,
      email: email,
      password: 'password123'
    });
    alert("User saved successfully");

    return newUser;
  }

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Easy Cram School Management In The Cloud.</h1>
        {context.user ? (
          <section className="bg-white p-4 rounded-lg">
            <h2 className="text-3xl mb-4">Welcome back, {context.user.name}!</h2>
            <p className='mb-4'><strong>Managing</strong> your school and student <strong>data</strong> has never been <strong>easier</strong>.</p>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/school-mgmt/" 
                className='col-span-1 flex justify-center hover:bg-blue-300 p-4 rounded'
              >
                  Schools
                </Link>
              <Link 
                href="/student-mgmt/" 
                className='col-span-1 flex justify-center hover:bg-blue-300 p-4 rounded'
              >
                  Students
                </Link>
            </div>
          </section>
        ) : (
          <section className="bg-white p-4 rounded-lg">
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setIsSignUp(true)}
                className={`${
                  isSignUp
                    ? "underline decoration-4 decoration-blue-500 underline-offset-[6px]"
                    : null
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsSignUp(false)}
                className={`${
                  !isSignUp
                    ? "underline decoration-4 decoration-blue-500 underline-offset-[6px]"
                    : null
                }`}
              >
                Log In
              </button>
            </div>

            {isSignUp ? (
              <>
                <h2 className="mb-4">Sign up to get started.</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const newUser = await handleSubmit();
                    newUser ? users.push(newUser) : null;
                  }}
                >
                  <div className="flex flex-col mb-4">
                      <label className="mb-2">First Name</label>
                    <input
                      ref={ownerFirstNameRef}
                      type="text"
                      name="firstName"
                      onChange={(e) => setOwnerFirstName(e.target.value)}
                      className="shadow-md border p-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="mb-2">Last Name</label>
                    <input
                      ref={ownerLastNameRef}
                      type="text"
                      name="lastName"
                      onChange={(e) => setOwnerLastName(e.target.value)}
                      className="shadow-md border p-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="mb-2">Email</label>
                    <input
                      ref={emailRef}
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow-md border p-2 rounded"
                    />
                  </div>
                  <button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
                    Save
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="mb-4">Log In to manage your schools.</h2>
                <ul className="flex flex-col gap-2">
                  {users?.map((user, index) => (
                    <li 
                      key={index}
                      className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
                    >
                      <button
                        onClick={() => {
                          context.setUser({
                            name: user.first_name,
                            email: user.email,
                            id: user.id,
                          });
                        }}
                      >
                        {user.first_name} {user.last_name}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}
      </div>
    </Layout>
  );
}
