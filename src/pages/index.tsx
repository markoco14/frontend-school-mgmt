import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import Layout from "@/src/modules/core/components/Layout";
import { schoolAdapter } from "@/src/modules/school-mgmt/adapters/schoolAdapter";
import { School } from "@/src/modules/school-mgmt/entities/School";
import LandingPage from "@/src/modules/public/LandingPage";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NextPageWithLayout } from "./_app";
import ListContainer from "../modules/core/components/ListContainer";
import CardContainer from "../modules/core/components/CardContainer";
import { Test } from "../modules/tests/entities/Test";

const testsToday: Test[] = [
  {
    id: 1,
    name: "Level 7 Unit 1 Test 1",
    teacher: "Mark",
  },
  {
    id: 2,
    name: "Level 10 Unit 4 Test 2",
    maxCorrections: 3,
    allowNoCorrections: true,
    teacher: "Pei",
  },
];




const Home: NextPageWithLayout = () => {
  const { user, selectedSchool, handleSelectSchool } = useUserContext();
  const [schools, setSchools] = useState<School[]>([]);
  const date = new Date();

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
        <GuestLayout>
          <LandingPage />
        </GuestLayout>
      )}

      {user && !selectedSchool && (
        <Layout>
          <AdminLayout>
            <div className="max-w-[800px]">
              <h2 className="mb-4 text-3xl">Welcome back, {user?.name}!</h2>
              <article className="grid gap-4 rounded-lg border p-4 shadow">
                <div className="flex items-baseline justify-between">
                  <p className="text-xl">Your schools</p>
                  {user.membership === "OWNER" && (
                      <Link
                        href="/schools/new"
                        className="underline underline-offset-2 hover:text-blue-700"
                      >
                        New School
                      </Link>
                    )}
                </div>
                <ListContainer>
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
                </ListContainer>
              </article>
            </div>
          </AdminLayout>
        </Layout>
      )}

      {user && selectedSchool && (
        <Layout>
          <AdminLayout>
            <div className="mb-8">
              <h1 className="mb-1 text-3xl text-gray-700">
                Today&apos;s Activities
              </h1>
              <p>
                See everything that&apos;s happening on {date.toDateString()}
              </p>
            </div>
            <CardContainer>
              <div className="mb-4 flex items-baseline justify-between gap-16 p-2">
                <h2 className="text-xl">Tests</h2>
                <Link href="/tests" className="text-gray-500">
                  See all tests
                </Link>
              </div>
              <ListContainer>
                {testsToday.map((test) => (
                  <li
                    key={`test-${test.id}`}
                    className="grid p-2 hover:bg-blue-300 sm:grid-cols-4"
                  >
                    <p className="font-bold">{test.name}</p>
                    <p>Teacher {test.teacher}</p>
                    <Link
                      href={`/tests/do-test/${test.id}`}
                      className="underline underline-offset-2"
                    >
                      Do Test
                    </Link>
                    <Link
                      href={`/tests/review-test/${test.id}`}
                      className="underline underline-offset-2"
                    >
                      Review Test
                    </Link>
                  </li>
                ))}
              </ListContainer>
            </CardContainer>
          </AdminLayout>
        </Layout>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
