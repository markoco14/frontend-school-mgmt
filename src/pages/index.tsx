import { useUserContext } from "@/src/UserContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { TodayClassList } from "@/src/modules/reports/infrastructure/ui/components/TodayClassList";
import { School } from "@/src/modules/school-mgmt/domain/entities/School";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import Login from "@/src/modules/user-mgmt/infrastructure/ui/Login";
import Signup from "@/src/modules/user-mgmt/infrastructure/ui/Signup";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../modules/core/infrastructure/ui/components/AdminLayout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { user, selectedSchool, handleSelectSchool } = useUserContext();
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [schools, setSchools] = useState<School[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getData() {
      if (user) {
        try {
          await schoolAdapter.listUserSchools().then((res) => {
            setSchools(res);
          });
        } catch (error) {
          // @ts-ignore
          toast.error(error.message);
        }
      }
    }

    getData();
  }, [user]);

  return (
    <>
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
      <AdminLayout>
        <div>
          {user && !selectedSchool && (
            <section>
              <h2 className="mb-4 text-3xl">Welcome back, {user?.name}!</h2>
              <article className="grid gap-4 rounded-lg border p-4 shadow xs:w-1/2">
                <div className="flex items-baseline justify-between">
                  <p className="text-xl">Your schools</p>
                  {user.permissions.includes(1) ||
                    (user.role === "OWNER" && (
                      <Link
                        href="/school-mgmt/add"
                        className="underline underline-offset-2 hover:text-blue-700"
                      >
                        New School
                      </Link>
                    ))}
                </div>
                <ul className="divide-y">
                  {schools.length === 0 ? (
                    <p>No schools shared with you.</p>
                  ) : (
                    schools?.map((school: School, index: number) => (
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
                    ))
                  )}
                </ul>
              </article>
            </section>
          )}

          {user && selectedSchool && (
            <section>
              <SchoolHeader />
              {/* <div className="mb-4 grid text-3xl sm:grid-cols-4">
                  <Link href="reports/sample1/">Sample 1</Link>
                  <Link href="reports/sample2/">Sample 2</Link>
                  <Link href="reports/sample3/">Sample 3</Link>
                  <Link href="reports/sample4/">Sample 4</Link>
                </div> */}
              <TodayClassList />
            </section>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
