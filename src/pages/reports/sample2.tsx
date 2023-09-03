import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';


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
  );
};

const ReportDetails = ({ setIsConfirmed }: { setIsConfirmed: Function }) => {
	const students = [
		{
      id: 1,
      first_name: 'Emily',
      last_name: 'Chen',
      age: 11,
      gender: 'Female',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg',
      school_id: 1,
			absent: false,
		},
		{
      id: 2,
      first_name: 'Charlie',
      last_name: 'Chen',
      age: 11,
      gender: 'Male',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg',
      school_id: 1,
			absent: false,
		},
		{
      id: 3,
      first_name: 'Bert',
      last_name: 'Chen',
      age: 11,
      gender: 'Male',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg',
      school_id: 1,
			absent: true,
		},
		{
      id: 4,
      first_name: 'Claire',
      last_name: 'Chen',
      age: 11,
      gender: 'Female',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg',
      school_id: 1,
			absent: false,
		},
		{
      id: 5,
      first_name: 'Bernice',
      last_name: 'Chen',
      age: 11,
      gender: 'Female',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg',
      school_id: 1,
			absent: true,
		},
		{
      id: 6,
      first_name: 'Kyle',
      last_name: 'Chen',
      age: 11,
      gender: 'Male',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg',
      school_id: 1,
			absent: false,
		},
		{
      id: 7,
      first_name: 'Brad',
      last_name: 'Chen',
      age: 11,
      gender: 'Male',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg',
      school_id: 1,
			absent: false,
		},
		{
      id: 8,
      first_name: 'Cynthia',
      last_name: 'Chen',
      age: 11,
      gender: 'Female',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg',
      school_id: 1,
			absent: false,
		},
		{
      id: 9,
      first_name: 'Louise',
      last_name: 'Chen',
      age: 11,
      gender: 'Female',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_1.jpeg',
      school_id: 1,
			absent: false,
		},
		{
      id: 10,
      first_name: 'Cameron',
      last_name: 'Chen',
      age: 11,
      gender: 'Male',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_2.jpeg',
      school_id: 1,
			absent: true,
		},
		{
      id: 11,
      first_name: 'Brock',
      last_name: 'Chen',
      age: 11,
      gender: 'Male',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg',
      school_id: 1,
			absent: false,
		},
		{
      id: 12,
      first_name: 'Cindy',
      last_name: 'Chen',
      age: 11,
      gender: 'Female',
			photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg',
      school_id: 1,
			absent: false,
		},
	]

	const { user } = useContext(AuthContext);

  const [selectedStudent, setSelectedStudent] = useState<any>(students[0]);
  const [absent, setAbsent] = useState<boolean>(false)
	const [category, setCategory] = useState<string>('homework')

  const [homeworkDone, setHomeworkDone] = useState<boolean>(false);
  const [homeworkMistakes, setHomeworkMistakes] = useState<number>(0);
  const [testScore, setTestScore] = useState<number>(0);
  const [testCorrections, setTestCorrections] = useState<number>(0);

  const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
		<>
			<ul className="grid grid-cols-6 gap-2 p-2 mb-4 rounded sticky top-0 bg-white z-10">
				{students?.map((student, index) => (
					<li key={index}>
						<div className={`relative aspect-square`}>
							<Image 
								src={student.photo_url}
								alt='An image of a student'
								fill={true}
								sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
								style={{ objectFit: 'cover' }}
								className={`${selectedStudent.id === student.id && 'border-2 border-green-300 scale-125'} rounded-full`}
                onClick={() => {
                  setSelectedStudent(student);
                  setTestScore(0);
                  setHomeworkDone(false);
                  setHomeworkMistakes(0);
                  setTestCorrections(0);
                  setAbsent(student.absent);
                }}
							/>
						</div>

					</li>
				))}
			</ul>
      {!selectedStudent ? (
        <article className="p-2 bg-gray-100 shadow-inner mb-4 rounded">
          <p>Choose a student to start writing reports</p>
        </article>
      ) : (
        <article className="p-2 bg-gray-100 shadow-inner mb-4 rounded">
          <div className="grid grid-cols-4 gap-4 items-center mb-4">
            <div className="relative aspect-square col-span-1">
							<Image 
								src={selectedStudent.photo_url}
								alt='An image of a student'
								fill={true}
								sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
								style={{ objectFit: 'cover' }}
								className="rounded-full"
							/>
						</div>
            <div className="col-span-3">
              <p className="text-3xl mb-2">{selectedStudent.first_name} {selectedStudent.last_name}</p>
              <div className="flex gap-4 items-center">
                <p className="text-xl">Absent?</p>
                <Switch
									disabled={user?.role === 'TEACHER'}
                  checked={absent}
                  onChange={setAbsent}
                  className={`${absent ? 'bg-red-700' : 'bg-green-700'}
                    relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${absent ? 'translate-x-[28px]' : 'translate-x-0'}
                      pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
          </div>
					{absent && (
						<article className="p-2 bg-white shadow mb-4 rounded">
              <p>No report for {selectedStudent.first_name} today.</p>
            </article>
					)}
					{!absent && (
						<div className="grid grid-cols-3 mb-4">
							<button 
								onClick={() => setCategory('homework')}
								className={`${category === 'homework' && 'underline underline-offset-2 decoration-4 decoration-blue-500'} hover:underline hover:underline-offset-2 hover:decoration-4 hover:decoration-blue-300 ease-in-out duration-200`}
							>
								Homework
							</button>
							<button 
								onClick={() => setCategory('test')}
								className={`${category === 'test' && 'underline underline-offset-2 decoration-4 decoration-blue-500'} hover:underline hover:underline-offset-2 hover:decoration-4 hover:decoration-blue-300 ease-in-out duration-200`}
							>
								Test
							</button>
							<button 
								onClick={() => setCategory('comment')}
								className={`${category === 'comment' && 'underline underline-offset-2 decoration-4 decoration-blue-500'} hover:underline hover:underline-offset-2 hover:decoration-4 hover:decoration-blue-300 ease-in-out duration-200`}
							>
								Comment
							</button>
						</div>
					)}
					{!absent && category === 'homework' && (
						<div className="grid xs:grid-cols-2 gap-2 mb-4">
							<div 
								onClick={() => setHomeworkDone(!homeworkDone)}
								className={`${homeworkDone ? 'bg-green-300' : 'bg-red-300'} hover:cursor-pointer rounded p-2 flex flex-col items-center  col-span-1`}
							>
								<p>Homework done?</p>
								<Switch
									checked={homeworkDone}
									onChange={setHomeworkDone}
									className={`${homeworkDone ? 'bg-green-700' : 'bg-red-700'}
										relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
								>
									<span className="sr-only">Use setting</span>
									<span
										aria-hidden="true"
										className={`${homeworkDone ? 'translate-x-[28px]' : 'translate-x-0'}
											pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
									/>
								</Switch>
							</div>
							<div className={`${homeworkMistakes >= 7 && 'bg-red-300'} ${homeworkMistakes <= 6 && homeworkMistakes >=4  && 'bg-orange-300'} ${homeworkMistakes < 4 && 'bg-green-300'} rounded p-2 flex flex-col items-center justify-between col-span-1`}>
								<p>Homework Corrections?</p>
								<ul className='w-full text-center  grid grid-cols-5 gap-2'>
									{scores.map((number, index) => (
										<li key={index}
										className={`${homeworkMistakes === number ? 'bg-blue-500': 'bg-white'} rounded p-2 block`}
										onClick={() => setHomeworkMistakes(number)}>{number}</li>
									))}
								</ul>
							</div>
						</div>
					)}
					
					{!absent && category === 'test' && (
						<>
							<div className="grid xs:grid-cols-2 gap-2 mb-4">
                <div className={`${testScore >= 7 && 'bg-green-300'} ${testScore <= 6 && testScore >=4  && 'bg-orange-300'} ${testScore < 6 && 'bg-red-300'} rounded p-2 flex flex-col items-center justify-between col-span-1`}>
                  <p>Test Score?</p>
                  <ul className='w-full text-center  grid grid-cols-5 gap-2'>
                    {scores.map((number, index) => (
                      <li key={index}
                      className={`${testScore === number ? 'bg-blue-500': 'bg-white'} rounded p-2 block`}
                      onClick={() => setTestScore(number)}>{number}</li>
                    ))}
                  </ul>
                </div>
                <div className={`${testCorrections >= 7 && 'bg-red-300'} ${testCorrections <= 6 && testCorrections >=4  && 'bg-orange-300'} ${testCorrections < 4 && 'bg-green-300'} rounded p-2 flex flex-col items-center justify-between col-span-1`}>
                  <p>Test Corrections?</p>
                  <ul className='w-full text-center  grid grid-cols-5 gap-2'>
                    {scores.map((number, index) => (
                      <li key={index}
                      className={`${testCorrections === number ? 'bg-blue-500': 'bg-white'} rounded p-2 block `}
                      onClick={() => setTestCorrections(number)}>{number}</li>
                    ))}
                  </ul>
                </div>
              </div>
						</>
					)}
					{!absent && category === 'comment' && (
						<>
							  <div className="grid">
                <label>Comment</label>
                
                <TextareaAutosize
                  minRows={2}
                  className="border brounded shadow-inner p-2" 
                />
              </div>
						</>
					)}
        </article>
      )}
		</>
	);
};

export default function WriteReport() {
  const { user } = useContext(AuthContext);
  const [subject, setSubject] = useState<string>("Grammar");
  const [level, setLevel] = useState<number>(5);
  const [unit, setUnit] = useState<number>(1);
  const [day, setDay] = useState<string | number>(1);

  const [isConfirmed, setIsConfirmed] = useState<boolean>(user?.role === "TEACHER" ? true : false);

  const date = new Date();

  return (
    <Layout>
      <div>
        <section>
          <div className="flex justify-between items-baseline mb-4">
            <h2>
              <span className="text-lg text-gray-500">
                {date.toDateString()}
              </span>{" "}
              <br></br>
            </h2>
            <Link
              href="/"
              className="hover:underline hover:underline-offset-2 hover:text-blue-700"
            >
              Back
            </Link>
          </div>
        </section>
        <section>
          {!isConfirmed ? (
            <>
              <h2 className="text-3xl mb-4">Level 9 Monday/Thursday (Andrew)</h2>
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
						<>
							{user?.role !== 'TEACHER' && (
								<button className="mb-4 text-lg " onClick={() => setIsConfirmed(false)}>Edit Report Details</button>
							)}
							<ReportDetails setIsConfirmed={setIsConfirmed} />
						</>
          )}
        </section>
      </div>
    </Layout>
  );
}
