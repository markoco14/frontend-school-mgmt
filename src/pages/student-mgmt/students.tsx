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
  const { user, selectedSchool } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>();

  useEffect(() => {
    async function getData(id: number) {  
      setLoading(true);
      if (selectedSchool) {
        await studentAdapter.getStudentsBySchool({ id: selectedSchool.id }).then((res) => {
          setFilteredStudents(res);
        });
      }
      setLoading(false);
    }
  
    if (user) {
      try {
        getData(user.user_id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user, selectedSchool]);

  return (
    <Layout>
      <section>
        <SchoolHeader />
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-3xl">Click student to see profile</h2>
          <Link href="/student-mgmt/">Back</Link>
        </div>
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
