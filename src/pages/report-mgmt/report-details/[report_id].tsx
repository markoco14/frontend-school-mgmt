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
 
  async function updateReportDetailById(reportDetail: ReportDetail) {

    const isComplete = reportDetail.is_complete ? 1 : 0;
    const data = {
      id: reportDetail.id,
      content: reportDetail.content,
      is_complete: isComplete,
    }
    console.log('logging report object:', reportDetail)
    console.log('logging data to send:', data)
    await reportDetailAdapter.updateReportDetailById({id: reportDetail.id, content: reportDetail.content, is_complete: isComplete})
    .then((res) => {
      console.log(res)
    });
  }

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
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log('submitting form')
                  console.log('report detail for selected form', reportDetail)
                }}>
                  <div className="flex flex-col">
                    <label>Comment</label>
                    <textarea name={`content-${reportDetail.id}`} className='rounded shadow p-2' defaultValue={reportDetail.content}/>
                  </div>
                  <button>Save</button>
                </form>
                {/* <button
                  onClick={() => updateReportDetailById(reportDetail)}
                >Save</button> */}
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
