import { useUserContext } from "@/src/UserContext";
import Layout from "@/src/modules/core/components/Layout";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ReportSetup = ({
  subject,
  setSubject,
  level,
  setLevel,
  unit,
  setUnit,
  day,
  setDay,
  setIsConfirmed,
}: {
  subject: string;
  setSubject: Function;
  level: number;
  setLevel: Function;
  unit: number;
  setUnit: Function;
  day: string | number;
  setDay: Function;
  setIsConfirmed: Function;
}) => {
  const subjects = ["Grammar", "Reading", "Phonics"];

  const upperLevels = [5, 6, 7, 8, 9, 10, 11, 12];
  const lowerLevels = [1, 2, 3, 4];

  const upperDays = [1, 2, "Review"];
  const lowerDays = [1, 2, 3, 4, "Review"];

  const upperUnits = [1, 2, 3, 4, 5, 6];
  const lowerUnits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function checkIfSubject({ this_subject }: { this_subject: string }) {
    return this_subject === subject;
  }

  function checkIfLevel({ this_level }: { this_level: number }) {
    return this_level === level;
  }

  function checkIfUnit({ this_unit }: { this_unit: number }) {
    return this_unit === unit;
  }

  function checkIfDay({ this_day }: { this_day: string | number }) {
    return this_day === day;
  }

  return (
    <>
      <article className="mb-4 rounded bg-blue-200 p-4">
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
                    setUnit(1);
                    setDay(1);
                  }

                  if (
                    (subject === "Grammar" || subject === "Reading") &&
                    this_subject === "Phonics"
                  ) {
                    setLevel(1);
                    setUnit(1);
                    setDay(1);
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
      <article className="mb-4 rounded bg-blue-200 p-4">
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

      <article className="mb-4 rounded bg-blue-200 p-4">
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
      <article className="mb-4 rounded bg-blue-200 p-4">
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
        className="w-full rounded bg-blue-900 p-2 text-white"
        onClick={() => {
          setIsConfirmed(true);
        }}
      >
        Confirm
      </button>
    </>
  );
};

const ReportDetails = ({ setIsConfirmed }: { setIsConfirmed: Function }) => {
  const students = [
    {
      id: 1,
      first_name: "Emily",
      last_name: "Chen",
      age: 11,
      gender: "Female",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg",
      school_id: 1,
    },
    {
      id: 2,
      first_name: "Charlie",
      last_name: "Chen",
      age: 11,
      gender: "Male",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg",
      school_id: 1,
    },
    {
      id: 3,
      first_name: "Bert",
      last_name: "Chen",
      age: 11,
      gender: "Male",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg",
      school_id: 1,
    },
    {
      id: 4,
      first_name: "Claire",
      last_name: "Chen",
      age: 11,
      gender: "Female",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg",
      school_id: 1,
    },
    {
      id: 5,
      first_name: "Bernice",
      last_name: "Chen",
      age: 11,
      gender: "Female",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg",
      school_id: 1,
    },
    {
      id: 6,
      first_name: "Kyle",
      last_name: "Chen",
      age: 11,
      gender: "Male",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg",
      school_id: 1,
    },
    {
      id: 7,
      first_name: "Brad",
      last_name: "Chen",
      age: 11,
      gender: "Male",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg",
      school_id: 1,
    },
    {
      id: 8,
      first_name: "Cynthia",
      last_name: "Chen",
      age: 11,
      gender: "Female",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg",
      school_id: 1,
    },
    {
      id: 9,
      first_name: "Louise",
      last_name: "Chen",
      age: 11,
      gender: "Female",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg",
      school_id: 1,
    },
    {
      id: 10,
      first_name: "Cameron",
      last_name: "Chen",
      age: 11,
      gender: "Male",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg",
      school_id: 1,
    },
    {
      id: 11,
      first_name: "Brock",
      last_name: "Chen",
      age: 11,
      gender: "Male",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg",
      school_id: 1,
    },
    {
      id: 12,
      first_name: "Cindy",
      last_name: "Chen",
      age: 11,
      gender: "Female",
      photo_url:
        "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg",
      school_id: 1,
    },
  ];

  const [selectedStudent, setSelectedStudent] = useState<any>(students[0]);
  const [absent, setAbsent] = useState<boolean>(false);

  const [homeworkDone, setHomeworkDone] = useState<boolean>(false);
  const [homeworkMistakes, setHomeworkMistakes] = useState<number>(0);
  const [testScore, setTestScore] = useState<number>(0);
  const [testCorrections, setTestCorrections] = useState<number>(0);

  const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <button
        className="mb-4 w-full text-right text-lg text-blue-500"
        onClick={() => setIsConfirmed(false)}
      >
        Edit Report Details
      </button>
      <ul className="sticky top-0 z-10 mb-4 grid grid-cols-6 gap-2 rounded bg-white p-2">
        {students?.map((student, index) => (
          <li key={index}>
            <div className="relative aspect-square ">
              <Image
                src={student.photo_url}
                alt="An image of a student"
                fill={true}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
                style={{ objectFit: "cover" }}
                className="rounded-full"
                onClick={() => {
                  setSelectedStudent(student);
                  setTestScore(0);
                  setHomeworkDone(false);
                  setHomeworkMistakes(0);
                  setTestCorrections(0);
                  setAbsent(false);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      {!selectedStudent ? (
        <article className="mb-4 rounded bg-gray-100 p-2 shadow-inner">
          <p>Choose a student to start writing reports</p>
        </article>
      ) : (
        <article className="mb-4 rounded bg-gray-100 p-2 shadow-inner">
          <div className="mb-4 grid grid-cols-4 items-center gap-4">
            <div className="relative col-span-1 aspect-square">
              <Image
                src={selectedStudent.photo_url}
                alt="An image of a student"
                fill={true}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>
            <div className="col-span-3">
              <p className="mb-2 text-3xl">
                {selectedStudent.first_name} {selectedStudent.last_name}
              </p>
              <div className="flex items-center gap-4">
                <p className="text-xl">Absent?</p>
                <Switch
                  checked={absent}
                  onChange={setAbsent}
                  className={`${absent ? "bg-red-700" : "bg-green-700"}
                    relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      absent ? "translate-x-[28px]" : "translate-x-0"
                    }
                      pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
          </div>
          {!absent ? (
            <>
              <div className="mb-4 grid gap-2 xs:grid-cols-2">
                <div
                  onClick={() => setHomeworkDone(!homeworkDone)}
                  className={`${
                    homeworkDone ? "bg-green-300" : "bg-red-300"
                  } col-span-1 flex flex-col items-center rounded p-2  hover:cursor-pointer`}
                >
                  <p>Homework done?</p>
                  <Switch
                    checked={homeworkDone}
                    onChange={setHomeworkDone}
                    className={`${homeworkDone ? "bg-green-700" : "bg-red-700"}
                      relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        homeworkDone ? "translate-x-[28px]" : "translate-x-0"
                      }
                        pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                <div
                  className={`${homeworkMistakes >= 7 && "bg-red-300"} ${
                    homeworkMistakes <= 6 &&
                    homeworkMistakes >= 4 &&
                    "bg-orange-300"
                  } ${
                    homeworkMistakes < 4 && "bg-green-300"
                  } col-span-1 flex flex-col items-center justify-between rounded p-2`}
                >
                  <p>Homework Corrections?</p>
                  <ul className="grid w-full  grid-cols-5 gap-2 text-center">
                    {scores.map((number, index) => (
                      <li
                        key={index}
                        className={`${
                          homeworkMistakes === number
                            ? "bg-blue-500"
                            : "bg-white"
                        } block rounded p-2`}
                        onClick={() => setHomeworkMistakes(number)}
                      >
                        {number}
                      </li>
                    ))}
                  </ul>
                  {/* <input 
                    type="number"
                    min={0}
                    max={10}
                    defaultValue={homeworkMistakes}
                    onChange={(e) => {
                      setHomeworkMistakes(Number(e.target.value))
                    }}
                    className="hidden xs:block text-3xl text-center"
                  /> */}
                </div>
              </div>
              <div className="mb-4 grid gap-2 xs:grid-cols-2">
                <div
                  className={`${testScore >= 7 && "bg-green-300"} ${
                    testScore <= 6 && testScore >= 4 && "bg-orange-300"
                  } ${
                    testScore < 6 && "bg-red-300"
                  } col-span-1 flex flex-col items-center justify-between rounded p-2`}
                >
                  <p>Test Score?</p>
                  <ul className="grid w-full  grid-cols-5 gap-2 text-center">
                    {scores.map((number, index) => (
                      <li
                        key={index}
                        className={`${
                          testScore === number ? "bg-blue-500" : "bg-white"
                        } block rounded p-2`}
                        onClick={() => setTestScore(number)}
                      >
                        {number}
                      </li>
                    ))}
                  </ul>
                  {/* <input 
                    type="number"
                    min={0}
                    max={10}
                    defaultValue={testScore}
                    onChange={(e) => {
                      setTestScore(Number(e.target.value))
                    }}
                    className="hidden xs:block text-3xl text-center"
                  /> */}
                </div>
                <div
                  className={`${testCorrections >= 7 && "bg-red-300"} ${
                    testCorrections <= 6 &&
                    testCorrections >= 4 &&
                    "bg-orange-300"
                  } ${
                    testCorrections < 4 && "bg-green-300"
                  } col-span-1 flex flex-col items-center justify-between rounded p-2`}
                >
                  <p>Test Corrections?</p>
                  <ul className="grid w-full  grid-cols-5 gap-2 text-center">
                    {scores.map((number, index) => (
                      <li
                        key={index}
                        className={`${
                          testCorrections === number
                            ? "bg-blue-500"
                            : "bg-white"
                        } block rounded p-2 `}
                        onClick={() => setTestCorrections(number)}
                      >
                        {number}
                      </li>
                    ))}
                  </ul>
                  {/* <input 
                    type="number"
                    min={0}
                    max={10}
                    defaultValue={testCorrections}
                    onChange={(e) => {
                      setTestCorrections(Number(e.target.value))
                    }}
                    className="hidden  text-3xl text-center"
                  /> */}
                </div>
              </div>
              <div className="grid">
                <label>Comment</label>

                <TextareaAutosize
                  minRows={2}
                  className="brounded border p-2 shadow-inner"
                />
              </div>
            </>
          ) : (
            <article className="mb-4 rounded bg-white p-2 shadow">
              <p>No report for {selectedStudent.first_name} today.</p>
            </article>
          )}
        </article>
      )}
    </>
  );
};

export default function WriteReport() {
  const { user } = useUserContext();
  const [subject, setSubject] = useState<string>("Grammar");
  const [level, setLevel] = useState<number>(5);
  const [unit, setUnit] = useState<number>(1);
  const [day, setDay] = useState<string | number>(1);

  const [isConfirmed, setIsConfirmed] = useState<boolean>(
    user?.role === "TEACHER" ? true : false,
  );

  const date = new Date();

  return (
    <Layout>
      <div>
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2>
              <span className="text-lg text-gray-500">
                {date.toDateString()}
              </span>{" "}
              <br></br>
            </h2>
            <Link
              href="/"
              className="hover:text-blue-700 hover:underline hover:underline-offset-2"
            >
              Back
            </Link>
          </div>
        </section>
        <section>
          {!isConfirmed ? (
            <>
              <h2 className="mb-4 text-3xl">
                Level 9 Monday/Thursday (Andrew)
              </h2>
              <ReportSetup
                subject={subject}
                setSubject={setSubject}
                level={level}
                setLevel={setLevel}
                unit={unit}
                setUnit={setUnit}
                day={day}
                setDay={setDay}
                setIsConfirmed={setIsConfirmed}
              />
            </>
          ) : (
            <ReportDetails setIsConfirmed={setIsConfirmed} />
          )}
        </section>
      </div>
    </Layout>
  );
}
