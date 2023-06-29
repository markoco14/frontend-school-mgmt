import { UserContext } from "@/src/context";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

type School = {
  name: string;
  owner: number;
  id: number;
};

export default function Home() {
  const context = useContext(UserContext);
  const router = useRouter();
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

    if (context.user?.id) {
      try {
        getSchoolsByOwnerId(context.user?.id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [context]);

  return (
    <main className="min-h-screen max-w-[600px] mx-auto">
      <nav className="h-[48px] flex justify-between items-center px-4">
        <div className="flex gap-2">
          <Link href="/">Home</Link>
          <Link href="/school-mgmt/">Schools</Link>
          <Link href="/student-mgmt/">Students</Link>
        </div>
        <button
          onClick={() => {
            context.setUser();
            router.push("/");
          }}
        >
          Log Out
        </button>
      </nav>
      <div>
        <h1 className="mb-4 p-4">
          Manage all your schools from here!
        </h1>
        {loading ? (
          <p className="flex justify-center bg-white p-4 rounded-lg">
            loading...
          </p>
        ) : (
          <section className="bg-white p-4 rounded-lg">
            {mySchools.length > 0 ? (
              <>
                <div className="flex justify-between items-baseline  mb-4">
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
                        {/* TODO: EDIT TRIGGERS MODEL TO UPDATE INFO OR DELETE */}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p>You have no schools</p>
                <Link href="/school-mgmt/add">Add School</Link>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
