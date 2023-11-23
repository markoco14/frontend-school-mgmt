import { useUserContext } from "@/src/UserContext";
import Modal from "@/src/modules/core/components/Modal";
import { WeekDay } from "@/src/modules/schedule/entities/WeekDay";
import { scheduleAdapter } from "@/src/modules/schedule/infrastructure/ui/adapters/scheduleAdapter";
import { schoolDayAdapter } from "@/src/modules/schedule/infrastructure/ui/adapters/schoolDayAdapter";
import { SchoolDay } from "@/src/modules/school-mgmt/entities/SchoolDay";
import { addListItem } from "@/src/utils/addListItem";
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

  
  function sortSchoolDays(schoolDayList: SchoolDay[]) {
    const daysOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return schoolDayList.sort((a: SchoolDay, b: SchoolDay) => {
      if (typeof a.day === "string" && typeof b.day === "string") {
        return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
      } else {
        return Number(a.day) - Number(b.day);
      }
    });
  }
  const handleAddSchoolDay = async ({ weekday }: { weekday: WeekDay }) => {
    const doesWeekdayExist = schoolDays.some(
      (schoolDay) => schoolDay.day === weekday.day,
    );

    if (!doesWeekdayExist) {
      await schoolDayAdapter
        .addSchoolDay({ schoolId: Number(selectedSchool?.id), day: weekday.id })
        .then((res) => {
          const updatedList = addListItem(schoolDays, res)
          const sortedList = sortSchoolDays(updatedList);
          setSchoolDays(sortedList);
          toast.success("School day added.");
          return;
        });
    }
  };

  function checkWeekDayInSchoolDays({ weekday }: { weekday: WeekDay }) {
    return schoolDays.some((schoolDay) => schoolDay.day === weekday.day);
  }

  function handleClose() {
    setIsAddSchoolDay(false);
  }

  return (
    <>
      <button
        className="rounded bg-blue-300 p-2"
        onClick={() => setIsAddSchoolDay(true)}
      >
        Add Days
      </button>
      {/*  */}
      <Modal show={isAddSchoolDay} close={handleClose} title="Add School Days">
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
      </Modal>
    </>
  );
}
