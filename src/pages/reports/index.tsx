import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/classes/domain/entities/Class";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import DailyReportOverview from "@/src/modules/reports/infrastructure/ui/components/DailyReportOverview";
import { StudentAttendance } from "@/src/modules/students/domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "@/src/modules/students/infrastructure/adapters/studentAttendanceAdapter";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReportsHome() {
  const { selectedSchool } = useContext(AuthContext);

  const { user } = useContext(AuthContext);
  const date = new Date();
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

  const [todayClasses, setTodayClasses] = useState<Class[]>([]);
  const [classAttendance, setClassAttendance] = useState<StudentAttendance[]>(
    [],
  );
  const [selectedClass, setSelectedClass] = useState<Class>();

  useEffect(() => {
    async function getClasses() {
      await classAdapter
        .list({ school_id: selectedSchool.id, day: "Monday" })
        .then((res) => {
          setSelectedClass(res[0]);
          getAttendanceList({ school_class: res[0].id, date: formattedDate });
          setTodayClasses(res);
        });
    }

    selectedSchool && getClasses();
  }, [selectedSchool, formattedDate]);

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
    await studentAttendanceAdapter
      .list({ school_class: school_class, date: date, details: true })
      .then((res) => {
        setClassAttendance(res);
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

  return (
    <Layout>
      <div>
        <SchoolHeader />
        <section className="grid gap-4 sm:grid-cols-8 sm:gap-2">
          <article className="col-span-4 flex flex-col gap-4 rounded border-2 p-4 shadow">
            <div>
              <h2 className="mb-2 text-2xl">
                Classes {dayName} {date.toDateString()}
              </h2>
              <p>Click a class to see the student list on the right.</p>
            </div>
            <ul className="grid divide-y">
              {todayClasses?.map((classEntity) => (
                <li
                  key={`class-${classEntity.id}`}
                  onClick={() => {
                    // setClassAttendance(classEntity.class_list);
                    setSelectedClass(classEntity);
                    getAttendanceList({
                      school_class: classEntity.id,
                      date: formattedDate,
                    });
                  }}
                  className="flex cursor-pointer items-center justify-between py-2"
                >
                  {classEntity.name} (teacher id:{classEntity.teacher})
                </li>
              ))}
            </ul>
          </article>
          <article className="col-span-4 grid gap-4 rounded border-2 p-4 shadow">
            <div>
              <h2 className="mb-2 text-2xl">
                Class: {selectedClass?.name} Teacher {selectedClass?.teacher}
              </h2>
              <p>Track student attendance below.</p>
            </div>
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
                      {studentAttendance.student?.last_name}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {/* {studentAttendance.status === 1 || studentAttendance.status === 2 && (

                    )} */}
                    <span
                      onClick={async () => {
                        if (studentAttendance.status === 0) {
                          toast(
                            `Student ${studentAttendance.student_id} already marked 'On Time'`,
                          );
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
                        toast.success(
                          `Student ${studentAttendance.student_id} On Time`,
                        );
                      }}
                      className={`${
                        studentAttendance.status === 0
                          ? "bg-green-300 hover:bg-green-500"
                          : "hover:bg-gray-300"
                      } grid aspect-square w-8 cursor-pointer place-items-center rounded-full`}
                    >
                      <i className="fa-solid fa-check" />
                    </span>
                    <span
                      onClick={async () => {
                        if (studentAttendance.status === 1) {
                          toast(
                            `Student ${studentAttendance.student_id} already marked 'Late'`,
                          );
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
                        toast.success(
                          `Student ${studentAttendance.student_id} Late`,
                        );
                      }}
                      className={`${
                        studentAttendance.status === 1
                          ? "bg-orange-300 hover:bg-orange-500"
                          : "hover:bg-gray-300"
                      } grid aspect-square w-8 cursor-pointer place-items-center rounded-full`}
                    >
                      <i className="fa-solid fa-minus" />
                    </span>
                    <span
                      onClick={async () => {
                        if (studentAttendance.id === 2) {
                          toast(
                            `Student ${studentAttendance.student_id} already marked 'Absent'`,
                          );
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
                        toast.success(
                          `Student ${studentAttendance.student_id} Absent`,
                        );
                      }}
                      className={`${
                        studentAttendance.status === 2
                          ? "bg-red-300 hover:bg-red-500"
                          : "hover:bg-gray-300"
                      }  grid aspect-square w-8 cursor-pointer place-items-center rounded-full`}
                    >
                      <i className="fa-solid fa-close" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
        <DailyReportOverview date={date} />
      </div>
    </Layout>
  );
}
