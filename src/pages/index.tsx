import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context";
import { userAdapter } from "../modules/user-mgmt/infrastructure/adapters/userAdapter";
import { User } from "../modules/user-mgmt/domain/entities/User";
import { useRouter } from "next/router";
import Layout from "../modules/core/infrastructure/ui/components/Layout";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Login from "../modules/user-mgmt/infrastructure/ui/Login";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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

  const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const user: User = await userAdapter.addUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      });
      toast.success('User added.');
      reset();
      console.log(user)
      users.push(user)
    } catch (error) {
      console.error(error)
    }
  };

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
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col mb-4">
                      <label className="mb-2">First Name</label>
                    <input
                      type="text"
                      {...register("firstName", { required: true, minLength: 2, maxLength: 50 })}
                      className="shadow-md border p-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="mb-2">Last Name</label>
                    <input
                      type="text"
                      {...register("lastName", { required: true, minLength: 2, maxLength: 50 })}
                      className="shadow-md border p-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="mb-2">Email</label>
                    <input
                      type="email"
                      {...register("email", { required: true, minLength: 3, maxLength: 50 })}
                      className="shadow-md border p-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="mb-2">Password</label>
                    <input
                      type="password"
                      {...register("password", { required: true, minLength: 2, maxLength: 50 })}
                      className="shadow-md border p-2 rounded"
                    />
                  </div>
                  <button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
                    Save
                  </button>
                </form>
              </>
            ) : (
              <Login />
            )}
          </section>
        )}
      </div>
    </Layout>
  );
}
