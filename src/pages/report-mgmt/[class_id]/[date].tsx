import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState } from "react";
import Link from "next/link";
import { reportAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportAdapter";

async function createReportsForAllStudents() {
  console.log('making reports');
  return
  // students.forEach(async (student) => {
  //   const report = await reportAdapter.createReportForStudent({
  //     student_id: student.id,
  //   });
  //   console.log(report);
  // });
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
 
  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-3xl">Class Report for Today</h2>
            <Link href="/report-mgmt/">Back</Link>
          </div>
          {report?.id ? (
          <p>Reports</p>
          ) : (
          <button
            // disabled
            onClick={() => createReportsForAllStudents()}
            className="bg-blue-300 px-4 py-2 rounded mb-4 disabled:cursor-not-allowed"
          >
            Create Reports for School
          </button>
          )}
        </section>
      </div>
    </Layout>
  );
}
