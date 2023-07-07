import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState } from "react";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import Link from "next/link";
import ReportModal from "@/src/modules/report-mgmt/infrastructure/ui/ReportModal";
import { reportAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportAdapter";

export const getServerSideProps: GetServerSideProps<{
  students: Student[];
}> = async (context) => {
  const id = context?.query?.school_id;
  const students = await studentAdapter.getStudentsBySchoolId({
    id: Number(context.query.school_id),
  });

  return { props: { students } };
};

async function createReportsForAllStudents(students: Student[]) {
  students.forEach(async (student) => {
    const report = await reportAdapter.createReportForStudent({student_id: student.id})
    console.log(report)
  })
  
}
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
						onClick={() => createReportsForAllStudents(students)}
						className="bg-blue-300 px-4 py-2 rounded mb-4"
					>
            Create Reports for School
          </button>
          <ul className="flex flex-col gap-2">
            {students?.map((student: Student, index: number) => (
              <>
                <li
                  key={index}
                >
                  <button 
                    className='bg-gray-300 px-2 py-1 rounded'
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedStudent(student);
                    }}
                  >
                    {student.first_name} {student.last_name}
                  </button>
                </li>
              </>
            ))}
          </ul>
          <ReportModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            student={selectedStudent}			
            setSelectedStudent={setSelectedStudent}			
          />
        </section>
      </div>
    </Layout>
  );
}
