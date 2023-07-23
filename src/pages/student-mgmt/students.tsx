import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { School } from "@/src/modules/school-mgmt/domain/entities/School";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";




export default function ListStudents() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>();
  const [userSchools, setUserSchools] = useState<School[]>();

  useEffect(() => {
    async function getData(id: number) {  
      setLoading(true);
      await schoolAdapter.getSchoolsByOwnerId({ id: id }).then((res) => {
        setUserSchools(res);
      });

      await studentAdapter.getStudentsByOwnerId({ id: id }).then((res) => {
        setFilteredStudents(res);
      });
      setLoading(false);
    }
  
    if (user) {
      try {
        getData(user.user_id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  async function handleChangeSelectedSchool(id: number) {
    if (id === 0 && user) {
      await studentAdapter.getStudentsByOwnerId({ id: user.user_id }).then((res) => {
        setFilteredStudents(res);
      });
      return;
    }

    await studentAdapter.getStudentsBySchoolId({id: id }).then((res) => {
      setFilteredStudents(res);
      return
    });
  }

  return (
    <Layout>
      <section className="bg-white p-4 rounded-lg">
        <SchoolHeader />
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-3xl">Click student to see profile</h2>
          <Link href="/student-mgmt/">Back</Link>
        </div>
        <select
          className="py-2 rounded bg-white shadow"
          onChange={(e) => {
            handleChangeSelectedSchool(Number(e.target.value));
          }}
        >
          <option value="0">All</option>
          {userSchools?.map((school: School, index: number) => (
            <option key={index} value={school.id} className="p-4">
              {school.name}
            </option>
          ))}
        </select>
        <ul>
          {filteredStudents?.map((student: Student, index) => (
            <li key={index} className="flex justify-between gap-4">
              <Link
                href={`/student-mgmt/${student.id}`}
                className="hover:bg-blue-300 p-2 rounded"
              >
                {student.first_name} {student.last_name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
