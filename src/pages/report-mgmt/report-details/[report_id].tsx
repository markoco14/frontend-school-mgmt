import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { reportDetailAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportDetailAdapter";
import { ReportDetail } from "@/src/modules/report-mgmt/domain/entities/ReportDetail";
import { SubmitHandler, useForm } from "react-hook-form";

export const getServerSideProps: GetServerSideProps<{
  reportDetails: ReportDetail[];
}> = async (context) => {
  const reportDetails = await reportDetailAdapter.getReportDetailsByReportId({
    id: Number(context.query.report_id),
  });
  console.log(context);

  return { props: { reportDetails } };
};

type Inputs = {
  content: string;
};

const ReportDetailForm = ({ reportDetail }: { reportDetail: ReportDetail }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await reportDetailAdapter
      .updateReportDetailById({ id: reportDetail.id, content: data.content })
      .then((res) => console.log(res));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <p>
        {reportDetail.student_id.first_name} {reportDetail.student_id.last_name}
      </p>
      <div className="flex flex-col">
        <label>Content</label>
        <input
          type="text"
          defaultValue={`${reportDetail.content}`}
          {...register(`content`, { required: true })}
        />
        {errors.content?.type === "required" && (
          <p role="alert" className="text-red-500 mt-2">
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
        </section>
      </div>
    </Layout>
  );
}
