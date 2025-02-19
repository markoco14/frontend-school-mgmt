import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import Layout from "@/src/modules/core/components/Layout";
import { schoolAdapter } from "@/src/modules/school-mgmt/adapters/schoolAdapter";
import { School } from "@/src/modules/school-mgmt/entities/School";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NextPageWithLayout } from "../_app";
import ListContainer from "../../modules/core/components/ListContainer";




const SchoolsPage: NextPageWithLayout = () => {
  const { user } = useUserContext();
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
          <p>Please <Link href="/login">Sign In</Link> to see this page.</p>
        </GuestLayout>
      )}

      {user && (
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
                        <Link href={`/schools/${school.slug}`}>{school.name}</Link>
                      </li>
                    ))
                  )}
                </ListContainer>
              </article>
            </div>
          </AdminLayout>
        </Layout>
      )}
    </>
  );
};

SchoolsPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SchoolsPage;
