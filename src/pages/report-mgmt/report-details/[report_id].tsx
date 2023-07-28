import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { reportDetailAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportDetailAdapter";
import { ReportDetail } from "@/src/modules/report-mgmt/domain/entities/ReportDetail";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import TextareaAutosize from 'react-textarea-autosize';
import AuthContext from "@/src/AuthContext";

export const getServerSideProps: GetServerSideProps<{
  reportDetails: ReportDetail[];
}> = async (context) => {
  const reportDetails = await reportDetailAdapter.getReportDetailsByReportId({
    id: Number(context.query.report_id),
  });

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
    .then(res => toast.success(`${reportDetail.student_info.first_name}'s report updated.`))
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <p className="mb-2">
        {reportDetail.student_info.first_name}{" "}
        {reportDetail.student_info.last_name}
      </p>
      <div className="flex flex-col mb-2">
        <label className="mb-1">Comment</label>
        <TextareaAutosize
          minRows={2}
          className="border brounded shadow-inner p-2"
          defaultValue={`${reportDetail.content}`}
          {...register(`content`, { required: false })}
        />
        {errors.content?.type === "required" && (
          <p role="alert" className="text-red-500 mt-2">
            Content is required
          </p>
        )}
      </div>
      <button className="bg-blue-300 p-1 rounded">Save</button>
    </form>
  );
};

export default function ReportDate({
  reportDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [reportLength, setReportLength] = useState<number>(
    reportDetails.length
    );
    const date = format(new Date(), 'yyyy-MM-dd')
    const { user } = useContext(AuthContext);

  return (
    <Layout>
      <div>
        <section className="pb-[48px] xs:pb-0">
          <div className="flex justify-between items-baseline mb-4">
            <h2 >
              <span className="text-lg text-gray-500">Report Details</span> <br></br> 
              <span className="text-3xl">{date}</span>
            </h2>
            {user?.role === 'OWNER' ? (
              <Link 
                href="/report-mgmt/"
                className='hover:underline hover:underline-offset-2 hover:text-blue-700'
              >
                Reports
              </Link>
            ) : (
              <Link 
                href="/"
                className='hover:underline hover:underline-offset-2 hover:text-blue-700'
              >
                Back
              </Link>
            )}
          </div>
          {reportLength > 0 ? (
            reportDetails.map((reportDetail, index) => (
              <ReportDetailForm key={index} reportDetail={reportDetail} />
            ))
          ) : (
            <p>
              there are no report details ready for the students in the class
            </p>
          )}
        </section>
      </div>
    </Layout>
  );
}
