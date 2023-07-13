import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { reportAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportAdapter";
import { Report } from "@/src/modules/report-mgmt/domain/entities/Report";
import { useEffect, useState } from "react";
import Link from "next/link";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { format } from "date-fns";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{
  reports: Report[];
}> = async () => {
  // TODO: CHANGE THIS TO
  // GET REPORTS AND THEIR ACCOMPANYING CLASS NAMES
  // THIS WAY GET THE REPORT STATUS
  // AND CAN RENDER DIFFERENT BUTTONS
  // BUT ALSO HAVE THE CLASS NAMES
  const reports = await reportAdapter.getReportsAll();

  return { props: { reports } };
};

export default function ReportsHome({
  reports,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [day, setDay] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [dates, setDates] = useState<string[]>([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [classes, setClasses] = useState<Class[]>();
  useEffect(() => {
    async function getData() {
      await classAdapter.getClasses().then((res) => {
        setClasses(res);
        console.log(res);
      });
    }

    if (!day) {
      const date = new Date();
      setDay(dates[date.getDay()]);
      setDate(format(date, "yyyy-MM-dd"));
    }

    getData();
  }, [day, dates]);

  async function checkOrCreateReports(thisClass: Class, date: string) {
    // CHECK IF REPORT EXISTS
    const report = await reportAdapter
      .getReportByClassAndDate({ class_id: thisClass.id, date: date })
      .then((res) => {
        // IF EXISTS, GO THERE
        if (res.id) {
          console.log("report exists, going now");
          console.log(res);
          router.push(`report-mgmt/report-details/${res.id}/`);
        }
        // IF NO REPORTS, CREATE AND GO
        else {
          // return;
          console.log("report does not exist, creating now");
          reportAdapter
            .createReportForClassAndDate({ class_id: thisClass.id, date: date })
            .then((res) => {
              console.log("report created, going now");
              console.log(res);
              // thisClass.class_list.forEach((student, index) => {
              //   reportDetailAdapter.createReportDetails({student_id: student.id, report_id: res.id})
              // })
              router.push(`report-mgmt/report-details/${res.id}/`);
            });
        }
      });
  }

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          <h2 className="flex justify-between gap-4 items-baseline text-3xl mb-4">
            Reports for {day}{" "}
            <span>
              <input
                type="date"
                className="mb-4 text-xl text-right"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => {
                  const dateObject = new Date(e.target.value);
                  const newDay = dates[dateObject.getDay()];
                  setDay(newDay);
                  setDate(format(dateObject, "yyyy-MM-dd"));
                }}
              />
            </span>
          </h2>
          <ul className="flex flex-col gap-2">
            {classes?.map((thisClass: Class, index: number) => (
              <li
                key={index}
                className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
              >
                <Link href={`/report-mgmt/${thisClass.id}/${date}`}>
                  {thisClass.name} {thisClass.class_list.length}/8
                </Link>
                <div className="flex gap-4">
                  {thisClass.class_list.length === 0 ? (
                    <Link href={`/class-mgmt/${thisClass.id}`}
                      className="bg-gray-300 py-1 px-2 rounded disabled:cursor-not-allowed"
                    >Add Students</Link>
                  ) : (
                    <button
                      disabled={thisClass.class_list.length === 0}
                      className="bg-blue-300 py-1 px-2 rounded disabled:cursor-not-allowed"
                      onClick={() => {
                        checkOrCreateReports(thisClass, date);
                      }}
                    >
                      Write reports
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
