import AuthContext from '@/src/AuthContext';
import { Class } from '@/src/modules/classes/domain/entities/Class';
import { classAdapter } from '@/src/modules/classes/infrastructure/adapters/classAdapter';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { reportAdapter } from '../../adapters/reportAdapter';

export const ReportList = () => {
	const router = useRouter();
  const { selectedSchool } = useContext(AuthContext);
	const [classes, setClasses] = useState<Class[]>();
	const [date, setDate] = useState<Date>(new Date())

  const dates = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    async function getData() {
      await classAdapter.listSchoolTodayClasses({ school_id: selectedSchool?.id, date: date.getDay() }).then((res) => {
        setClasses(() => res);
      });
    }
    if (selectedSchool) {
			getData();
		}
  }, [date, selectedSchool]);

  async function checkOrCreateReports(thisClass: Class, date: string) {
    await reportAdapter
      .getReportByClassAndDate({ class_id: thisClass.id, date: date })
      .then((res) => {
        if (res.id) {
          router.push(`reports/report-details/${res.id}/`);
        }
        else {
          reportAdapter
            .createReportForClassAndDate({ class_id: thisClass.id, date: date })
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
      <h2 className="flex flex-col xs:flex-row xs:justify-between xs:gap-2 items-baseline text-3xl mb-4 xs:mb-0">
				<span>
					Reports for {dates[date.getDay()]}{" "}
				</span>
				<span>
					<input
						type="date"
						className="xs:mb-4 text-xl text-left xs:text-right rounded"
						value={format(date, "yyyy-MM-dd")}
						onChange={async (e) => {
							const newDate = new Date(e.target.value);

							if (selectedSchool) {
								await classAdapter
									.listSchoolTodayClasses({ school_id: selectedSchool?.id, date: newDate.getDay() })
									.then((res) => {
										setClasses(res);
									});
							}					

							setDate(newDate)
						}}
					/>
				</span>
			</h2>
			<div className='flex justify-between xs:justify-center gap-4 mb-2'>
				<button className='w-full flex items-center justify-center' onClick={decrementDate}>
					<span className="material-symbols-outlined">
						navigate_before
					</span>
				</button>
				<button className='w-full flex items-center justify-center' onClick={incrementDate}>
					<span className="material-symbols-outlined">
						navigate_next
					</span>
				</button>
			</div>
			<hr className='mb-2'></hr>
			<ul className="flex flex-col gap-2 divide-y">
				{classes?.length === 0 ? (
					<p>There are no classes today</p>
				) : (
					classes?.map((thisClass: Class, index: number) => (
						<li
							key={index}
							className="p-2 rounded-md hover:bg-blue-200 flex justify-between items-baseline"
						>
							<span>
								{thisClass.name}
							</span>
							<div className="flex gap-4">
								{thisClass.class_list?.length === 0 ? (
									<Link
										href={`/class-mgmt/${thisClass.id}`}
										className="bg-gray-300 py-1 px-2 rounded disabled:cursor-not-allowed"
									>
										Add Students
									</Link>
								) : (
									<button
										disabled={thisClass.class_list?.length === 0}
										className="bg-blue-300 py-1 px-2 rounded disabled:cursor-not-allowed"
										onClick={() => {
											checkOrCreateReports(thisClass, format(date, "yyyy-MM-dd"));
										}}
									>
										Write reports
									</button>
								)}
							</div>
						</li>
					))
				)}
			</ul>
    </>
  );
};