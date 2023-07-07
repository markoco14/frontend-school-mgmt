import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState } from "react";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import Link from "next/link";
import ReportModal from "@/src/modules/report-mgmt/infrastructure/ui/ReportModal";

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async (context) => {
  const id = context?.query?.school_id;
  const students = await studentAdapter.getStudentsBySchoolId({
    id: Number(context.query.school_id),
  });

  return { props: { students } };
};

export default function ReportsHome({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState<boolean>(false);
  let [isOpen, setIsOpen] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-3xl">Students at school X</h2>
            <Link href="/report-mgmt/">Back</Link>
          </div>
					<button 
						onClick={() => console.log('creating reports')}
						className="bg-blue-300 px-4 py-2 rounded mb-4"
					>Create Reports for Class</button>
          <ul>
            {students?.map((student: Student, index: number) => (
              <>
                <li
                  key={index}
                  onClick={() => {
                    setIsOpen(true);
										setSelectedStudent(student);
                  }}
                >
                  {student.first_name} {student.last_name}
                </li>
              </>
            ))}
          </ul>
          <ReportModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
						student={selectedStudent}						
          />
        </section>
      </div>
    </Layout>
  );
}
