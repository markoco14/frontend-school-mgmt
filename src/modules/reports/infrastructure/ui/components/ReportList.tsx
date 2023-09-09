import AuthContext from "@/src/AuthContext";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { reportAdapter } from "../../adapters/reportAdapter";

export const ReportList = () => {
  const router = useRouter();
  const { selectedSchool } = useContext(AuthContext);
  const [classEntities, setClasses] = useState<ClassEntity[]>();
  const [date, setDate] = useState<Date>(new Date());
  const dayNumber = date.getDay();
  
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

  useEffect(() => {
    async function getData() {
      await classAdapter
        .list({
          school_id: selectedSchool?.id,
          day: dayName,
        })
        .then((res) => {
          setClasses(() => res);
        });
    }
    if (selectedSchool) {
      getData();
    }
  }, [date, selectedSchool, dayName]);

  async function checkOrCreateReports(classEntity: ClassEntity, date: string) {
    await reportAdapter
      .getReportByClassAndDate({ class_id: classEntity.id, date: date })
      .then((res) => {
        if (res.id) {
          router.push(`reports/report-details/${res.id}/`);
        } else {
          reportAdapter
            .createReportForClassAndDate({ class_id: classEntity.id, date: date })
            .then((res) => {
              router.push(`reports/report-details/${res.id}/`);
            });
        }
      });
  }

  const incrementDate = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    setDate(currentDate);
  };

  const decrementDate = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    setDate(currentDate);
  };

  return (
    <>
      <h2 className="mb-4 flex flex-col items-baseline text-3xl xs:mb-0 xs:flex-row xs:justify-between xs:gap-2">
        <span>Reports for {days[date.getDay()]} </span>
        <span>
          <input
            type="date"
            className="rounded text-left text-xl xs:mb-4 xs:text-right"
            value={format(date, "yyyy-MM-dd")}
            onChange={async (e) => {
              const newDate = new Date(e.target.value);

              if (selectedSchool) {
                await classAdapter
                  .listSchoolTodayClasses({
                    school_id: selectedSchool?.id,
                    date: newDate.getDay(),
                  })
                  .then((res) => {
                    setClasses(res);
                  });
              }

              setDate(newDate);
            }}
          />
        </span>
      </h2>
      <div className="mb-2 flex justify-between gap-4 xs:justify-center">
        <button
          className="flex w-full items-center justify-center"
          onClick={decrementDate}
        >
          <span className="material-symbols-outlined">navigate_before</span>
        </button>
        <button
          className="flex w-full items-center justify-center"
          onClick={incrementDate}
        >
          <span className="material-symbols-outlined">navigate_next</span>
        </button>
      </div>
      <hr className="mb-2"></hr>
      <ul className="flex flex-col gap-2 divide-y">
        {!classEntities?.length ? (
          <p>There are no classes today</p>
        ) : (
          classEntities?.map((classEntity: ClassEntity, index: number) => (
            <li
              key={index}
              className="flex items-baseline justify-between rounded-md p-2 hover:bg-blue-200"
            >
              <span>{classEntity.name} {classEntity.teacher}</span>
              <button onClick={() => {
                console.log(`writing evaluations for ${classEntity.name}`)
              }}>Evaluations</button>
              {/* <div className="flex gap-4">
                {classEntity.class_list?.length === 0 ? (
                  <Link
                    href={`/classes/${classEntity.id}`}
                    className="rounded bg-gray-300 px-2 py-1 disabled:cursor-not-allowed"
                  >
                    Add Students
                  </Link>
                ) : (
                  <button
                    disabled={classEntity.class_list?.length === 0}
                    className="rounded bg-blue-300 px-2 py-1 disabled:cursor-not-allowed"
                    onClick={() => {
                      checkOrCreateReports(
                        classEntity,
                        format(date, "yyyy-MM-dd"),
                      );
                    }}
                  >
                    Write reports
                  </button>
                )}
              </div> */}
            </li>
          ))
        )}
      </ul>
    </>
  );
};
