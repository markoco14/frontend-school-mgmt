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
import { ReportList } from "../modules/report-mgmt/infrastructure/ui/components/ReportList";

export default function Home() {

  const { user, selectedSchool, handleSelectSchool } = useContext(AuthContext);
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
      
        {!user && (
          <section>
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
          <section>
            <h2 className="text-3xl mb-4">Welcome back!</h2>
            <p className='mb-4'><strong>Managing</strong> your school and student <strong>data</strong> has never been <strong>easier</strong>.</p>
            <ul className="flex flex-col gap-2 mb-4">
              {schools?.map((school: School, index: number) => (
                <li 
                  key={index}
                  className="p-2 rounded hover:bg-blue-300"
                >
                  <button 
                  onClick={() => {
                  if (!selectedSchool) {
                    handleSelectSchool(school);
                  }
                }}>{school.name}</button></li>
              ))}
            </ul>
            <Link href="/school-mgmt/add" className="bg-blue-300 rounded-lg p-2 hover:bg-blue-500">Add School</Link>
          </section>
        )}

        {user && selectedSchool && (
          <section>
            <SchoolHeader />
            <ReportList />
          </section>
        )}
      
    </Layout>
  );
}
