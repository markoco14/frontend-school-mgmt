import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { ReportDetail } from "@/src/modules/reports/domain/entities/ReportDetail";
import { reportDetailAdapter } from "@/src/modules/reports/infrastructure/adapters/reportDetailAdapter";
import { format } from "date-fns";
import debounce from 'lodash.debounce';
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from 'react-textarea-autosize';

export const getServerSideProps: GetServerSideProps<{
  reportDetails: ReportDetail[];
}> = async (context) => {
  const reportDetails = await reportDetailAdapter.getReportDetailsByReportId({
    id: Number(context.query.report_id),
  });

  return { props: { reportDetails } };
};

type Inputs = {
  testScore: number;
  newHmwkCorrections: number;
  comment: string;
  prevHmwkComplete: number;
};

const ReportDetailForm = ({ reportDetail }: { reportDetail: ReportDetail }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      testScore: reportDetail.details.testScore || 0,
      newHmwkCorrections: reportDetail.details.newHmwkCorrections || 0,
      prevHmwkComplete: reportDetail.details.prevHmwkComplete,
      comment: reportDetail.details.comment || ''
    }
  });

  const watchedTestScore = watch('testScore')
  const watchedNewHmwkCorrections = watch('newHmwkCorrections')
  const watchedComment = watch('comment')
  const watchedPrevHmwkComplete = watch('prevHmwkComplete')
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await reportDetailAdapter
    .updateReportDetailById({ id: reportDetail.id, data: data })
    .then(res => toast.success(`${reportDetail.student_info.first_name}'s report updated.`))
  };
  
  useEffect(() => {
    const autoSave = debounce(async () => {
      const formData = {
        testScore: watchedTestScore,
        newHmwkCorrections: watchedNewHmwkCorrections,
        // because watch() turns value into string
        // so we need to convert back to number value in the debounce auto save function
        prevHmwkComplete: Number(watchedPrevHmwkComplete),
        comment: watchedComment,
      };
      await reportDetailAdapter.updateReportDetailById({ 
        id: reportDetail.id, 
        data: formData 
      })
      .then(res => toast.success(`${reportDetail.student_info.first_name}'s report auto-saved.`))
    }, 1500); // 1500ms (1.5 seconds) debounce
    
    autoSave();
    // Cleanup on component unmount to cancel any pending debounced calls
    return () => {
      autoSave.cancel();
    };
  }, [watchedTestScore, watchedComment, watchedNewHmwkCorrections, watchedPrevHmwkComplete, reportDetail]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <p className="mb-2">
        {reportDetail.student_info.first_name}{" "}
        {reportDetail.student_info.last_name}
      </p>
      <div className="flex flex-col mb-2">
        <label className="mb-1">Test Score</label>
        <input 
        type="number" 
        className="border brounded shadow-inner p-2"
        {...register(`testScore`, { required: false, max: 8, min: 0, valueAsNumber: true })}
        />
        {errors.testScore?.type === "min" && (
          <p role="alert" className="text-red-500 mt-2">
            Min Value is 0
          </p>
        )}
        {errors.testScore?.type === "max" && (
          <p role="alert" className="text-red-500 mt-2">
            Max Value is 8
          </p>
        )}
      </div>
      <div className="flex flex-col mb-2">
        <label className="mb-1">Corrections for next week</label>
        <input 
        type="number" 
        className="border brounded shadow-inner p-2"
        {...register(`newHmwkCorrections`, { required: false, min: 0, valueAsNumber: true })}
        />
        {errors.newHmwkCorrections?.type === "min" && (
          <p role="alert" className="text-red-500 mt-2">
            Min Value is 0
          </p>
        )}
      </div>
      <div className="grid grid-cols-2">

        <div className="flex flex-col mb-2">
          <label className="mb-1">No</label>
          <input 
          value={0}
          type="radio"
          defaultChecked={reportDetail.details.prevHmwkComplete === 0 || !reportDetail.details.prevHmwkComplete}
          className="border brounded shadow-inner p-2"
          {...register(`prevHmwkComplete`, { required: false, valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mb-1">Yes</label>
          <input 
          value={1}
          type="radio"
          defaultChecked={reportDetail.details.prevHmwkComplete === 1}
          className="border brounded shadow-inner p-2"
          {...register(`prevHmwkComplete`, { required: false, valueAsNumber: true })}
          />
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label className="mb-1">Comment</label>
        <TextareaAutosize
          minRows={2}
          className="border brounded shadow-inner p-2"
          {...register(`comment`, { required: false })}
        />
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
    // const date = format(new Date(), 'yyyy-MM-dd')
    const { user } = useContext(AuthContext);

  return (
    <Layout>
      <div>
        <section className="pb-[48px] xs:pb-0">
          <div className="flex justify-between items-baseline mb-4">
            <h2 >
              <span className="text-lg text-gray-500">Report Details</span> <br></br> 
              {/* <span className="text-3xl">{date}</span> */}
            </h2>
            {user?.role === 'OWNER' ? (
              <Link 
                href="/reports/"
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
