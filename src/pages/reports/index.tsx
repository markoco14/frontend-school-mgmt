import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/classes/domain/entities/Class";
import { ClassStudent } from "@/src/modules/classes/domain/entities/ClassStudent";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import DailyReportOverview from "@/src/modules/reports/infrastructure/ui/components/DailyReportOverview";
import { StudentAttendance } from "@/src/modules/students/domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "@/src/modules/students/infrastructure/adapters/studentAttendanceAdapter";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReportsHome() {
  const { selectedSchool } = useContext(AuthContext);

  const { user } = useContext(AuthContext);
  const date = new Date();
  date.setDate(date.getDate() + 1); 
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
  const [classAttendance, setClassAttendance] = useState<StudentAttendance[]>();

  useEffect(() => {
    async function getClasses() {
      await classAdapter
        .list({ school_id: selectedSchool.id, day: "Monday" })
        .then((res) => {
          console.log(res);
          setTodayClasses(res);
        });
    }

    selectedSchool && getClasses();
  }, [selectedSchool]);

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
    console.log(school_class)
    console.log(date)
    await studentAttendanceAdapter
      .list({ school_class: school_class, date: date })
      .then((res) => {
        console.log(res);
        setClassAttendance(res)
      });
  }

  return (
    <Layout>
      <div>
        <SchoolHeader />
        <section className="grid gap-4 sm:grid-cols-9 sm:gap-0">
          <article className="col-span-4 grid gap-4 rounded border-2 p-4 shadow">
            <h2 className="text-2xl">
              Classes {dayName} {date.toDateString()}
            </h2>
            <p>Click a class to see the student list on the right.</p>
            <ul className="grid gap-2 p-2">
              {todayClasses?.map((classEntity) => (
                <li
                  key={`class-${classEntity.id}`}
                  onClick={() => {
                    // setClassAttendance(classEntity.class_list);
                    console.log("class id", classEntity.id);
                    console.log("date", date);

                    getAttendanceList({
                      school_class: classEntity.id,
                      date: formattedDate,
                    });
                  }}
                  className="cursor-pointer"
                >
                  {classEntity.name} (teacher id:{classEntity.teacher})
                </li>
              ))}
            </ul>
          </article>
          <article className="hidden place-items-center sm:grid">{`->`}</article>
          <article className="col-span-4 grid gap-4 rounded border-2 p-4 shadow">
            <ul className="grid gap-2 p-2">
              {classAttendance?.map((studentAttendance) => (
                <li
                  key={`studentAttendance-${studentAttendance.id}`}
                  className="flex justify-between"
                >
                  <span>Student ID: {studentAttendance.student_id}</span>
                  <div className="flex gap-2">
                    <span
                      onClick={() => {
                        toast.success(
                          `Student ${studentAttendance.student_id} On Time`,
                        );
                      }}
                      className={`${
                        studentAttendance.status === 0 && "bg-green-300"
                      }`}
                    >
                      On Time
                    </span>
                    <span
                      onClick={() => {
                        toast.success(
                          `Student ${studentAttendance.student_id} Late`,
                        );
                      }}
                      className={`${
                        studentAttendance.status === 1 && "bg-orange-300"
                      }`}
                    >
                      Late
                    </span>
                    <span
                      onClick={() => {
                        toast.success(
                          `Student ${studentAttendance.student_id} Absent`,
                        );
                      }}
                      className={`${
                        studentAttendance.status === 2 && "bg-red-300"
                      }`}
                    >
                      Absent
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
