import { useState } from "react";

const SelectSubject = ({subject, setSubject, setLevel}: {subject: string; setSubject: Function; setLevel: Function;}) => {
	const subjects = ["Grammar", "Reading", "Phonics"];

	function checkIfSubject({ this_subject}: { this_subject: string }) {
    return this_subject === subject;
  }

	return(
		<article className="border shadow p-4 rounded">
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
								}

								if (
									(subject === "Grammar" || subject === "Reading") &&
									this_subject === "Phonics"
								) {
									setLevel(1);
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

const SelectLevel = ({subject, level, setLevel}: {subject: string; level: number | undefined, setLevel: Function;}) => {
	const upperLevels = [5, 6, 7, 8, 9, 10, 11, 12];
  const lowerLevels = [1, 2, 3, 4];

	function checkIfLevel({ this_level }: { this_level: number }) {
    return this_level === level;
  }

	return (
		<article className="border shadow p-4 rounded">
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

const SelectUnit = ({subject, level, unit, setUnit}: {subject: string; level: number | undefined; unit: number | undefined; setUnit: Function;}) => {
	const upperUnits = [1, 2, 3, 4, 5, 6];
  const lowerUnits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	function checkIfUnit({ this_unit }: { this_unit: number }) {
    return this_unit === unit;
  }


	return(
		<article className="border shadow p-4 rounded">
        <p className="mb-2">Unit (Unit choices based on subject and level)</p>
        {(subject === "Grammar" || subject || "Reading") && level &&
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
  function checkIfDay({ this_day }: { this_day: string | number }) {
    return this_day === day;
  }

  

	const [subject, setSubject] = useState<string>("");
  const [level, setLevel] = useState<number | undefined>();
  const [unit, setUnit] = useState<number | undefined>();
  const [day, setDay] = useState<string | number>();

	const [hasPrevHmwk, setHasPrevHmwk] = useState<boolean>(false);
	const [prevHmwkAssessments, setPrevHmwkAssessments] = useState<any[]>([]);

	const [hasInClass, setHasInClass] = useState<boolean>(false);
	const [inClassAssessments, setInClassAssessments] = useState<any[]>([])

	const [hasNextHmwk, setHasNextHmwk] = useState<boolean>(false);
	const [nextHmwkAssessments, setNextHmwkAssessments] = useState<any[]>([]);

  return (
		<div className="relative min-h-screen grid sm:grid-cols-4 gap-4">
			<div className="grid gap-4 sm:col-span-3">
				<SelectSubject subject={subject} setLevel={setLevel} setSubject={setSubject}/>
				{subject && (
					<SelectLevel subject={subject} level={level} setLevel={setLevel}/>
				)}
				{subject && level && (
					<SelectUnit subject={subject} level={level} unit={unit} setUnit={setUnit}/>
				)}
				{subject && level && unit && (
					<article className="border shadow p-4 rounded">
						<h2>Previous Homework?</h2>
						<label htmlFor="prevHmwk">
							<span>No</span>
							<input onChange={() => {
								setHasPrevHmwk(false)
								if (prevHmwkAssessments.length > 0) {
									setPrevHmwkAssessments([])
								}
								}}  type="checkbox" checked={!hasPrevHmwk}/>
						</label>
						<label htmlFor="">
							<span>Yes</span>
							<input onChange={() => {
								setHasPrevHmwk(true)
							}} type="checkbox" checked={hasPrevHmwk}/>
						</label>
					</article>
				)}
				{hasPrevHmwk && (
					<article className="border shadow p-4 rounded">
						<h2>Previous class homework</h2>
						<ul>
							<li className={`${prevHmwkAssessments.includes('Exercise 1') && 'bg-blue-300'}`}>
								<span onClick={() => setPrevHmwkAssessments((prev) => [...prev, 'Exercise 1'])}>
									Exercise 1
								</span>
								{prevHmwkAssessments.includes('Exercise 1') && <button onClick={() => setPrevHmwkAssessments((prev) => prev.filter((assessment) => assessment !== 'Exercise 1'))}>Remove</button>}
							</li>
							<li className={`${prevHmwkAssessments.includes('Exercise 2') && 'bg-blue-300'}`}>
								<span onClick={() => setPrevHmwkAssessments((prev) => [...prev, 'Exercise 2'])}>
									Exercise 2
								</span>
								{prevHmwkAssessments.includes('Exercise 2') && <button onClick={() => setPrevHmwkAssessments((prev) => prev.filter((assessment) => assessment !== 'Exercise 2'))}>Remove</button>}
							</li>
							<li className={`${prevHmwkAssessments.includes('Test 1') && 'bg-blue-300'}`}>
								<span onClick={() => setPrevHmwkAssessments((prev) => [...prev, 'Test 1'])}>
									Test 1
								</span>
								{prevHmwkAssessments.includes('Test 1') && <button onClick={() => setPrevHmwkAssessments((prev) => prev.filter((assessment) => assessment !== 'Test 1'))}>Remove</button>}
							</li>
							<li className={`${prevHmwkAssessments.includes('Test 2') && 'bg-blue-300'}`}>
								<span onClick={() => setPrevHmwkAssessments((prev) => [...prev, 'Test 2'])}>
									Test 2
								</span>
								{prevHmwkAssessments.includes('Test 2') && <button onClick={() => setPrevHmwkAssessments((prev) => prev.filter((assessment) => assessment !== 'Test 2'))}>Remove</button>}
							</li>
						</ul>
					</article>
				)}
				{subject && level && unit && (
					<article className="border shadow p-4 rounded">
						<h2>In Class Assessments?</h2>
						<label htmlFor="inClass">
							<span>No</span>
							<input onChange={() => {
								setHasInClass(false)
								if (inClassAssessments.length > 0) {
									setInClassAssessments([])
								}
								}}  type="checkbox" checked={!hasInClass}/>
						</label>
						<label htmlFor="">
							<span>Yes</span>
							<input onChange={() => setHasInClass(true)} type="checkbox" checked={hasInClass}/>
						</label>
					</article>
				)}
				{hasInClass && (
					<article className="border shadow p-4 rounded">
						<h2>In Class Assessments</h2>
						<ul>
							<li className={`${inClassAssessments.includes('Exercise 1') && 'bg-blue-300'}`}>
								<span onClick={() => setInClassAssessments((prev) => [...prev, 'Exercise 1'])}>
									Exercise 1
								</span>
								{inClassAssessments.includes('Exercise 1') && <button onClick={() => setInClassAssessments((prev) => prev.filter((assessment) => assessment !== 'Exercise 1'))}>Remove</button>}
							</li>
							<li className={`${inClassAssessments.includes('Exercise 2') && 'bg-blue-300'}`}>
								<span onClick={() => setInClassAssessments((prev) => [...prev, 'Exercise 2'])}>
									Exercise 2
								</span>
								{inClassAssessments.includes('Exercise 2') && <button onClick={() => setInClassAssessments((prev) => prev.filter((assessment) => assessment !== 'Exercise 2'))}>Remove</button>}
							</li>
							<li className={`${inClassAssessments.includes('Test 1') && 'bg-blue-300'}`}>
								<span onClick={() => setInClassAssessments((prev) => [...prev, 'Test 1'])}>
									Test 1
								</span>
								{inClassAssessments.includes('Test 1') && <button onClick={() => setInClassAssessments((prev) => prev.filter((assessment) => assessment !== 'Test 1'))}>Remove</button>}
							</li>
							<li className={`${inClassAssessments.includes('Test 2') && 'bg-blue-300'}`}>
								<span onClick={() => setInClassAssessments((prev) => [...prev, 'Test 2'])}>
									Test 2
								</span>
								{inClassAssessments.includes('Test 2') && <button onClick={() => setInClassAssessments((prev) => prev.filter((assessment) => assessment !== 'Test 2'))}>Remove</button>}
							</li>
						</ul>
					</article>
				)}
				{subject && level && unit && (
					<article className="border shadow p-4 rounded">
						<h2>Next Homework?</h2>
						<label htmlFor="prevHmwk">
							<span>No</span>
							<input onChange={() => {
								setHasNextHmwk(false)
								if (nextHmwkAssessments.length > 0) {
									setNextHmwkAssessments([])
								}
								}}  type="checkbox" checked={!hasNextHmwk}/>
						</label>
						<label htmlFor="">
							<span>Yes</span>
							<input onChange={() => setHasNextHmwk(true)} type="checkbox" checked={hasNextHmwk}/>
						</label>
					</article>
				)}
				{hasNextHmwk && (
					<article className="border shadow p-4 rounded">
						<h2>Homework for next class</h2>
						<ul>
							<li className={`${nextHmwkAssessments.includes('Exercise 1') && 'bg-blue-300'}`}>
								<span onClick={() => setNextHmwkAssessments((prev) => [...prev, 'Exercise 1'])}>
									Exercise 1
								</span>
								{nextHmwkAssessments.includes('Exercise 1') && <button onClick={() => setNextHmwkAssessments((prev) => prev.filter((assessment) => assessment !== 'Exercise 1'))}>Remove</button>}
							</li>
							<li className={`${nextHmwkAssessments.includes('Exercise 2') && 'bg-blue-300'}`}>
								<span onClick={() => setNextHmwkAssessments((prev) => [...prev, 'Exercise 2'])}>
									Exercise 2
								</span>
								{nextHmwkAssessments.includes('Exercise 2') && <button onClick={() => setNextHmwkAssessments((prev) => prev.filter((assessment) => assessment !== 'Exercise 2'))}>Remove</button>}
							</li>
							<li className={`${nextHmwkAssessments.includes('Test 1') && 'bg-blue-300'}`}>
								<span onClick={() => setNextHmwkAssessments((prev) => [...prev, 'Test 1'])}>
									Test 1
								</span>
								{nextHmwkAssessments.includes('Test 1') && <button onClick={() => setNextHmwkAssessments((prev) => prev.filter((assessment) => assessment !== 'Test 1'))}>Remove</button>}
							</li>
							<li className={`${nextHmwkAssessments.includes('Test 2') && 'bg-blue-300'}`}>
								<span onClick={() => setNextHmwkAssessments((prev) => [...prev, 'Test 2'])}>
									Test 2
								</span>
								{nextHmwkAssessments.includes('Test 2') && <button onClick={() => setNextHmwkAssessments((prev) => prev.filter((assessment) => assessment !== 'Test 2'))}>Remove</button>}
							</li>
						</ul>
					</article>
				)}
				{subject && level && unit && (
					<article className="border shadow p-4 rounded">
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
				)}
				{subject && level && unit && day && (
					<button
						className="w-full p-2 rounded bg-blue-900 text-white"
						onClick={() => {
							setIsConfirmed(true);
							setReportData({
								subject: subject,
								level: level,
								unit: unit,
								hasPrevHmwk: hasPrevHmwk,
								prevHmwkAssessments: prevHmwkAssessments,
								hasInClass: hasInClass,
								inClassAssessments: inClassAssessments,
								hasNextHmwk: hasNextHmwk,
								nextHmwkAssessments: nextHmwkAssessments,
								day: day,
							});
						}}
					>
						Confirm
					</button>
				)}
			</div>
			<div className="sticky top-0 col-span-1">
				<article className="border shadow p-4 rounded">
					<h2>Summary</h2>
					<p>Subject: {!subject ? 'Not chosen': subject}</p>
					<p>Level: {!level ? 'Not chosen': level}</p>
					<p>Unit: {!unit ? 'Not chosen': unit}</p>
					<p>Prev Hmwk? {hasPrevHmwk ? "Yes": "No"}</p>
					<p>Prev Hmwk Assessments</p>
					{prevHmwkAssessments.map((assessment, index) => (
						<li key={index}>{assessment}</li>
					))}
					<p>In Class? {hasInClass ? "Yes": "No"}</p>
					<p>In Class Assessments</p>
					{inClassAssessments.map((assessment, index) => (
						<li key={index}>{assessment}</li>
					))}
					<p>Next Hmwk? {hasNextHmwk ? "Yes": "No"}</p>
					<p>Next Hmwk Assessments</p>
					{nextHmwkAssessments.map((assessment, index) => (
						<li key={index}>{assessment}</li>
					))}
					<p>Day: {!day ? 'Not chosen': day}</p>
				</article>
			</div>
		</div>
  );
}