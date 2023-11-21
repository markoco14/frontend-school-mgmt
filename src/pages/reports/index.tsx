import { useUserContext } from "@/src/UserContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import EvaluationListSkeletonProps from "@/src/components/ui/skeleton/EvaluationListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import ClassList from "@/src/modules/attendance/infrastructure/ui/components/ClassList";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/components/ParamsPageTabNav";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import DailyReportOverview from "@/src/modules/reports/infrastructure/ui/components/DailyReportOverview";
import AttendanceSection from "@/src/modules/reports/infrastructure/ui/components/attendance/AttendanceSection";
import ReportingEvaluationSection from "@/src/modules/reports/infrastructure/ui/components/evaluation/ReportingEvaluationSection";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ReportsHome() {
  const { user, selectedSchool } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "attendance";
  const dateParam = searchParams.get("date") as string;
  const date = dateParam ? new Date(dateParam) : new Date();

  const links = [
    {
      value: 1,
      name: "Attendance",
      urlString: "attendance",
    },
    {
      value: 2,
      name: "Evaluations",
      urlString: "evaluations",
    },
    {
      value: 3,
      name: "Daily Reports",
      urlString: "daily reports",
    },
  ];

  const dayNumber = date.getDay();
  const formattedDate = date.toISOString().split("T")[0]; // Format the date
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[dayNumber];

  const [todayClasses, setTodayClasses] = useState<ClassEntity[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassEntity>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getClasses() {
      setLoading(true);
      try {
        await classAdapter
          .list({ school_id: selectedSchool?.id, day: dayName, signal: signal })
          .then((res) => {
            setSelectedClass(res[0]);
            setTodayClasses(res);
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    }

    selectedSchool && getClasses();
    return () => {
      controller.abort();
    };
  }, [selectedSchool, formattedDate, dayName]);

  if (!user?.permissions.some((permission) => [1, 2].includes(permission))) {
    return (
      <Layout>
        <AdminLayout>
          <div className="h-full w-full bg-white">
            <PermissionDenied />
          </div>
        </AdminLayout>
      </Layout>
    );
  }

  function handleChangeClass({ classEntity }: { classEntity: ClassEntity }) {
    setSelectedClass(classEntity);
  }

  const incrementDate = () => {
    setSelectedClass(undefined);
    setTodayClasses([]);
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    router.push(
      `?${new URLSearchParams({
        date: currentDate.toISOString().split("T")[0],
        tab: tab,
      })}`,
    );
  };

  const decrementDate = () => {
    setSelectedClass(undefined);
    setTodayClasses([]);
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    router.push(
      `?${new URLSearchParams({
        date: currentDate.toISOString().split("T")[0],
        tab: tab,
      })}`,
    );
  };

  return (
    <Layout>
      <AdminLayout>
        <div className="h-full w-full bg-white">
          <div className="grid gap-4">
            <h1 className="text-3xl">Reporting</h1>
            <div className="flex gap-2">
              <input
                type="date"
                className="rounded border text-left text-xl shadow xs:text-right"
                value={format(date, "yyyy-MM-dd")}
                onChange={async (e) => {
                  setTodayClasses([]);
                  const newDate = new Date(e.target.value);
                  router.push(
                    `?${new URLSearchParams({
                      date: newDate.toISOString().split("T")[0],
                      tab: tab,
                    })}`,
                  );
                }}
              />
              <button
                className=" flex items-center justify-center rounded border shadow disabled:cursor-not-allowed"
                onClick={decrementDate}
              >
                <span className="material-symbols-outlined">
                  navigate_before
                </span>
              </button>
              <button
                className=" flex items-center justify-center rounded border shadow disabled:cursor-not-allowed"
                onClick={incrementDate}
              >
                <span className="material-symbols-outlined">navigate_next</span>
              </button>
            </div>

            <section className="flex flex-col gap-4 overflow-x-hidden rounded border bg-gray-100 p-2 shadow-inner sm:grid-cols-2 sm:gap-2">
              <div className="bg-white sm:col-span-2">
                <ParamsPageTabNav
                  links={links}
                  tab={tab}
                  dateString={date.toISOString().split("T")[0]}
                />
              </div>
              {tab !== "daily reports" && (
                <div className=" grid gap-2 sm:grid-cols-2">
                  <article className="relative flex flex-col gap-4 sm:col-span-1">
                    <div className="sticky top-4 rounded-lg border bg-white p-4 shadow">
                      <div>
                        <h2 className="mb-4 text-2xl">
                          Classes {dayName} {date.toDateString()}
                        </h2>
                      </div>
                      {loading ? (
                        <Skeleton>
                          <ClassListSkeletonProps />
                        </Skeleton>
                      ) : !todayClasses.length ? (
                        <p>
                          No classes today. Please check your school schedule.
                        </p>
                      ) : (
                        <>
                          <p className="mb-2">
                            Click a class to see the student{" "}
                            {tab === "attendance"
                              ? "Attendance"
                              : "Evaluations"}{" "}
                            on the right.
                          </p>
                          <ClassList
                            todayClasses={todayClasses}
                            selectedClass={selectedClass}
                            handleClick={handleChangeClass}
                          />
                        </>
                      )}
                    </div>
                  </article>
                  <article className="rounded-lg border bg-white p-4 sm:col-span-1">
                    {/* <h2 className="mb-4 text-2xl">Attendance list</h2> */}
                    {tab === "attendance" ? (
                      selectedClass ? (
                        <>
                          <AttendanceSection
                            date={date}
                            selectedClass={selectedClass}
                          />
                        </>
                      ) : (
                        <>
                          <h2 className="mb-4 text-2xl">
                            Please wait for attendance
                          </h2>
                          {loading && (
                            <Skeleton>
                              <StudentListSkeletonProps studentQuantity={8} />
                            </Skeleton>
                          )}
                        </>
                      )
                    ) : tab === "evaluations" && selectedClass ? (
                      <>
                        <h2 className="mb-4 text-2xl">
                          Class: {selectedClass?.name} Teacher{" "}
                          {selectedClass?.teacher}
                        </h2>
                        <ReportingEvaluationSection
                          date={date}
                          selectedClass={selectedClass}
                        />
                      </>
                    ) : (
                      <>
                        <h2 className="mb-4 text-2xl">
                          Please wait for evaluations
                        </h2>
                        {loading && (
                          <Skeleton>
                            <EvaluationListSkeletonProps />
                          </Skeleton>
                        )}
                      </>
                    )}
                    {/* {tab === "attendance" && selectedClass ? (
                      <AttendanceSection
                        date={date}
                        selectedClass={selectedClass}
                      />
                    ) : (
                      <>
                      <h2 className="mb-4 text-2xl">Please wait for attendance</h2>
                      {loading && (
                        <Skeleton>
                            <StudentListSkeletonProps studentQuantity={8} />
                          </Skeleton>
                      )}
                      </>
                    )} */}
                  </article>
                  {/* {tab === "evaluations" && selectedClass && (
                    <article className="sm:col-span-1">
                      <ReportingEvaluationSection
                        date={date}
                        selectedClass={selectedClass}
                      />
                    </article>
                  )} */}
                </div>
              )}
            </section>
            {tab === "daily reports" && (
              <section className="rounded border p-2 shadow">
                <DailyReportOverview date={date} />
              </section>
            )}
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
}
