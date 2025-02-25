import { Spinner } from "@/src/components/ui/spinner";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import { NewClassEntity } from "@/src/modules/classes/entities/NewClassEntity";
// import { Level } from "@/src/modules/curriculum/entities/Level";
import { School } from "@/src/modules/schools/entities/School";
// import { SchoolDay } from "@/src/modules/schools/entities/SchoolDay";
import getSchoolBySlug from "@/src/modules/schools/requests/getSchoolBySlug";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import addClass from "../requests/addClass";

type Inputs = {
  className: string;
  // level: number;
  // daysOfWeek: string[];
};

export default function AddClassModal({ schoolSlug, setClasses }: { schoolSlug: string; setClasses: Function }) {
  // const { user } = useUserContext();
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  // const [levels, setLevels] = useState<Level[]>([]);
  // const [days, setDays] = useState<SchoolDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!selectedSchool) {
      toast.error("No school selected. Please make sure you are in your school's workspace.")
      return
    }

    // const days: number[] = [];
    // data.daysOfWeek?.forEach((day) => days.push(Number(day)));

    const newClass = new NewClassEntity(
      data.className,
      // 1,
      // [1, 4],
      selectedSchool.id
    )

    try {
      const newClassResponse: ClassEntity = await addClass(newClass);
      toast.success("New class added.");
      setClasses((prevClasses: ClassEntity[]) => [...prevClasses, newClassResponse]);
      reset();
    } catch (error) {
      toast.error("Unable to add new class")
    }
  };

  useEffect(() => {
    async function getData() {
      const response = await getSchoolBySlug(schoolSlug)
      setSelectedSchool(response)
    }

    try {
      setLoading(true)
      getData()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Unable to get school data.")
      }
    } finally {
      setLoading(false)
    }
  }, [schoolSlug]);

  return (
    loading ? (
      <Spinner />
    ) : (
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

        {/* <div className="flex flex-col gap-2">
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
        </div> */}
        {/* <div className="grid gap-2">
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
        </div> */}
        <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
          Add
        </button>
      </form>
    )
  );
}
