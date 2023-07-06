import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { School } from "@/src/modules/school-mgmt/domain/entities/School";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const [mySchools, setMySchools] = useState<School[]>([]);

  useEffect(() => {
    async function getSchoolsByOwnerId(id: number) {
      setLoading(true);
      await schoolAdapter.getSchoolsByOwnerId({ id: id }).then((res) => {
        setMySchools(res);
        setLoading(false);
      });
    }

    if (user) {
      try {
        getSchoolsByOwnerId(user.user_id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Manage all your schools from here!</h1>
        {loading ? (
          <p className="flex justify-center bg-white p-4 rounded-lg">
            loading...
          </p>
        ) : (
          <section className="bg-white p-4 rounded-lg">
            {mySchools.length > 0 ? (
              <>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="text-3xl">Your schools</h2>
                  <Link href="/school-mgmt/add">+ school</Link>
                </div>
                <ul className="flex flex-col gap-2">
                  {mySchools?.map((school: School, index) => (
                    <li
                      key={index}
                      className="p-2 rounded-md hover:bg-blue-200 hover:cursor-not-allowed flex justify-between"
                    >
                      <span>{school.name}</span>
                      <div className="flex gap-2">
                        {/* TODO: EDIT TRIGGERS MODAL TO UPDATE INFO OR DELETE */}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-3xl">You have no schools.</h2>
                <Link href="/school-mgmt/add">+ school</Link>
              </div>
            )}
          </section>
        )}
      </div>
    </Layout>
  );
}
