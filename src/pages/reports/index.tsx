import AuthContext from "@/src/AuthContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { StudentAttendance } from "@/src/modules/attendance/domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "@/src/modules/attendance/infrastructure/adapters/studentAttendanceAdapter";
import AttendanceReasonForm from "@/src/modules/attendance/infrastructure/ui/components/AttendanceReasonForm";
import ClassList from "@/src/modules/attendance/infrastructure/ui/components/ClassList";
import StudentAttendanceList from "@/src/modules/attendance/infrastructure/ui/components/StudentAttendanceList";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import DateChangeButtons from "@/src/modules/core/infrastructure/ui/components/DateChangeButtons";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import PageTabNavigation from "@/src/modules/core/infrastructure/ui/components/PageTabNavigation";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import DailyReportOverview from "@/src/modules/reports/infrastructure/ui/components/DailyReportOverview";
import AttendanceSection from "@/src/modules/reports/infrastructure/ui/components/attendance/AttendanceSection";
import ReportingEvaluationSection from "@/src/modules/reports/infrastructure/ui/components/evaluation/ReportingEvaluationSection";
import { useContext, useEffect, useState } from "react";

export default function ReportsHome() {
  const { selectedSchool } = useContext(AuthContext);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(false);

  const [tab, setTab] = useState<number>(1);

  const links = [
    {
      value: 1,
      name: "Attendance",
    },
    {
      value: 2,
      name: "Evaluations",
    },
    {
      value: 3,
      name: "Daily Reports",
    },
  ];

  const { user } = useContext(AuthContext);
  // const date = new Date();
  // date.setDate(date.getDate() + 1);
  const dayNumber = date.getDay();
  const year = date.getFullYear(); // Get the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month and pad with 0 if needed
  const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with 0 if needed

  const formattedDate = `${year}-${month}-${day}`; // Format the date
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
  const [classAttendance, setClassAttendance] = useState<StudentAttendance[]>(
    [],
  );
  const [selectedClass, setSelectedClass] = useState<ClassEntity>();
  const [isWriteNote, setIsWriteNote] = useState<boolean>(false);
  const [selectedAttendance, setSelectedAttendance] =
    useState<StudentAttendance>();

  useEffect(() => {
    async function getClasses() {
      setLoading(true);
      await classAdapter
        .list({ school_id: selectedSchool.id, day: dayName })
        .then((res) => {
          setSelectedClass(res[0]);
          getAttendanceList({ school_class: res[0]?.id, date: formattedDate });
          setTodayClasses(res);
          setLoading(false);
        });
    }

    selectedSchool && getClasses();
  }, [selectedSchool, formattedDate, dayName]);

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    );
  }

  async function getAttendanceList({
    school_class,
    date,
  }: {
    school_class: number | undefined;
    date: string | undefined;
  }) {
    setLoadingAttendance(true);
    await studentAttendanceAdapter
      .list({ school_class: school_class, date: date, details: true })
      .then((res) => {
        setClassAttendance(res);
        setLoadingAttendance(false);
      });
  }

  const handleUpdateAttendance = ({
    newAttendance,
  }: {
    newAttendance: StudentAttendance;
  }) => {
    // Use map to create a new array
    const updatedAttendance = classAttendance.map((attendance) => {
      // Find the attendance object that matches the ID of the newAttendance
      if (attendance.id === newAttendance.id) {
        // Replace it with newAttendance
        return newAttendance;
      }
      // Leave all other objects unchanged
      return attendance;
    });

    // Update the state
    setClassAttendance(updatedAttendance);
  };

  function handleClose() {
    setIsWriteNote(false);
    setSelectedAttendance(undefined);
  }

  function handleChangeClass({ classEntity }: { classEntity: ClassEntity }) {
    setSelectedClass(classEntity);
    getAttendanceList({
      school_class: classEntity.id,
      date: formattedDate,
    });
  }
  return (
    <Layout>
      <div className="grid gap-4 divide-y">
        {/* <SchoolHeader /> */}
        <h1 className="text-3xl">Reporting</h1>
        <div className="border-b-2">
          <DateChangeButtons date={date} setDate={setDate} />
        </div>

        <section className="grid gap-4 rounded border bg-gray-100 p-2 shadow-inner sm:grid-cols-8 sm:gap-2">
          <div className="bg-white sm:col-span-8">
            <PageTabNavigation links={links} tab={tab} setTab={setTab} />
          </div>
          {/* Class Attendance Logic */}
          {tab !== 3 && (
            <>
              <article className="col-span-4 flex flex-col gap-4 rounded border bg-white p-4 shadow">
                <div>
                  <h2 className="mb-2 text-2xl">
                    Classes {dayName} {date.toDateString()}
                  </h2>
                  <p>Click a class to see the student list on the right.</p>
                </div>
                {loading ? (
                  <Skeleton>
                    <ClassListSkeletonProps />
                  </Skeleton>
                ) : (
                  <ClassList
                    todayClasses={todayClasses}
                    selectedClass={selectedClass}
                    handleClick={handleChangeClass}
                  />
                )}
              </article>
              {tab === 1 && (
                <AttendanceSection 
                  selectedClass={selectedClass}
                  loading={loading}
                  loadingAttendance={loadingAttendance}
                  classAttendance={classAttendance}
                  setIsWriteNote={setIsWriteNote}
                  setSelectedAttendance={setSelectedAttendance}
                  isWriteNote={isWriteNote}
                  handleClose={handleClose}
                  selectedAttendance={selectedAttendance}
                  setClassAttendance={setClassAttendance}
                  handleUpdateAttendance={handleUpdateAttendance}
                />
              )}
              {tab === 2 && (
                <article className="col-span-4 grid gap-4 rounded border bg-white p-4 shadow">
                  <ReportingEvaluationSection date={date} />
                </article>
              )}
            </>
          )}
        </section>
        {tab === 3 && (
          <section className="rounded border p-2 shadow">
            <p>daily reports</p>
            {/* FAKE TEACHER DATA */}
            <DailyReportOverview date={date} />
          </section>
        )}
      </div>
    </Layout>
  );
}
