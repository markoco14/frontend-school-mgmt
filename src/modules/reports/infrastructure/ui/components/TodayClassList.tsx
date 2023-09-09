import AuthContext from "@/src/AuthContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";


export const TodayClassList = () => {
  const router = useRouter();
  const { selectedSchool } = useContext(AuthContext);
  const [classEntities, setClasses] = useState<ClassEntity[]>();
  const [date, setDate] = useState<Date>(new Date());
  const dayNumber = date.getDay();
  const [loading, setLoading] = useState<boolean>(false);

  const formattedDateString = date.toISOString().split("T")[0];

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
      setLoading(true);
      await classAdapter
        .list({
          school_id: selectedSchool?.id,
          day: dayName,
        })
        .then((res) => {
          setLoading(false);
          setClasses(() => res);
        });
    }
    selectedSchool && getData();
  }, [date, selectedSchool, dayName]);

  // async function checkOrCreateReports(classEntity: ClassEntity, date: string) {
  //   await reportAdapter
  //     .getReportByClassAndDate({ class_id: classEntity.id, date: date })
  //     .then((res) => {
  //       if (res.id) {
  //         router.push(`reports/report-details/${res.id}/`);
  //       } else {
  //         reportAdapter
  //           .createReportForClassAndDate({ class_id: classEntity.id, date: date })
  //           .then((res) => {
  //             router.push(`reports/report-details/${res.id}/`);
  //           });
  //       }
  //     });
  // }

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
      <h2 className="mb-4 flex flex-col items-baseline text-3xl xs:gap-2">
        <span>Reports for {date.toDateString()} </span>
        <span className="flex gap-2">
          <input
            type="date"
            className="rounded border-2 text-left text-xl shadow xs:text-right"
            value={format(date, "yyyy-MM-dd")}
            onChange={async (e) => {
              const newDate = new Date(e.target.value);
              setDate(newDate);
            }}
          />
          <button
            className="flex items-center justify-center"
            onClick={decrementDate}
          >
            <span className="material-symbols-outlined">navigate_before</span>
          </button>
          <button
            className="flex items-center justify-center"
            onClick={incrementDate}
          >
            <span className="material-symbols-outlined">navigate_next</span>
          </button>
        </span>
      </h2>
      <div className="mb-2 flex gap-4"></div>
      <hr className="mb-2"></hr>
      {loading && (
        <Skeleton>
          <ClassListSkeletonProps />
        </Skeleton>
      )}
      {!loading && classEntities?.length === 0 ? (
        <p className="p-2">There are no classes today</p>
      ) : (
        <ul>
          {classEntities?.map((classEntity) => (
            <li
              key={`class-${classEntity.id}`}
              className="flex justify-between p-2"
            >
              <span>{classEntity.name}</span>
              <Link
                href={`reports/evaluations/${classEntity.id}/${formattedDateString}/`}
              >
                Evaluations
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
