import { useUserContext } from "@/src/UserContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import { format } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const TodayClassList = () => {
  const router = useRouter();
  const { selectedSchool } = useUserContext();
  const [classEntities, setClasses] = useState<ClassEntity[]>();

  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date") as string;
  const date = dateParam ? new Date(dateParam) : new Date();
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
    const controller = new AbortController();
    const signal = controller.signal;
    async function getData() {
      setLoading(true);
      try {
        await classAdapter
          .list({
            school_id: selectedSchool?.id,
            day: dayName,
            signal: signal,
          })
          .then((res) => {
            setLoading(false);
            setClasses(() => res);
          });
      } catch (error) {
        console.error(error);
      }
    }
    selectedSchool && getData();
    return () => {
      controller.abort();
    };
  }, [selectedSchool, formattedDateString, dayName, dayNumber]);

  const incrementDate = () => {
    setClasses([]);
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    router.push(
      `?${new URLSearchParams({
        date: currentDate.toISOString().split("T")[0],
      })}`,
    );
  };

  const decrementDate = () => {
    setClasses([]);
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    router.push(
      `?${new URLSearchParams({
        date: currentDate.toISOString().split("T")[0],
      })}`,
    );
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
              setClasses([]);
              const newDate = new Date(e.target.value);
              router.push(
                `?${new URLSearchParams({
                  date: newDate.toISOString().split("T")[0],
                })}`,
              );
            }}
          />
          <button
            className="flex items-center justify-center rounded border shadow "
            onClick={decrementDate}
          >
            <span className="material-symbols-outlined">navigate_before</span>
          </button>
          <button
            className="flex items-center justify-center rounded border shadow "
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
