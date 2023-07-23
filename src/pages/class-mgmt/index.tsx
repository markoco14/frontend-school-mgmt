import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function ClassHome() {
  const { selectedSchool } = useContext(AuthContext);
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    async function getData() {
      if (selectedSchool) {
        await classAdapter.getClassesBySchoolId({id: selectedSchool.id}).then((res) => {
          setClasses(res);
        });
      }
    }

    getData();
  }, [selectedSchool])

  if (!selectedSchool) {
    return (
      <Layout>
        <div>
          <section className="bg-white p-4 rounded-lg">
            <SchoolHeader />
            <div className="flex justify-between items-baseline mb-4">
              <Link href='/'>Click here to choose a school</Link>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <section className="bg-white p-4 rounded-lg">
          <SchoolHeader />
          <div className="flex justify-between items-baseline mb-4">
            <h2 className='text-3xl'>Class time!</h2>
            <Link href="class-mgmt/add">Add</Link>
          </div>
          <ul className="flex flex-col gap-2">
            {classes?.map((currentClass: Class, index: number) => (
              <li 
                key={index}
                className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
              >
                <Link href={`/class-mgmt/${currentClass.id}`}>{currentClass.name}</Link>
                </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
