import AuthContext from '@/src/AuthContext';
import { Class } from '@/src/modules/class-mgmt/domain/entities/Class';
import { classAdapter } from '@/src/modules/class-mgmt/infrastructure/adapters/classAdapter';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { reportAdapter } from '../../adapters/reportAdapter';
import Link from 'next/link';

export const ReportList = () => {
	const router = useRouter();
  const { selectedSchool } = useContext(AuthContext);
  const [nameOfDay, setNameOfDay] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [dates, setDates] = useState<string[]>([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [classes, setClasses] = useState<Class[]>();
  useEffect(() => {
    async function getData(numberOfDay: number) {
      await classAdapter.getClassesBySchoolAndDate({ school_id: selectedSchool?.id, date: numberOfDay }).then((res) => {
        setClasses(() => res);
      });
    }
    
    if (!nameOfDay && selectedSchool) {
      const date = new Date();
      const numberOfDay = date.getDay();
      setNameOfDay(dates[numberOfDay]);
      setDate(format(date, "yyyy-MM-dd"));
      getData(numberOfDay);
    }
  }, [selectedSchool, nameOfDay, dates]);

  async function checkOrCreateReports(thisClass: Class, date: string) {
    await reportAdapter
      .getReportByClassAndDate({ class_id: thisClass.id, date: date })
      .then((res) => {
        if (res.id) {
          router.push(`report-mgmt/report-details/${res.id}/`);
        }
        else {
          reportAdapter
            .createReportForClassAndDate({ class_id: thisClass.id, date: date })
            .then((res) => {
              router.push(`report-mgmt/report-details/${res.id}/`);
            });
        }
      });
  }

  return (
    <>
      <h2 className="flex flex-col xs:flex-row justify-between gap-4 items-baseline text-3xl mb-4">
				<span>
					Reports for {nameOfDay}{" "}
				</span>
				<span>
					<input
						type="date"
						className="mb-4 text-xl text-left xs:text-right rounded"
						defaultValue={format(new Date(), "yyyy-MM-dd")}
						onChange={async (e) => {
							const dateObject = new Date(e.target.value);
							const selectedDay = dateObject.getDay();
							if (selectedSchool) {
								await classAdapter
									.getClassesBySchoolAndDate({ school_id: selectedSchool?.id, date: Number(selectedDay) })
									.then((res) => {
										setClasses(res);
									});
							}
							setNameOfDay(dates[selectedDay]);
							setDate(format(dateObject, "yyyy-MM-dd"));
						}}
					/>
				</span>
			</h2>
			<ul className="flex flex-col gap-2">
				{classes?.length === 0 ? (
					<p>There are no classes today</p>
				) : (
					classes?.map((thisClass: Class, index: number) => (
						<li
							key={index}
							className="p-2 rounded-md hover:bg-blue-200 flex justify-between items-baseline"
						>
							<Link href={`/report-mgmt/${thisClass.id}/${date}`}>
								{thisClass.name}
							</Link>
							<div className="flex gap-4">
								{thisClass.class_list.length === 0 ? (
									<Link
										href={`/class-mgmt/${thisClass.id}`}
										className="bg-gray-300 py-1 px-2 rounded disabled:cursor-not-allowed"
									>
										Add Students
									</Link>
								) : (
									<button
										disabled={thisClass.class_list.length === 0}
										className="bg-blue-300 py-1 px-2 rounded disabled:cursor-not-allowed"
										onClick={() => {
											checkOrCreateReports(thisClass, date);
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