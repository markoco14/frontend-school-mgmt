import AuthContext from "@/src/AuthContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import DateChangeButtons from "@/src/modules/core/infrastructure/ui/components/DateChangeButtons";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import PageTabNavigation from "@/src/modules/core/infrastructure/ui/components/PageTabNavigation";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import DailyReportOverview from "@/src/modules/reports/infrastructure/ui/components/DailyReportOverview";
import { StudentAttendance } from "@/src/modules/students/domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "@/src/modules/students/infrastructure/adapters/studentAttendanceAdapter";
import AttendanceNoteButton from "@/src/modules/students/infrastructure/ui/attendance/AttendanceNoteButton";
import AttendanceReasonForm from "@/src/modules/students/infrastructure/ui/attendance/AttendanceReasonForm";
import AttendanceStatusButton from "@/src/modules/students/infrastructure/ui/attendance/AttendanceStatusButton";
import Image from "next/image";
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
          getAttendanceList({ school_class: res[0].id, date: formattedDate });
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

  return (
    <Layout>
      <div className="grid gap-4">
        {/* <SchoolHeader /> */}
        <h1 className="text-3xl">Reporting</h1>
        <div>
          <PageTabNavigation links={links} tab={tab} setTab={setTab} />
        </div>
        {/* Attendance */}
        {tab === 1 && (
          <section className="grid gap-4 rounded border p-2 shadow sm:grid-cols-8 sm:gap-2">
            <div className="border-b-2 sm:col-span-8">
              <DateChangeButtons date={date} setDate={setDate} />
            </div>
            <article className="col-span-4 flex flex-col gap-4 rounded border p-4 shadow">
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
                <ul className="grid divide-y">
                  {todayClasses?.map((classEntity) => (
                    <li
                      key={`class-${classEntity.id}`}
                      onClick={() => {
                        setSelectedClass(classEntity);
                        getAttendanceList({
                          school_class: classEntity.id,
                          date: formattedDate,
                        });
                      }}
                      className={`${
                        classEntity.id === selectedClass?.id
                          ? "bg-blue-300"
                          : ""
                      } flex w-full cursor-pointer items-center justify-between rounded p-2`}
                    >
                      <span>
                        {classEntity.name} (teacher id:{classEntity.teacher})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
            <article className="col-span-4 grid gap-4 rounded border p-4 shadow">
              <div>
                <h2 className="mb-2 text-2xl">
                  Class: {selectedClass?.name} Teacher {selectedClass?.teacher}
                </h2>
                <p>Track student attendance below.</p>
              </div>
              {loading || loadingAttendance ? (
                <Skeleton>
                  <StudentListSkeletonProps studentQuantity={4} />
                </Skeleton>
              ) : (
                <ul className="grid divide-y">
                  {classAttendance?.map((studentAttendance) => (
                    <li
                      key={`studentAttendance-${studentAttendance.id}`}
                      className="flex items-center justify-between py-1"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative col-span-1 flex justify-center">
                          <Image
                            src={
                              studentAttendance.student
                                ? studentAttendance.student?.photo_url
                                : ""
                            }
                            alt={`An image of ${studentAttendance.student?.first_name}`}
                            width={50}
                            height={50}
                            style={{ objectFit: "cover" }}
                            className="rounded-full"
                          />
                        </div>
                        <span>
                          {studentAttendance.student?.first_name}{" "}
                          <span className="hidden sm:block">
                            {studentAttendance.student?.last_name}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AttendanceNoteButton
                          studentAttendance={studentAttendance}
                          setIsWriteNote={setIsWriteNote}
                          setSelectedAttendance={setSelectedAttendance}
                        />
                        <AttendanceStatusButton
                          studentAttendance={studentAttendance}
                          status={0}
                          handleUpdateAttendance={handleUpdateAttendance}
                        />
                        <AttendanceStatusButton
                          studentAttendance={studentAttendance}
                          status={1}
                          handleUpdateAttendance={handleUpdateAttendance}
                        />
                        <AttendanceStatusButton
                          studentAttendance={studentAttendance}
                          status={2}
                          handleUpdateAttendance={handleUpdateAttendance}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>
            <Modal
              show={isWriteNote}
              close={handleClose}
              title={"Student Attendance Reason"}
            >
              {selectedAttendance && (
                <AttendanceReasonForm
                  selectedAttendance={selectedAttendance}
                  handleUpdateAttendance={handleUpdateAttendance}
                />
              )}
            </Modal>
          </section>
        )}
        {tab === 2 && (
          <section className="rounded border p-2 shadow">
            <div className="border-b-2 sm:col-span-8">
              <DateChangeButtons date={date} setDate={setDate} />
            </div>
            <p>Evaluations</p>
          </section>
        )}
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
