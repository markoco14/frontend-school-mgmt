import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { reportDetailAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportDetailAdapter";
import { ReportDetail } from "@/src/modules/report-mgmt/domain/entities/ReportDetail";
import { report } from "process";


// @ts-ignore
export const getServerSideProps: GetServerSideProps<{
  reportDetails: ReportDetail[];
}> = async (context) => {
  const reportDetails = await reportDetailAdapter.getReportDetailsByReportId({id: Number(context.query.report_id)})
  console.log(context)

return { props: {reportDetails} };
};

export default function ReportDate({
  reportDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
 
  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-3xl">Report Details for Today</h2>
            <Link href="/report-mgmt/">Back</Link>
          </div>
          {reportDetails ? (
            reportDetails.map((reportDetail, index) => (
              <article key={index} className="mb-2">
                <p>{reportDetail.student_id.first_name} {reportDetail.student_id.last_name}</p>
                <div className="flex flex-col">
                  <label>Comment</label>
                  <textarea className='rounded shadow p-2' defaultValue={reportDetail.content}/>
                </div>
                <p>{reportDetail.is_complete ? "Complete" : "Incomplete"}</p>
              </article>
            ))
          ) : (
            <p>There are no report details for this report. You may need to register your students first.</p>
          )}
        </section>
      </div>
    </Layout>
  );
}
