import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { reportDetailAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportDetailAdapter";
import { ReportDetail } from "@/src/modules/report-mgmt/domain/entities/ReportDetail";
import { SubmitHandler, useForm } from 'react-hook-form';


// @ts-ignore
export const getServerSideProps: GetServerSideProps<{
  reportDetails: ReportDetail[];
}> = async (context) => {
  const reportDetails = await reportDetailAdapter.getReportDetailsByReportId({id: Number(context.query.report_id)})
  console.log(context)

return { props: {reportDetails} };
};

type Inputs = {
  content: string;
}

const ReportDetailForm = ({ reportDetail }: {reportDetail: ReportDetail}) => {
  const { register, handleSubmit, control, formState: { errors }, } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('submitting')
    // console.log(data); // Handle form submission here
    console.log('report content:', data.content); // Handle form submission here
    console.log('report id:', reportDetail.id)
    console.log('report student id:', reportDetail.student_id.id)
    // updateReportDetailById
    await reportDetailAdapter.updateReportDetailById({id: reportDetail.id, content: data.content, report_id: reportDetail.report_id, student_id: reportDetail.student_id.id})
  };

  async function updateReportDetailById(reportDetail: ReportDetail) {

    const data = {
      id: reportDetail.id,
      content: reportDetail.content,
    }
    console.log('logging report object:', reportDetail)
    console.log('logging data to send:', data)
    // await reportDetailAdapter.updateReportDetailById({id: reportDetail.id, content: reportDetail.content})
    // .then((res) => {
    //   console.log(res)
    // });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <p>{reportDetail.student_id.first_name} {reportDetail.student_id.last_name}</p>
      <div className="flex flex-col">
        <label>Content</label>
        <input
          type="text"
          // name={`reportDetails[${index}].content`}
          // ref={control}
          {...register(`content`, { required: true })}
        />
        {errors.content?.type === "required" && (
            <p 
              role="alert"
              className='text-red-500 mt-2'
            >
              Content is required
            </p>
          )}
      </div>
      <button>Save</button>
    </form>
  );
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
          {reportDetails?.map((reportDetail, index) => (
            <ReportDetailForm key={index} reportDetail={reportDetail} />
          ))}
          {/* {reportDetails ? (
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
                <button
                  onClick={() => updateReportDetailById(reportDetail)}
                >Save</button>
              </article>
            ))
          ) : (
            <p>There are no report details for this report. You may need to register your students first.</p>
          )} */}
        </section>
      </div>
    </Layout>
  );
}
