import { useUserContext } from "@/src/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import Layout from "@/src/modules/core/components/Layout";
import SchoolHeader from "@/src/modules/core/components/SchoolHeader";
import { School } from "@/src/modules/school-mgmt/entities/School";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import LandingPage from "@/src/modules/website/LandingPage";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { user, selectedSchool, handleSelectSchool } = useUserContext();
  const [schools, setSchools] = useState<School[]>([]);
  
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
            </div>
          </AdminLayout>
        </Layout>
      )}

      {user && selectedSchool && (
        <Layout>
          <AdminLayout>
            <SchoolHeader />
            <p>Tests will go here</p>
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
