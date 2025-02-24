import { AuthUser } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import { schoolAdapter } from "@/src/modules/schools/adapters/schoolAdapter";
import { School } from "@/src/modules/schools/entities/School";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListContainer from "../../modules/core/components/ListContainer";
import { NextPageWithLayout } from "../_app";

type SchoolPageProps = {
  user: AuthUser | null
}

const SchoolsPage: NextPageWithLayout<SchoolPageProps> = ({ user }) => {
  const [schools, setSchools] = useState<School[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      if (user) {
        setLoading(true)
        try {
          await schoolAdapter.listUserSchools().then((res) => {
            setSchools(res);
          });
        } catch (error) {
          // @ts-ignore
          toast.error(error.message);
        } finally {
          setLoading(false)
        }
      }
    }

    getData();
  }, [user]);

  return (
    <Layout>
      <AdminLayout>
        <div className="max-w-[800px] grid gap-4 rounded-lg sm:border sm:p-4 sm:shadow">
          <div className="flex items-baseline justify-between">
            <p className="text-xl">Your schools</p>
            {user?.membership === "OWNER" && (
              <Link
                href="/schools/new"
                className="underline underline-offset-2 hover:text-blue-700"
              >
                New School
              </Link>
            )}
          </div>
          {loading ? (
            <ul className="flex flex-col divide-y divide-white">
              <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
              <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
              <li className="bg-gray-300 animate-pulse h-[40px] rounded"></li>
            </ul>
          ) : schools && schools.length === 0 ? (
            <p>No schools shared with you.</p>
          ) : (
            <ListContainer>
              {schools?.map((school: School, index: number) => (
                <li key={index} className="rounded p-2 hover:bg-blue-300">
                  <Link href={`/schools/${school.slug}`}>{school.name}</Link>
                </li>
              ))}
            </ListContainer>
          )}
        </div>
      </AdminLayout>
    </Layout>
  );
};

SchoolsPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SchoolsPage;
