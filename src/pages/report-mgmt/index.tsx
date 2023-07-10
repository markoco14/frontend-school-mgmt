import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { reportAdapter } from '@/src/modules/report-mgmt/infrastructure/adapters/reportAdapter';
import { Report } from '@/src/modules/report-mgmt/domain/entities/Report';
import { useContext, useEffect, useState } from 'react';
import { studentAdapter } from '@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter';
import AuthContext from '@/src/AuthContext';
import { schoolAdapter } from '@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter';
import { Student } from '@/src/modules/student-mgmt/domain/entities/Student';
import { School } from '@/src/modules/school-mgmt/domain/entities/School';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps<{
  reports: Report[];
}> = async () => {
  const reports = await reportAdapter.getReportsAll();

  return { props: { reports } };
};

export default function ReportsHome({
  reports,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      setLoading(false);
    }

    if (user) {
      try {
        getData(user.user_id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user])

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          <ul>
            {userSchools?.map((school: School, index: number) => (
              <li key={index}>
                <Link href={`/report-mgmt/${school.id}`}>
                  {school.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}
