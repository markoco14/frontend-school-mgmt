import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClassHome() {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    async function getData() {
      await classAdapter.getClasses().then((res) => {
        console.log(res)
        setClasses(res);
      });
    }

    getData();
  }, [])

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Create classes here</h1>
        <section className="bg-white p-4 rounded-lg">
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
