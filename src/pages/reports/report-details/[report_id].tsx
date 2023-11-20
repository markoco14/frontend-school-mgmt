import { useUserContext } from "@/src/UserContext";
import Layout from "@/src/modules/core/components/Layout";
import { ReportDetail } from "@/src/modules/reports/domain/entities/ReportDetail";
import { reportDetailAdapter } from "@/src/modules/reports/infrastructure/adapters/reportDetailAdapter";
import debounce from "lodash.debounce";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

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
      comment: reportDetail.details.comment || "",
    },
  });

  const watchedTestScore = watch("testScore");
  const watchedNewHmwkCorrections = watch("newHmwkCorrections");
  const watchedComment = watch("comment");
  const watchedPrevHmwkComplete = watch("prevHmwkComplete");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await reportDetailAdapter
      .updateReportDetailById({ id: reportDetail.id, data: data })
      .then((res) =>
        toast.success(
          `${reportDetail.student_info.first_name}'s report updated.`,
        ),
      );
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
      await reportDetailAdapter
        .updateReportDetailById({
          id: reportDetail.id,
          data: formData,
        })
        .then((res) =>
          toast.success(
            `${reportDetail.student_info.first_name}'s report auto-saved.`,
          ),
        );
    }, 1500); // 1500ms (1.5 seconds) debounce

    autoSave();
    // Cleanup on component unmount to cancel any pending debounced calls
    return () => {
      autoSave.cancel();
    };
  }, [
    watchedTestScore,
    watchedComment,
    watchedNewHmwkCorrections,
    watchedPrevHmwkComplete,
    reportDetail,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <p className="mb-2">
        {reportDetail.student_info.first_name}{" "}
        {reportDetail.student_info.last_name}
      </p>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Test Score</label>
        <input
          type="number"
          className="brounded border p-2 shadow-inner"
          {...register(`testScore`, {
            required: false,
            max: 8,
            min: 0,
            valueAsNumber: true,
          })}
        />
        {errors.testScore?.type === "min" && (
          <p role="alert" className="mt-2 text-red-500">
            Min Value is 0
          </p>
        )}
        {errors.testScore?.type === "max" && (
          <p role="alert" className="mt-2 text-red-500">
            Max Value is 8
          </p>
        )}
      </div>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Corrections for next week</label>
        <input
          type="number"
          className="brounded border p-2 shadow-inner"
          {...register(`newHmwkCorrections`, {
            required: false,
            min: 0,
            valueAsNumber: true,
          })}
        />
        {errors.newHmwkCorrections?.type === "min" && (
          <p role="alert" className="mt-2 text-red-500">
            Min Value is 0
          </p>
        )}
      </div>
      <div className="grid grid-cols-2">
        <div className="mb-2 flex flex-col">
          <label className="mb-1">No</label>
          <input
            value={0}
            type="radio"
            defaultChecked={
              reportDetail.details.prevHmwkComplete === 0 ||
              !reportDetail.details.prevHmwkComplete
            }
            className="brounded border p-2 shadow-inner"
            {...register(`prevHmwkComplete`, {
              required: false,
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label className="mb-1">Yes</label>
          <input
            value={1}
            type="radio"
            defaultChecked={reportDetail.details.prevHmwkComplete === 1}
            className="brounded border p-2 shadow-inner"
            {...register(`prevHmwkComplete`, {
              required: false,
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Comment</label>
        <TextareaAutosize
          minRows={2}
          className="brounded border p-2 shadow-inner"
          {...register(`comment`, { required: false })}
        />
      </div>
      <button className="rounded bg-blue-300 p-1">Save</button>
    </form>
  );
};

export default function ReportDate({
  reportDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [reportLength, setReportLength] = useState<number>(
    reportDetails.length,
  );
  // const date = format(new Date(), 'yyyy-MM-dd')
  const { user } = useUserContext();

  return (
    <Layout>
      <div>
        <section className="pb-[48px] xs:pb-0">
          <div className="mb-4 flex items-baseline justify-between">
            <h2>
              <span className="text-lg text-gray-500">Report Details</span>{" "}
              <br></br>
              {/* <span className="text-3xl">{date}</span> */}
            </h2>
            {user?.role === "OWNER" ? (
              <Link
                href="/reports/"
                className="hover:text-blue-700 hover:underline hover:underline-offset-2"
              >
                Reports
              </Link>
            ) : (
              <Link
                href="/"
                className="hover:text-blue-700 hover:underline hover:underline-offset-2"
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
