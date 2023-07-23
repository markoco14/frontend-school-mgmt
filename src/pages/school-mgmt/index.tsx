import AuthContext from "@/src/AuthContext";
import { Level } from "@/src/modules/class-mgmt/domain/entities/Level";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { selectedSchool } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [levelName, setLevelName] = useState<string>('');

  useEffect(() => {
    async function getLevelsBySchoolId(id: number) {
      setLoading(true);
      await classAdapter.getLevelsBySchoolId({id: id}).then((res) => {
        setLevels(res)
        setLoading(false);
      });
      
    }

    if (selectedSchool) {
      try {
        getLevelsBySchoolId(selectedSchool.id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedSchool]);

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Manage all your school information here!</h1>
        {loading ? (
          <p className="flex justify-center bg-white p-4 rounded-lg">
            loading...
          </p>
        ) : (
          <section className="bg-white p-4 rounded-lg">
            <SchoolHeader />
            <article className="grid grid-cols-3">
              <div className="col-span-2">

                <h2 className="text-2xl">Levels</h2>
                <ul>

                  {levels?.map((level, index) => (
                    <li key={index}>
                      <span>{level.name}</span>
                      <button onClick={async() => {
                        await classAdapter.deleteLevel({id: level.id}).then((res) => console.log(res))
                      }}>delete</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1">
              <h2 className="text-2xl">Add new level</h2>
              <form 
              onSubmit={async (e) => {
                e.preventDefault();
                await classAdapter.addLevel({name: levelName, school: selectedSchool.id})
              }}>
                <div className="flex flex-col">

                  <label>Level Name</label>
                  <input 
                    className="shadow p-2"
                  type="text" onChange={(e) => setLevelName(e.target.value)}/>
                </div>
                <button>Submit</button>
              </form>
              </div>
              
            </article>
          </section>
        )}
      </div>
    </Layout>
  );
}
