import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { School } from "@/src/modules/school-mgmt/domain/entities/School";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
	className: string;
	schoolId: number;
}

export default function AddClass() {  
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [userSchools, setUserSchools] = useState<School[]>([]);
	const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log('submitting data:', data)
    try {
      const newClass: Class = await classAdapter.addClass({
        className: data.className,
        schoolId: Number(data.schoolId)
      });
      toast.success('New class added.');
      reset();
    } catch (error) {
      console.error(error)
    }
  };

	useEffect(() => {
    async function getSchoolsByOwnerId(id: number) {
      setLoading(true);
      await schoolAdapter.getSchoolsByOwnerId({ id: id }).then((res) => {
        setUserSchools(res);
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
        <h1 className="mb-4 p-4">Create classes here</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className='text-3xl'>Add Class</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
					<form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-4">
              <label className='mb-2'>School</label>
              <select
                className="py-2 rounded bg-white shadow"
                {...register("schoolId", { required: true })}
              >
                <option value="">Choose a school</option>
                {userSchools?.map((school: School, index: number) => (
                  <option key={index} value={school.id} className="p-4">
                    {school.name}
                  </option>
                ))}
              </select>
              {errors.schoolId?.type === "required" && (
                <p 
                  role="alert"
                  className='text-red-500 mt-2'
                >
                  School is required
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className='mb-2'>
								Class Name
							</label>
              <input
                className="px-1 py-2 rounded shadow"
                type="text"
                {...register("className", { required: true, minLength: 2, maxLength: 50 })}
              />
              {errors.className?.type === "required" && (
                <p 
                  role="alert"
                  className='text-red-500 mt-2'
                >
                  Class name is required
                </p>
              )}
            </div>
            <button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
              Add
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}