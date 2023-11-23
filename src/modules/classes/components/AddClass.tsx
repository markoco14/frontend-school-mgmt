import { useUserContext } from "@/src/contexts/UserContext";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/adapters/classAdapter";
import PaginationButtons from "@/src/modules/core/components/PaginationButtons";
import { levelAdapter } from "@/src/modules/curriculum/adapters/levelAdapter";
import { schoolDayAdapter } from "@/src/modules/schedule/adapters/schoolDayAdapter";
import { SchoolDay } from "@/src/modules/school-mgmt/entities/SchoolDay";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Level } from "@/src/modules/curriculum/entities/Level";

type Inputs = {
  className: string;
  level: number;
  daysOfWeek: string[];
};

export default function AddClass({ setClasses }: { setClasses: Function }) {
  const { user, selectedSchool } = useUserContext();
  const [levels, setLevels] = useState<Level[]>([]);
  const [days, setDays] = useState<SchoolDay[]>([]);
  const [page, setPage] = useState<number>(1);

  // eslint-disable-next-line no-unused-vars
  const [next, setNext] = useState<boolean>(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState<number>(0);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const days: number[] = [];
    data.daysOfWeek?.forEach((day) => days.push(Number(day)));

    try {
      const newClass: ClassEntity = await classAdapter.addClass({
        name: data.className,
        school_id: selectedSchool?.id as number,
        level: Number(data.level),
        days: days,
      });
      toast.success("New class added.");
      setClasses((prevClasses: ClassEntity[]) => [...prevClasses, newClass]);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getLevels() {
      await levelAdapter
        .listSchoolLevels({ school_id: selectedSchool?.id })
        .then((res) => {
          setLevels(res);
        });
    }

    async function getWeekdays() {
      await schoolDayAdapter
        .listSchoolSchoolDays({ schoolId: selectedSchool?.id })
        .then((res) => {
          console.log(res);
          setDays(res);
        });
    }

    if (user) {
      try {
        getLevels();
        getWeekdays();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user, selectedSchool, page]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="flex flex-col gap-2">
        <label>Class Name</label>
        <input
          className="rounded border px-2 py-1 shadow"
          type="text"
          {...register("className", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
        />
        {errors.className?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            Class name is required
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label>Level</label>
        <div className="grid grid-cols-5 gap-2">
          {levels?.map((level: Level, index: number) => (
            <label key={index} className="flex w-full cursor-pointer">
              <input
                type="radio"
                className="peer sr-only"
                {...register("level", { required: true })}
                value={level.id}
              />
              <span className="grid w-full place-content-center rounded border py-1 shadow duration-200 ease-in-out hover:bg-gray-300 peer-checked:bg-gray-500 peer-checked:text-white ">
                {level.name}
              </span>
            </label>
          ))}
        </div>
        {errors.level?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            Level is required
          </p>
        )}
        <PaginationButtons
          count={count}
          page={page}
          setPage={setPage}
          next={next}
        />
      </div>
      <div className="grid gap-2">
        <p>Days of Week</p>
        <div className="grid gap-2">
          {days?.map((day, index) => (
            <div key={index} className="flex flex-col">
              <label className="cursor-pointer text-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  {...register("daysOfWeek", { required: true })}
                  value={day.id} // use the ID of the school_day to match school_day_id
                />
                <span className="grid w-full place-content-center rounded border py-1 shadow duration-200 ease-in-out hover:bg-gray-300 peer-checked:bg-gray-500 peer-checked:text-white ">
                  {day.day}
                </span>
              </label>
            </div>
          ))}
        </div>
        {errors.daysOfWeek?.type === "required" && (
          <p role="alert" className="col-span-5 mt-2 text-red-500">
            Days are required
          </p>
        )}
      </div>
      <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
        Add
      </button>
    </form>
  );
}
