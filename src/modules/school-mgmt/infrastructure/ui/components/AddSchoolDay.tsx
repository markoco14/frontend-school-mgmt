import { useUserContext } from "@/src/UserContext";
import { WeekDay } from "@/src/modules/schedule/domain/entities/WeekDay";
import { scheduleAdapter } from "@/src/modules/schedule/infrastructure/ui/adapters/scheduleAdapter";
import { schoolDayAdapter } from "@/src/modules/schedule/infrastructure/ui/adapters/schoolDayAdapter";
import { SchoolDay } from "@/src/modules/school-mgmt/domain/entities/SchoolDay";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddSchoolDay({
  schoolDays,
  setSchoolDays,
}: {
  schoolDays: SchoolDay[];
  setSchoolDays: Function;
}) {
  const { selectedSchool } = useUserContext();
  const [isAddSchoolDay, setIsAddSchoolDay] = useState<boolean>(false);
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);

  useEffect(() => {
    async function getWeekDays() {
      await scheduleAdapter.listWeekDays().then((res) => {
        setWeekDays(res);
      });
    }

    getWeekDays();
  }, [selectedSchool]);

  const handleAddSchoolDay = async ({ weekday }: { weekday: WeekDay }) => {
    const doesWeekdayExist = schoolDays.some(
      (schoolDay) => schoolDay.day === weekday.day,
    );

    if (!doesWeekdayExist) {
      await schoolDayAdapter
        .addSchoolDay({ schoolId: Number(selectedSchool?.id), day: weekday.id })
        .then((res) => {
          const daysOrder = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];

          setSchoolDays((prevSubjects: SchoolDay[]) =>
            [...prevSubjects, res].sort((a: SchoolDay, b: SchoolDay) => {
              if (typeof a.day === "string" && typeof b.day === "string") {
                return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
              } else {
                return Number(a.day) - Number(b.day);
              }
            }),
          );
          toast.success("School day added.");
          return;
        });
    }
  };

  function checkWeekDayInSchoolDays({ weekday }: { weekday: WeekDay }) {
    return schoolDays.some((schoolDay) => schoolDay.day === weekday.day);
  }

  return (
    <>
      <button
        className="rounded bg-blue-300 p-2"
        onClick={() => setIsAddSchoolDay(true)}
      >
        Add Days
      </button>
      <Transition
        show={isAddSchoolDay}
        enter="transition ease-in duration-100"
        enterFrom="transform opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition ease-out duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Dialog
          onClose={() => setIsAddSchoolDay(false)}
          className="fixed inset-0 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-blue-900/25" />
          <Dialog.Panel className="z-10 rounded-2xl bg-white p-8 shadow-xl">
            <Dialog.Title className={"mb-4 text-3xl"}>
              Add School Days
            </Dialog.Title>
            <p className="mb-4">Click days to add them to your school.</p>
            <ul className="grid gap-2 rounded bg-gray-100">
              {weekDays?.map((weekday, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      handleAddSchoolDay({ weekday: weekday });
                    }}
                    disabled={checkWeekDayInSchoolDays({ weekday: weekday })}
                    className={`${
                      checkWeekDayInSchoolDays({ weekday: weekday })
                        ? "bg-blue-300 hover:cursor-not-allowed"
                        : "hover:cursor-pointer hover:bg-blue-300"
                    } w-full rounded p-2 text-left`}
                  >
                    {weekday.day}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAddSchoolDay(false)}
                className="rounded bg-gray-300 px-4 py-1 text-gray-900 hover:bg-gray-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
}
