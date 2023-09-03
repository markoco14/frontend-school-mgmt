import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/classes/domain/entities/Class";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import DailyReportOverview from "@/src/modules/reports/infrastructure/ui/components/DailyReportOverview";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReportsHome() {
  const { selectedSchool } = useContext(AuthContext);

  const { user } = useContext(AuthContext);
  const date = new Date();
  const day = date.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[day];

  const [todayClasses, setTodayClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class>();

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
                    setSelectedClass(classEntity);
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
            <p>
              {selectedClass?.name} (teacher id:{selectedClass?.teacher})
            </p>
            <div className="flex justify-between">
              <span>Student B</span>
              <div className="flex gap-2">
                <span onClick={() => {
                  toast.success('On Time')
                }}>On Time</span>
                <span onClick={() => {
                  toast.success('Late')
                }}>Late</span>
                <span onClick={() => {
                  toast.success('Absent')
                }}>Absent</span>
              </div>
            </div>
          </article>
        </section>
        <DailyReportOverview date={date} />
      </div>
    </Layout>
  );
}
