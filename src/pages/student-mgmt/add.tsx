import { UserContext } from "@/src/context";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { School } from "@/src/modules/school-mgmt/domain/entities/School";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddStudent() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const context = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  const [mySchools, setMySchools] = useState<School[]>([]);
  // TODO: talk to Kos about undefined or null state
  // 0 isn't comparable to empty string as default value
  // would then need to manually check if value is or isn't 0
  const [selectedSchool, setSelectedSchool] =
    useState<number>();

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

  async function handleAddStudent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSchool) {
      toast('You need to choose a school first');
      return;
    }
    if (!firstName || !lastName || !age) {
      toast('You need to fill out all the student information');
      return;
    }
    const student: Student = await studentAdapter.addStudent({
      firstName: firstName,
      lastName: lastName,
      age: age,
      school: selectedSchool
    });

    return student;
  }

  return (
    <Layout>
      <h1 className="mb-4 p-4">Sign up your students and manage their info.</h1>
      <section className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-3xl">Enter your new student information</h2>
          <Link href="/student-mgmt/">Back</Link>
        </div>
        <form onSubmit={(e) => handleAddStudent(e)}>
          {/* SCHOOL SELECTOR COMPONENT */}
          <div className="flex flex-col mb-4">
            <label className='mb-2'>School</label>
            <select
              onChange={(e) => setSelectedSchool(Number(e.target.value))}
              required
              className="py-2 rounded bg-white shadow"
            >
              <option value="">Choose a school</option>
              {mySchools?.map((school: School, index: number) => (
                <option key={index} value={school.id} className="p-4">
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label className='mb-2'>First Name</label>
            <input
              className="px-1 py-2 rounded shadow"
              required
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className='mb-2'>Last Name</label>
            <input
              className="px-1 py-2 rounded shadow"
              required
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className='mb-2'>Age</label>
            <input
              className="px-1 py-2 rounded shadow"
              required
              type="number"
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
            Add
          </button>
        </form>
      </section>
    </Layout>
  );
}
