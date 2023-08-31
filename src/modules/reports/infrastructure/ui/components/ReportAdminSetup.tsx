import { useState } from "react";

const SelectSubject = ({subject, setSubject, setLevel}: {subject: string; setSubject: Function; setLevel: Function;}) => {
	const subjects = ["Grammar", "Reading", "Phonics"];

	function checkIfSubject({ this_subject}: { this_subject: string }) {
    return this_subject === subject;
  }

	return(
		<article className="bg-blue-200 p-4 rounded mb-4">
			<p className="mb-2">Subject</p>
			<ul className="grid grid-cols-3">
				{subjects?.map((this_subject, index) => (
					<li key={index}>
						<button
							onClick={() => {
								setSubject(this_subject);
								if (
									subject === "Phonics" &&
									(this_subject === "Grammar" || this_subject === "Reading")
								) {
									setLevel(5);
									// setUnit(1);
									// setDay(1);
								}

								if (
									(subject === "Grammar" || subject === "Reading") &&
									this_subject === "Phonics"
								) {
									setLevel(1);
									// setUnit(1);
									// setDay(1);
								}
							}}
							className={`${
								checkIfSubject({ this_subject: this_subject })
									? "bg-blue-500 text-white"
									: "bg-gray-100"
							} w-full py-2 text-center `}
						>
							{this_subject}
						</button>
					</li>
				))}
			</ul>
		</article>
	);
}

const SelectLevel = ({subject, level, setLevel}: {subject: string; level: number, setLevel: Function;}) => {
	const upperLevels = [5, 6, 7, 8, 9, 10, 11, 12];
  const lowerLevels = [1, 2, 3, 4];

	function checkIfLevel({ this_level }: { this_level: number }) {
    return this_level === level;
  }

	return (
		<article className="bg-blue-200 p-4 rounded mb-4">
			<p className="mb-2">Level (Level choices based on subject)</p>
			{subject === "Grammar" || subject === "Reading" ? (
				<ul className="grid grid-cols-6">
					{upperLevels?.map((this_level, index) => (
						<li key={index}>
							<button
								onClick={() => setLevel(this_level)}
								className={`${
									checkIfLevel({ this_level: this_level })
										? "bg-blue-500 text-white"
										: "bg-gray-100"
								} w-full py-2 text-center `}
							>
								{this_level}
							</button>
						</li>
					))}
				</ul>
			) : (
				<ul className="grid grid-cols-4">
					{lowerLevels?.map((this_level, index) => (
						<li key={index}>
							<button
								onClick={() => setLevel(this_level)}
								className={`${
									checkIfLevel({ this_level: this_level })
										? "bg-blue-500 text-white"
										: "bg-gray-100"
								} w-full py-2 text-center `}
							>
								{this_level}
							</button>
						</li>
					))}
				</ul>
			)}
		</article>
	);
}


export default function ReportAdminSetup({
	setReportData,
  setIsConfirmed,
}: {
	setReportData: Function;
  setIsConfirmed: Function;
}) {

  

  const upperDays = [1, 2, "Review"];
  const lowerDays = [1, 2, 3, 4, "Review"];

  const upperUnits = [1, 2, 3, 4, 5, 6];
  const lowerUnits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	const [subject, setSubject] = useState<string>("");
  const [level, setLevel] = useState<number>(5);
  const [unit, setUnit] = useState<number>(1);
  const [day, setDay] = useState<string | number>(1);


  

  

  function checkIfUnit({ this_unit }: { this_unit: number }) {
    return this_unit === unit;
  }

  function checkIfDay({ this_day }: { this_day: string | number }) {
    return this_day === day;
  }

  return (
    <>
			<SelectSubject subject={subject} setLevel={setLevel} setSubject={setSubject}/>
			
			{subject && (
				<SelectLevel subject={subject} level={level} setLevel={setLevel}/>
			)}
			{level === 1000 && (
				<>
					<article className="bg-blue-200 p-4 rounded mb-4">
        <p className="mb-2">Unit (Unit choices based on subject and level)</p>
        {(subject === "Grammar" || subject || "Reading") &&
        level >= 5 &&
        level <= 12 ? (
          <ul className="grid grid-cols-6">
            {upperUnits?.map((this_unit, index) => (
              <li key={index}>
                <button
                  onClick={() => setUnit(this_unit)}
                  className={`${
                    checkIfUnit({ this_unit: this_unit })
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  } w-full py-2 text-center `}
                >
                  {this_unit}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-5">
            {lowerUnits?.map((this_unit, index) => (
              <li key={index}>
                <button
                  onClick={() => setUnit(this_unit)}
                  className={`${
                    checkIfUnit({ this_unit: this_unit })
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  } w-full py-2 text-center `}
                >
                  {this_unit}
                </button>
              </li>
            ))}
          </ul>
        )}
      </article>
      <article className="bg-blue-200 p-4 rounded mb-4">
        <p className="mb-2">Day (Day choices based on subject)</p>
        {subject === "Grammar" || subject === "Reading" ? (
          <ul className="grid grid-cols-4">
            {upperDays?.map((this_day, index) => (
              <li key={index}>
                <button
                  onClick={() => setDay(this_day)}
                  className={`${
                    checkIfDay({ this_day: this_day })
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  } w-full py-2 text-center `}
                >
                  {this_day}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-5">
            {lowerDays?.map((this_day, index) => (
              <li key={index}>
                <button
                  onClick={() => setDay(this_day)}
                  className={`${
                    checkIfDay({ this_day: this_day })
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  } w-full py-2 text-center `}
                >
                  {this_day}
                </button>
              </li>
            ))}
          </ul>
        )}
      </article>
      <button
        className="w-full p-2 rounded bg-blue-900 text-white"
        onClick={() => {
          setIsConfirmed(true);
        }}
      >
        Confirm
      </button>
				</>
			)}
    </>
  );
}