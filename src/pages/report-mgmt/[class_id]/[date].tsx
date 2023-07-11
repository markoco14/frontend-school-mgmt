import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState } from "react";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import Link from "next/link";
import ReportModal from "@/src/modules/report-mgmt/infrastructure/ui/ReportModal";
import { reportAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportAdapter";

async function createReportsForAllStudents(students: Student[]) {
  students.forEach(async (student) => {
    const report = await reportAdapter.createReportForStudent({
      student_id: student.id,
    });
    console.log(report);
  });
}

export const getServerSideProps: GetServerSideProps<{
  report: Report;
}> = async (context) => {
  if (context.query.class_id && context.query.date) {
    const class_id = Number(context.query.class_id);
    const date = context.query.date.toString();

    const report = await reportAdapter.getReportByClassAndDate({
      class_id: class_id,
      date: date,
    });

    return { props: { report } };
  }

  return { props: {} };
};

export default function ReportDate({
  report,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(report);
  const [loading, setLoading] = useState<boolean>(false);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-3xl">Students at school X</h2>
            <Link href="/report-mgmt/">Back</Link>
          </div>
          {report.id ? (
          <p>Reports</p>
          ) : (
          <button
            // disabled
            // onClick={() => createReportsForAllStudents(students)}
            className="bg-blue-300 px-4 py-2 rounded mb-4 disabled:cursor-not-allowed"
          >
            Create Reports for School
          </button>
          )}
          
          <ul className="flex flex-col gap-2">
            {/* {students?.map((student: Student, index: number) => (
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
              
            ))} */}
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
