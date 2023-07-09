import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { School } from "@/src/modules/school-mgmt/domain/entities/School";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  firstName: string
  lastName: string
  age: number
  schoolId: number
}

export default function AddStudent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const [userSchools, setUserSchools] = useState<School[]>([]);

  const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const student: Student = await studentAdapter.addStudent({
        firstName: data.firstName,
        lastName: data.lastName,
        age: Number(data.age),
        schoolId: Number(data.schoolId)
      });
      toast.success('Student added.');
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
      <h1 className="mb-4 p-4">Sign up your students and manage their info.</h1>
      <section className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-3xl">Enter your new student information</h2>
          <Link href="/student-mgmt/">Back</Link>
        </div>
        {loading ? (
          <p>loading...</p>
        ) : (
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
              <label className='mb-2'>First Name</label>
              <input
                className="px-1 py-2 rounded shadow"
                type="text"
                {...register("firstName", { required: true, minLength: 2, maxLength: 50 })}
              />
              {errors.firstName?.type === "required" && (
                <p 
                  role="alert"
                  className='text-red-500 mt-2'
                >
                  First name is required
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className='mb-2'>Last Name</label>
              <input
                className="px-1 py-2 rounded shadow"
                type="text"
                {...register("lastName", { required: true, minLength: 1, maxLength: 50 })}
              />
              {errors.lastName?.type === "required" && (
                <p 
                  role="alert"
                  className='text-red-500 mt-2'
                >
                  Last name is required
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className='mb-2'>Age</label>
              <input
                className="px-1 py-2 rounded shadow"
                type="number"
                {...register("age", { required: true, min: 1, max: 100 })}
              />
              {errors.age?.type === "required" && (
                <p 
                  role="alert"
                  className='text-red-500 mt-2'
                >
                  Age is required
                </p>
              )}
            </div>
            <button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
              Add
            </button>
          </form>
        )}
      </section>
    </Layout>
  );
}
