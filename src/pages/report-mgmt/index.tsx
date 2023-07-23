import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { reportAdapter } from "@/src/modules/report-mgmt/infrastructure/adapters/reportAdapter";
import { Report } from "@/src/modules/report-mgmt/domain/entities/Report";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { format } from "date-fns";
import { useRouter } from "next/router";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import AuthContext from "@/src/AuthContext";

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
  const { selectedSchool } = useContext(AuthContext);
  const [nameOfDay, setNameOfDay] = useState<string>("");
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
    async function getData(numberOfDay: number) {
      await classAdapter.getClassesBySchoolAndDate({ school_id: selectedSchool?.id, date: numberOfDay }).then((res) => {
        setClasses(() => res);
      });
    }
    
    if (!nameOfDay) {
      const date = new Date();
      const numberOfDay = date.getDay();
      setNameOfDay(dates[numberOfDay]);
      setDate(format(date, "yyyy-MM-dd"));
      getData(numberOfDay);
    }
  }, [selectedSchool, nameOfDay, dates]);

  async function checkOrCreateReports(thisClass: Class, date: string) {
    // CHECK IF REPORT EXISTS
    const report = await reportAdapter
      .getReportByClassAndDate({ class_id: thisClass.id, date: date })
      .then((res) => {
        // IF EXISTS, GO THERE
        if (res.id) {
          router.push(`report-mgmt/report-details/${res.id}/`);
        }
        // IF NO REPORTS, CREATE AND GO
        else {
          reportAdapter
            .createReportForClassAndDate({ class_id: thisClass.id, date: date })
            .then((res) => {
              router.push(`report-mgmt/report-details/${res.id}/`);
            });
        }
      });
  }

  return (
    <Layout>
      <div>
        <section className="bg-white p-4 rounded-lg">
          <SchoolHeader />
          <h2 className="flex justify-between gap-4 items-baseline text-3xl mb-4">
            Reports for {nameOfDay}{" "}
            <span>
              <input
                type="date"
                className="mb-4 text-xl text-right"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                onChange={async (e) => {
                  const dateObject = new Date(e.target.value);
                  const selectedDay = dateObject.getDay();
                  await classAdapter
                    .getClassesBySchoolAndDate({ school_id: selectedSchool?.id, date: Number(selectedDay) })
                    .then((res) => {
                      setClasses(res);
                    });
                  setNameOfDay(dates[selectedDay]);
                  setDate(format(dateObject, "yyyy-MM-dd"));
                }}
              />
            </span>
          </h2>
          <ul className="flex flex-col gap-2">
            {classes?.length === 0 ? (
              <p>There are no classes today</p>
            ) : (
              classes?.map((thisClass: Class, index: number) => (
                <li
                  key={index}
                  className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
                >
                  <Link href={`/report-mgmt/${thisClass.id}/${date}`}>
                    {thisClass.name} {thisClass.class_list.length}/8
                  </Link>
                  <div className="flex gap-4">
                    {thisClass.class_list.length === 0 ? (
                      <Link
                        href={`/class-mgmt/${thisClass.id}`}
                        className="bg-gray-300 py-1 px-2 rounded disabled:cursor-not-allowed"
                      >
                        Add Students
                      </Link>
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
              ))
            )}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
