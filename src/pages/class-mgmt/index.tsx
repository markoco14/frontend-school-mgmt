import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
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
          <h2>Class time!</h2>
          <ul>
            {classes?.map((classes: Class, index: number) => (
              <li key={index}>{classes.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
