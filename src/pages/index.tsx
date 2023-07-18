import { useContext, useEffect, useState } from "react";
import Layout from "../modules/core/infrastructure/ui/components/Layout";
import Login from "../modules/user-mgmt/infrastructure/ui/Login";
import Signup from "../modules/user-mgmt/infrastructure/ui/Signup";
import AuthContext from "../AuthContext";
import { schoolAdapter } from "../modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import { School } from "../modules/school-mgmt/domain/entities/School";
import { useRouter } from "next/router";
import SchoolHeader from "../modules/core/infrastructure/ui/components/SchoolHeader";
import Link from "next/link";

export default function Home() {

  const { user, selectedSchool, setSelectedSchool } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [schools, setSchools] = useState<School[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getData() {
      if (user) {
        await schoolAdapter.getSchoolsByOwnerId({id: user?.user_id})
          .then((res) => {
            setSchools(res);
          })
      }
    }
    getData();
  }, [user])

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Easy Cram School Management In The Cloud.</h1>
        {!user && (
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
              <Signup />
            ) : (
              <Login />
            )}
          </section>
        )}

        {user && !selectedSchool && (
          <section className="bg-white p-4 rounded-lg">
            <h2 className="text-3xl mb-4">Welcome back!</h2>
            <p className='mb-4'><strong>Managing</strong> your school and student <strong>data</strong> has never been <strong>easier</strong>.</p>
            <ul>
              {schools?.map((school: School, index: number) => (
                <li key={index}><button onClick={() => {
                  if (!selectedSchool) {
                    setSelectedSchool(school)
                  }
                  if (selectedSchool?.id !== school.id) {
                    setSelectedSchool(school)
                  }
                  // router.push(`/${school.id}`)
                }}>{school.name}</button></li>
              ))}
            </ul>
          </section>
        )}

        {user && selectedSchool && (
          <section className="bg-white p-4 rounded-lg">
          <SchoolHeader />
          <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/student-mgmt/" 
                className='col-span-1 flex justify-center hover:bg-blue-300 p-4 rounded'
              >
                  Students
                </Link>
              <Link 
                href="/class-mgmt/" 
                className='col-span-1 flex justify-center hover:bg-blue-300 p-4 rounded'
              >
                  Classes
                </Link>
              <Link 
                href="/report-mgmt/" 
                className='col-span-1 flex justify-center hover:bg-blue-300 p-4 rounded'
              >
                  Reports
                </Link>
            </div>
        </section>
        )}
      </div>
    </Layout>
  );
}
