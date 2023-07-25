import AuthContext from "@/src/AuthContext";
import { Level } from "@/src/modules/class-mgmt/domain/entities/Level";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  levelName: string;
}

export default function Home() {
  const { selectedSchool } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await classAdapter.addLevel({name: data.levelName, school: selectedSchool.id}).then((res) => {
        setLevels(prevLevels => [...prevLevels, res])
        toast.success('Level added.');
      });
      reset();
    } catch (error) {
      console.error(error)
    }
  };

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

  async function handleDeleteLevel(levelId: number) {
    await classAdapter.deleteLevel({id: levelId}).then((res) => {
      setLevels(prevLevels => prevLevels.filter((level) => level.id !== levelId))
      toast.success('Level added.');
    })
  }

  return (
    <Layout>
      <div>
        {loading ? (
          <p className="flex justify-center bg-white p-4 rounded-lg">
            loading...
          </p>
        ) : (
          <section>
            <SchoolHeader />
            <article className="relative xs:grid xs:grid-cols-3 xs:gap-6">
              <div className="mb-4 xs:mb-0 xs:col-span-2">
                <h2 className="text-2xl">Levels</h2>
                <ul>
                  {levels?.map((level, index) => (
                    <li 
                      key={index}
                      className='flex justify-between'
                    >
                      <span>{level.name}</span>
                      <button 
                        onClick={async() => {
                          handleDeleteLevel(level.id);
                        }}
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="xs:col-span-1">
                <h2 className="text-2xl">Add new level</h2>
                <form 
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col mb-4">
                    <label>Name</label>
                    <input 
                      className="shadow p-2"
                      type="text" 
                      {...register("levelName", {required: true, minLength: 1, maxLength: 50})}
                    />
                    {errors.levelName?.type === "required" && (
                      <p 
                        role="alert"
                        className='text-red-500 mt-2'
                      >
                        Level name is required
                      </p>
                    )}
                  </div>
                  <button className="bg-blue-300 px-2 py-1 rounded text-blue-900">
                    Submit
                  </button>
                </form>
              </div>
            </article>
          </section>
        )}
      </div>
    </Layout>
  );
}
