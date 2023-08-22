import AuthContext from "@/src/AuthContext";
import { SchoolDay } from "@/src/modules/schedule/domain/entities/SchoolDay";
import { WeekDay } from "@/src/modules/schedule/domain/entities/WeekDay";
import { scheduleAdapter } from "@/src/modules/schedule/infrastructure/ui/adapters/scheduleAdapter";
import { schoolDayAdapter } from "@/src/modules/schedule/infrastructure/ui/adapters/schoolDayAdapter";
import { Dialog, Transition } from "@headlessui/react";
import { useContext, useEffect, useState, } from "react";
import toast from "react-hot-toast";

export default function AddSchoolDay({schoolDays, setSchoolDays}: {schoolDays: SchoolDay[]; setSchoolDays: Function;}) {
	const { selectedSchool } = useContext(AuthContext);
  const [isAddSchoolDay, setIsAddSchoolDay] = useState<boolean>(false)
	const [weekDays, setWeekDays] = useState<WeekDay[]>([])

	useEffect(() => {
		async function getWeekDays() {
			await scheduleAdapter.listWeekDays()
			.then((res) => {
				setWeekDays(res)
			})
		}
    

		getWeekDays();
  }, [selectedSchool])

	const handleAddSchoolDay = async ({weekday}: {weekday: WeekDay}) => {
		// @ts-ignore
		const doesWeekdayExist = schoolDays.some((schoolDay) => schoolDay.day === weekday.day);

		if (!doesWeekdayExist) {
			// TODO: change this to adapter response
			await schoolDayAdapter.addSchoolDay({schoolId: selectedSchool.id, day: weekday.id})
			.then((res) => {
				const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
				// because prevSubjects implicity has any type
				// @ts-ignore
				setSchoolDays((prevSubjects: SchoolDay[]) => [...prevSubjects, res].sort((a: SchoolDay, b: SchoolDay) => {
					return daysOrder.indexOf(a.day.toString()) - daysOrder.indexOf(b.day.toString());
				}))
				toast.success('School day added.')
				return
			})
		} 
	}

  return (
    <>
      <button 
			className="bg-blue-300 p-2 rounded" 
			onClick={() => setIsAddSchoolDay(true)}
			>
				Add Days</button>
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
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
            <Dialog.Title className={'text-3xl mb-4'}>Add School Days</Dialog.Title>
						<p className="mb-4">Click days to add them to your school.</p>
						<ul className="bg-gray-100 rounded grid gap-2">
							{weekDays?.map((weekday, index) => (
								<li key={index}
									// @ts-ignore
									disabled={schoolDays.some((schoolDay) => schoolDay.day === weekday.day) ? true : false}
									onClick={() => {handleAddSchoolDay({weekday: weekday}) }}
									// @ts-ignore
									className={`${schoolDays.some((schoolDay) => schoolDay.day === weekday.day) ? 'bg-blue-300 hover:cursor-not-allowed' : 'hover:bg-blue-300 hover:cursor-pointer'} p-2 rounded`}
								>{weekday.day}</li>
							))}
						</ul>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAddSchoolDay(false)}
                className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
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
