import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import Layout from "../modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "../modules/core/infrastructure/ui/components/SchoolHeader";
import { TodayClassList } from "../modules/reports/infrastructure/ui/components/TodayClassList";
import { School } from "../modules/school-mgmt/domain/entities/School";
import { schoolAdapter } from "../modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import Login from "../modules/user-mgmt/infrastructure/ui/Login";
import Signup from "../modules/user-mgmt/infrastructure/ui/Signup";

export default function Home() {
  const { user, selectedSchool, handleSelectSchool } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [schools, setSchools] = useState<School[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getData() {
      if (user) {
        await schoolAdapter
          .listUserSchools({ id: user?.user_id })
          .then((res) => {
            setSchools(res);
          });
      }
    }
    getData();
  }, [user]);

  return (
    <Layout>
      {!user && (
        <section>
          <div className="mb-8 flex gap-4">
            <button
              onClick={() => setIsSignUp(true)}
              className={`${
                isSignUp
                  ? "underline decoration-blue-500 decoration-4 underline-offset-[6px]"
                  : null
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`${
                !isSignUp
                  ? "underline decoration-blue-500 decoration-4 underline-offset-[6px]"
                  : null
              }`}
            >
              Log In
            </button>
          </div>

          {isSignUp ? <Signup /> : <Login />}
        </section>
      )}

      {user && !selectedSchool && (
        <section>
          <h2 className="mb-4 text-3xl">Welcome back, {user?.name}!</h2>
          <article className="w-1/2 border shadow p-4 rounded-lg grid gap-4">
            <div className="flex justify-between items-baseline">
              <p className="text-xl">Your schools</p>
              {user.permissions.includes(1) && (
                <Link
                  href="/school-mgmt/add"
                  className="underline underline-offset-2 hover:text-blue-700"
                >
                  New School
                </Link>
              )}
            </div>
            <ul className="divide-y">
              {schools?.map((school: School, index: number) => (
                <li key={index} className="rounded p-2 hover:bg-blue-300">
                  <button
                    onClick={() => {
                      if (!selectedSchool) {
                        handleSelectSchool(school);
                      }
                    }}
                    className="w-full text-left"
                  >
                    {school.name}
                  </button>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}

      {user && selectedSchool && (
        <section>
          <SchoolHeader />
          <div className="mb-4 grid text-3xl sm:grid-cols-4">
            <Link href="reports/sample1/">Sample 1</Link>
            <Link href="reports/sample2/">Sample 2</Link>
            <Link href="reports/sample3/">Sample 3</Link>
            <Link href="reports/sample4/">Sample 4</Link>
          </div>
          <TodayClassList />
        </section>
      )}
    </Layout>
  );
}
