import AuthContext from "@/src/AuthContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import DateChangeButtons from "@/src/modules/core/infrastructure/ui/components/DateChangeButtons";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import DailyReportOverview from "@/src/modules/reports/infrastructure/ui/components/DailyReportOverview";
import { StudentAttendance } from "@/src/modules/students/domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "@/src/modules/students/infrastructure/adapters/studentAttendanceAdapter";
import AttendanceReasonForm from "@/src/modules/students/infrastructure/ui/attendance/AttendanceReasonForm";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AttendanceNoteButton = ({
  studentAttendance,
  setIsWriteNote,
  setSelectedAttendance,
}: {
  studentAttendance: StudentAttendance;
  setIsWriteNote: Function;
  setSelectedAttendance: Function;
}) => {
  return (
    <>
      {studentAttendance.status !== 0 && (
        <span
          onClick={() => {
            setIsWriteNote(true);
            setSelectedAttendance(studentAttendance);
          }}
          className={`${
            studentAttendance.status === 1
              ? "hover:text-orange-300"
              : "hover:text-red-700"
          } cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-2`}
        >
          Note
        </span>
      )}
    </>
  );
};

const AttendanceStatusButton = ({
  studentAttendance,
  status,
  handleUpdateAttendance,
}: {
  studentAttendance: StudentAttendance;
  status: number;
  handleUpdateAttendance: Function;
}) => {
  return (
    <>
      {status === 0 && (
        <span
          onClick={async () => {
            if (studentAttendance.status === status) {
              toast(`Student ${studentAttendance.student_id} already checked`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: studentAttendance.id,
                status: 0,
              })
              .then((res) => {
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`Student ${studentAttendance.student_id} updated`);
          }}
          className={`${
            studentAttendance.status === 0
              ? `bg-green-300 hover:bg-green-500`
              : "hover:bg-gray-300"
          } grid aspect-square w-8 cursor-pointer place-items-center rounded border`}
        >
          <i className="fa-solid fa-check" />
        </span>
      )}
      {status === 1 && (
        <span
          onClick={async () => {
            if (studentAttendance.status === status) {
              toast(`Student ${studentAttendance.student_id} already checked`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: studentAttendance.id,
                status: 1,
              })
              .then((res) => {
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`Student ${studentAttendance.student_id} updated`);
          }}
          className={`${
            studentAttendance.status === 1
              ? `bg-orange-300 hover:bg-orange-500`
              : "hover:bg-gray-300"
          } grid aspect-square w-8 cursor-pointer place-items-center rounded border`}
        >
          <span>L</span>
        </span>
      )}
      {status === 2 && (
        <span
          onClick={async () => {
            if (studentAttendance.status === status) {
              toast(`Student ${studentAttendance.student_id} already checked`);
              return;
            }
            await studentAttendanceAdapter
              .patch({
                attendance_id: studentAttendance.id,
                status: 2,
              })
              .then((res) => {
                handleUpdateAttendance({ newAttendance: res });
              });
            toast.success(`Student ${studentAttendance.student_id} updated`);
          }}
          className={`${
            studentAttendance.status === 2
              ? `bg-red-300 hover:bg-red-500`
              : "hover:bg-gray-300"
          } grid aspect-square w-8 cursor-pointer place-items-center rounded border`}
        >
          <span>A</span>
        </span>
      )}
    </>
  );
};

// const StudentListSkeletonProps = () => {
//   return (
//     <div className="grid gap-2">
//       <div className="flex h-[48px] items-center gap-2 rounded bg-gray-200 px-2 py-1">
//         <div className="aspect-square h-[40px] rounded-full bg-gray-300"></div>
//         <div className="h-[40px] w-full rounded bg-gray-300"></div>
//       </div>
//       <div className="flex h-[48px] items-center gap-2 rounded bg-gray-200 px-2 py-1">
//         <div className="aspect-square h-[40px] rounded-full bg-gray-300"></div>
//         <div className="h-[40px] w-full rounded bg-gray-300"></div>
//       </div>
//       <div className="flex h-[48px] items-center gap-2 rounded bg-gray-200 px-2 py-1">
//         <div className="aspect-square h-[40px] rounded-full bg-gray-300"></div>
//         <div className="h-[40px] w-full rounded bg-gray-300"></div>
//       </div>
//       <div className="flex h-[48px] items-center gap-2 rounded bg-gray-200 px-2 py-1">
//         <div className="aspect-square h-[40px] rounded-full bg-gray-300"></div>
//         <div className="h-[40px] w-full rounded bg-gray-300"></div>
//       </div>
//       <div className="flex h-[48px] items-center gap-2 rounded bg-gray-200 px-2 py-1">
//         <div className="aspect-square h-[40px] rounded-full bg-gray-300"></div>
//         <div className="h-[40px] w-full rounded bg-gray-300"></div>
//       </div>
//     </div>
//   );
// };

// const ClassListSkeletonProps = () => {
//   return (
//     <div className="grid gap-2">
//       <div className="flex h-[48px] items-center gap-2 rounded bg-gray-300 px-2 py-1"></div>
//       <div className="flex h-[48px] items-center gap-2 rounded bg-gray-300 px-2 py-1"></div>
//     </div>
//   );
// };

export default function ReportsHome() {
  const { selectedSchool } = useContext(AuthContext);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(false);

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
      <div>
        {/* <SchoolHeader /> */}
        <DateChangeButtons loading={loading} date={date} setDate={setDate} />
        <section className="grid gap-4 sm:grid-cols-8 sm:gap-2">
          <article className="col-span-4 flex flex-col gap-4 rounded border-2 p-4 shadow">
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
                      classEntity.id === selectedClass?.id ? "bg-blue-300" : ""
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
          <article className="col-span-4 grid gap-4 rounded border-2 p-4 shadow">
            <div>
              <h2 className="mb-2 text-2xl">
                Class: {selectedClass?.name} Teacher {selectedClass?.teacher}
              </h2>
              <p>Track student attendance below.</p>
            </div>
            {loading || loadingAttendance ? (
              <Skeleton>
                <StudentListSkeletonProps studentQuantity={10} />
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
        </section>
        <DailyReportOverview date={date} />
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
      </div>
    </Layout>
  );
}
