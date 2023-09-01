import { useState } from "react";

const SelectSubject = ({
  subject,
  setSubject,
  setLevel,
}: {
  subject: string;
  setSubject: Function;
  setLevel: Function;
}) => {
  const subjects = ["Grammar", "Reading", "Phonics"];

  function checkIfSubject({ this_subject }: { this_subject: string }) {
    return this_subject === subject;
  }

  return (
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
};

const SelectLevel = ({
  subject,
  level,
  setLevel,
}: {
  subject: string;
  level: number | undefined;
  setLevel: Function;
}) => {
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
};

const SelectUnit = ({
  subject,
  level,
  unit,
  setUnit,
}: {
  subject: string;
  level: number | undefined;
  unit: number | undefined;
  setUnit: Function;
}) => {
  const upperUnits = [1, 2, 3, 4, 5, 6];
  const lowerUnits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function checkIfUnit({ this_unit }: { this_unit: number }) {
    return this_unit === unit;
  }

  return (
    <article className="border shadow p-4 rounded">
      <p className="mb-2">Unit (Unit choices based on subject and level)</p>
      {(subject === "Grammar" || subject || "Reading") &&
      level &&
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
};

const AssessmentSelector = ({
  title,
  hasAsssessments,
  setHasAssessments,
  assessments,
  setAssessments,
}: {
  title: string;
  hasAsssessments: boolean;
  setHasAssessments: Function;
  assessments: any[];
  setAssessments: Function;
}) => {
  return (
    <>
      <article className="border shadow p-4 rounded">
        <h2>{title}</h2>
        <label htmlFor="prevHmwk">
          <span>No</span>
          <input
            onChange={() => {
              setHasAssessments(false);
              if (assessments.length > 0) {
                setAssessments([]);
              }
            }}
            type="checkbox"
            checked={!hasAsssessments}
          />
        </label>
        <label htmlFor="">
          <span>Yes</span>
          <input
            onChange={() => {
              setHasAssessments(true);
            }}
            type="checkbox"
            checked={hasAsssessments}
          />
        </label>
      </article>
      {hasAsssessments && (
        <article className="border shadow p-4 rounded">
          <h2>Assessments</h2>
          <ul>
            <li
              className={`${
                assessments.includes("Exercise 1") && "bg-blue-300"
              }`}
            >
              <span
                onClick={() =>
                  setAssessments((prev: any) => [...prev, "Exercise 1"])
                }
              >
                Exercise 1
              </span>
              {assessments.includes("Exercise 1") && (
                <button
                  onClick={() =>
                    setAssessments((prev: any) =>
                      prev.filter(
                        (assessment: any) => assessment !== "Exercise 1"
                      )
                    )
                  }
                >
                  Remove
                </button>
              )}
            </li>
            <li
              className={`${
                assessments.includes("Exercise 2") && "bg-blue-300"
              }`}
            >
              <span
                onClick={() =>
                  setAssessments((prev: any) => [...prev, "Exercise 2"])
                }
              >
                Exercise 2
              </span>
              {assessments.includes("Exercise 2") && (
                <button
                  onClick={() =>
                    setAssessments((prev: any) =>
                      prev.filter(
                        (assessment: any) => assessment !== "Exercise 2"
                      )
                    )
                  }
                >
                  Remove
                </button>
              )}
            </li>
            <li
              className={`${assessments.includes("Test 1") && "bg-blue-300"}`}
            >
              <span
                onClick={() =>
                  setAssessments((prev: any) => [...prev, "Test 1"])
                }
              >
                Test 1
              </span>
              {assessments.includes("Test 1") && (
                <button
                  onClick={() =>
                    setAssessments((prev: any) =>
                      prev.filter((assessment: any) => assessment !== "Test 1")
                    )
                  }
                >
                  Remove
                </button>
              )}
            </li>
            <li
              className={`${assessments.includes("Test 2") && "bg-blue-300"}`}
            >
              <span
                onClick={() =>
                  setAssessments((prev: any) => [...prev, "Test 2"])
                }
              >
                Test 2
              </span>
              {assessments.includes("Test 2") && (
                <button
                  onClick={() =>
                    setAssessments((prev: any) =>
                      prev.filter((assessment: any) => assessment !== "Test 2")
                    )
                  }
                >
                  Remove
                </button>
              )}
            </li>
          </ul>
        </article>
      )}
    </>
  );
};

const DaySelector = ({
  subject,
  day,
  setDay,
}: {
  subject: any;
  day: number | string | undefined;
  setDay: Function;
}) => {
  const upperDays = [1, 2, "Review"];
  const lowerDays = [1, 2, 3, 4, "Review"];
  function checkIfDay({ this_day }: { this_day: string | number }) {
    return this_day === day;
  }
  return (
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
  );
};

const SummaryBar = ({
  subject,
  level,
  unit,
  hasPrevHmwk,
  prevHmwkAssessments,
  hasInClass,
  inClassAssessments,
  hasNextHmwk,
  nextHmwkAssessments,
  day,
  setIsConfirmed,
  setReportData,
}: {
  subject: string;
  level: number | undefined;
  unit: number | undefined;
  hasPrevHmwk: boolean;
  prevHmwkAssessments: any[];
  hasInClass: boolean;
  inClassAssessments: any[];
  hasNextHmwk: boolean;
  nextHmwkAssessments: any[];
  day: number | string | undefined;
  setIsConfirmed: Function;
  setReportData: Function;
}) => {
  return (
    <div className="sm:row-span-2 col-span-1">
      <article className="sticky grid gap-4 top-4 border shadow p-4 rounded">
        <div>
          <h2>Summary</h2>
          <p>Subject: {!subject ? "Not chosen" : subject}</p>
          <p>Level: {!level ? "Not chosen" : level}</p>
          <p>Unit: {!unit ? "Not chosen" : unit}</p>
          <p>Prev Hmwk? {hasPrevHmwk ? "Yes" : "No"}</p>
          <p>Prev Hmwk Assessments</p>
          {prevHmwkAssessments.map((assessment, index) => (
            <li key={index}>{assessment}</li>
          ))}
          <p>In Class? {hasInClass ? "Yes" : "No"}</p>
          <p>In Class Assessments</p>
          {inClassAssessments.map((assessment, index) => (
            <li key={index}>{assessment}</li>
          ))}
          <p>Next Hmwk? {hasNextHmwk ? "Yes" : "No"}</p>
          <p>Next Hmwk Assessments</p>
          {nextHmwkAssessments.map((assessment, index) => (
            <li key={index}>{assessment}</li>
          ))}
          <p>Day: {!day ? "Not chosen" : day}</p>
        </div>
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
      </article>
    </div>
  );
};

export default function ReportAdminSetup({
  setReportData,
  setIsConfirmed,
}: {
  setReportData: Function;
  setIsConfirmed: Function;
}) {
  const [subject, setSubject] = useState<string>("");
  const [level, setLevel] = useState<number | undefined>();
  const [unit, setUnit] = useState<number | undefined>();
  const [day, setDay] = useState<string | number | undefined>();

  const [hasPrevHmwk, setHasPrevHmwk] = useState<boolean>(false);
  const [prevHmwkAssessments, setPrevHmwkAssessments] = useState<any[]>([]);

  const [hasInClass, setHasInClass] = useState<boolean>(false);
  const [inClassAssessments, setInClassAssessments] = useState<any[]>([]);

  const [hasNextHmwk, setHasNextHmwk] = useState<boolean>(false);
  const [nextHmwkAssessments, setNextHmwkAssessments] = useState<any[]>([]);

  return (
    <section className="relative grid grid-cols-1 justify-start sm:grid-cols-4 gap-4">
      <div className="grid gap-4 col-span-1 sm:col-span-3">
        <SelectSubject
          subject={subject}
          setLevel={setLevel}
          setSubject={setSubject}
        />
        {subject && (
          <SelectLevel subject={subject} level={level} setLevel={setLevel} />
        )}
        {subject && level && (
          <SelectUnit
            subject={subject}
            level={level}
            unit={unit}
            setUnit={setUnit}
          />
        )}
        {/* DUE TODAY HOMEWORK SECTION */}
        {subject && level && unit && (
          <AssessmentSelector
            title={"Previous Homework Assessments?"}
            hasAsssessments={hasPrevHmwk}
            setHasAssessments={setHasPrevHmwk}
            assessments={prevHmwkAssessments}
            setAssessments={setPrevHmwkAssessments}
          />
        )}
					{/* IN CLASS ASSESSMENT SECTION */}
        {subject && level && unit && (
          <AssessmentSelector
            title={"In Class Assessments?"}
            hasAsssessments={hasInClass}
            setHasAssessments={setHasInClass}
            assessments={prevHmwkAssessments}
            setAssessments={setInClassAssessments}
          />
        )}
				{/* NEW HOMEWORK ASSESSMENT SECTION */}
        {subject && level && unit && (
          <AssessmentSelector
            title={"New Homework Assessments?"}
            hasAsssessments={hasNextHmwk}
            setHasAssessments={setHasNextHmwk}
            assessments={prevHmwkAssessments}
            setAssessments={setNextHmwkAssessments}
          />
        )}
        {subject && level && unit && (
          <DaySelector subject={subject} day={day} setDay={setDay} />
        )}
      </div>
      <SummaryBar
        subject={subject}
        level={level}
        unit={unit}
        hasPrevHmwk={hasPrevHmwk}
        prevHmwkAssessments={prevHmwkAssessments}
        hasInClass={hasInClass}
        inClassAssessments={inClassAssessments}
        hasNextHmwk={hasNextHmwk}
        nextHmwkAssessments={nextHmwkAssessments}
        day={day}
        setIsConfirmed={setIsConfirmed}
        setReportData={setReportData}
      />
    </section>
  );
}
