import AuthContext from "@/src/AuthContext";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const NoData = ({text}: {text: string;}) => {
  return (
    <article
        className="grid xs:grid-cols-2 gap-2 mb-4 border shadow p-4 rounded"
      >
        <p>{text}</p>
      </article>
  );
}

const HomeworkSection = ({
  scores,
  reportData,
}: {
  scores: number[];
  reportData: any;
}) => {
  const [homeworkDone, setHomeworkDone] = useState<boolean>(false);
  const [homeworkMistakes, setHomeworkMistakes] = useState<number>(0);
  return (
    reportData?.prevHmwkAssessments.length === 0 ? (
      <NoData text={'No homework from last class'}/>
    ) : (
      reportData?.prevHmwkAssessments.map(
        (assessment: any, index: number) => (
          <article
            key={index}
            className="grid xs:grid-cols-2 gap-2 mb-4 border shadow p-4 rounded"
          >
            <div
              onClick={() => setHomeworkDone(!homeworkDone)}
              className={`
                ${homeworkDone ? "bg-green-300" : "bg-red-300"} 
                hover:cursor-pointer rounded p-2 flex flex-col items-center  col-span-1`}
            >
              <p>{assessment} done?</p>
              <Switch
                checked={homeworkDone}
                onChange={setHomeworkDone}
                className={`
                ${homeworkDone ? "bg-green-700" : "bg-red-700"}
                  relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`
                  ${homeworkDone ? "translate-x-[28px]" : "translate-x-0"}
                    pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div
              className={`
            ${homeworkMistakes >= 7 && "bg-red-300"} 
            ${homeworkMistakes <= 6 && homeworkMistakes >= 4 && "bg-orange-300"} 
            ${
              homeworkMistakes < 4 && "bg-green-300"
            } rounded p-2 flex flex-col items-center justify-between col-span-1`}
            >
              <p>{assessment} Corrections?</p>
              <ul className="w-full text-center  grid grid-cols-5 gap-2">
                {scores.map((number, index) => (
                  <li
                    key={index}
                    className={`${
                      homeworkMistakes === number ? "bg-blue-500" : "bg-white"
                    } rounded p-2 block`}
                    onClick={() => setHomeworkMistakes(number)}
                  >
                    {number}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        )
      )
    )
  )
};

const InClassSection = ({
  scores,
  reportData,
}: {
  scores: number[];
  reportData: any;
}) => {
  const [score, setScore] = useState<number>(0);
  const [corrections, setCorrections] = useState<number>(0);

  return (
    reportData?.inClassAssessments.length === 0 ? (
      <NoData text={'No assessments in class today'}/>
    ) : (
      reportData?.inClassAssessments?.map(
        (assessment: any, index: number) => (
          <div key={index} className="grid xs:grid-cols-2 gap-2 mb-4 ">
            <div
              className={`flex flex-col gap-4 items-center justify-between col-span-1 border shadow p-4 rounded mb-4`}
            >
              <p>{assessment} Score?</p>
              <ul className="w-full text-center  grid grid-cols-5 gap-2">
                {scores.map((number, index) => (
                  <li
                    key={index}
                    className={`
                    ${
                      number >= 8 &&
                      number === score &&
                      "bg-green-500 text-white shadow-green-300 shadow-lg"
                    } 
                    ${
                      number <= 7 &&
                      number >= 5 &&
                      number === score &&
                      "bg-orange-500 text-white shadow-orange-300 shadow-lg"
                    } 
                    ${
                      number < 5 &&
                      number >= 0 &&
                      number === score &&
                      "bg-red-500 text-white shadow-red-300 shadow-lg"
                    } 
                    ${number >= 8 && "bg-green-300"} 
                    ${number <= 7 && number >= 5 && "bg-orange-300"} 
                    ${number < 5 && number >= 0 && "bg-red-300"} 
                    rounded p-2 block`}
                    onClick={() => setScore(number)}
                  >
                    {number}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`flex flex-col items-center justify-between col-span-1 border shadow p-4 rounded mb-4`}
            >
              <p>{assessment} Corrections?</p>
              <ul className="w-full text-center  grid grid-cols-5 gap-2">
                {scores.map((number, index) => (
                  <li
                    key={index}
                    className={`
                    ${
                      number >= 8 &&
                      number === corrections &&
                      "bg-red-500 text-white shadow-red-300 shadow-lg"
                    } 
                    ${number >= 8 && "bg-red-300"} 
                    ${
                      number <= 7 &&
                      number >= 3 &&
                      number === corrections &&
                      "bg-orange-500 text-white shadow-orange-300 shadow-lg"
                    } 
                    ${number <= 7 && number >= 3 && "bg-orange-300"} 
                    ${
                      number < 3 &&
                      number >= 0 &&
                      number === corrections &&
                      "bg-green-500 text-white shadow-green-300 shadow-lg"
                    } 
                    ${number < 3 && number >= 0 && "bg-green-300"} 
                    rounded p-2 block`}
                    onClick={() => setCorrections(number)}
                  >
                    {number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )
    )
  );
};

const EvaluationSection = () => {
  const scale = [1, 2, 3, 4, 5];
  return (
    <article className="grid gap-4">
			<div className="grid sm:grid-cols-3 gap-4">
				<div className="grid gap-2 border shadow p-4 rounded">
					<label>Participation</label>
					<div className="flex gap-4">
						{scale.map((number: number, index: number) => (
							<span key={index} className="bg-gray-100 rounded shadow-inner p-4">
								{number}
							</span>
						))}
					</div>
				</div>
				<div className="grid gap-2 border shadow p-4 rounded">
					<label>Listening</label>
					<div className="flex gap-4">
						{scale.map((number: number, index: number) => (
							<span key={index} className="bg-gray-100 rounded shadow-inner p-4">
								{number}
							</span>
						))}
					</div>
				</div>
			</div>
      <div className="grid gap-2 border shadow p-4 rounded">
        <label>Comment</label>
        <TextareaAutosize
          minRows={2}
          className="border rounded shadow-inner p-2 bg-gray-100"
        />
      </div>
    </article>
  );
};

const PhotoBar = ({
  students,
  selectedStudent,
  setSelectedStudent,
}: {
  students: any[];
  selectedStudent: Student;
  setSelectedStudent: Function;
}) => {
  return (
    <ul className="grid grid-cols-6 gap-2 sm:gap-8 p-2 mb-4 rounded sticky top-0 bg-white z-10">
      {students?.map(
        (student, index) =>
          !student.absent && (
            <li key={index}>
              <div className={`relative aspect-square`}>
                <Image
                  src={student.photo_url}
                  alt="An image of a student"
                  fill={true}
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw"
                  style={{ objectFit: "cover" }}
                  className={`${
                    selectedStudent.id === student.id
                      ? "border-2 border-green-300 shadow-xl shadow-green-100"
                      : "shadow-inner-xl"
                  } rounded-full`}
                  onClick={() => {
                    setSelectedStudent(student);
                    // setTestScore(0);
                    // setHomeworkDone(false);
                    // setHomeworkMistakes(0);
                    // setTestCorrections(0);
                  }}
                />
              </div>
            </li>
          )
      )}
      <div
        className={`relative aspect-square grid place-items-center rounded-full bg-blue-100`}
      >
        <i className="fa-solid fa-plus text-blue-900"></i>
      </div>
    </ul>
  );
};

const StudentSummary = ({
  absent,
  setAbsent,
  selectedStudent,
}: {
  absent: boolean;
  setAbsent: Function;
  selectedStudent: any;
}) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="grid grid-cols-4 gap-4 items-center border shadow p-4 rounded mb-4">
      <div className="relative aspect-square col-span-1">
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
        <p className="text-3xl mb-2">
          {selectedStudent.first_name} {selectedStudent.last_name}
        </p>
        <div className="flex gap-4 items-center">
          <p className="text-xl">Absent?</p>
          <Switch
            disabled={user?.role === "TEACHER"}
            checked={absent}
            onChange={() => setAbsent(!absent)}
            className={`${absent ? "bg-red-700" : "bg-green-700"}
							relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${absent ? "translate-x-[28px]" : "translate-x-0"}
								pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const CategoryButtons = ({category, setCategory}: {category: string; setCategory: Function;}) => {
  return (
    <div className="flex gap-8 border shadow p-4 rounded mb-4">
      <button
        onClick={() => setCategory("previous")}
        className={`${
          category === "previous" &&
          "underline underline-offset-2 decoration-4 decoration-blue-500"
        } hover:underline hover:underline-offset-2 hover:decoration-4 hover:decoration-blue-300 ease-in-out duration-200`}
      >
        Due Today
      </button>
      <button
        onClick={() => setCategory("inclass")}
        className={`${
          category === "inclass" &&
          "underline underline-offset-2 decoration-4 decoration-blue-500"
        } hover:underline hover:underline-offset-2 hover:decoration-4 hover:decoration-blue-300 ease-in-out duration-200`}
      >
        In Class
      </button>
      <button
        onClick={() => setCategory("evaluation")}
        className={`${
          category === "evaluation" &&
          "underline underline-offset-2 decoration-4 decoration-blue-500"
        } hover:underline hover:underline-offset-2 hover:decoration-4 hover:decoration-blue-300 ease-in-out duration-200`}
      >
        Evaluation
      </button>
    </div>
  );
}

export default function ReportTeacherDetails({
  reportData,
  setIsConfirmed,
}: {
  reportData: any;
  setIsConfirmed: Function;
}) {
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
      absent: false,
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
      absent: false,
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
      absent: true,
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
      absent: false,
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
      absent: true,
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
      absent: false,
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
      absent: false,
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
      absent: false,
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
      absent: false,
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
      absent: true,
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
      absent: false,
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
      absent: false,
    },
  ];

  const { user } = useContext(AuthContext);

  const [selectedStudent, setSelectedStudent] = useState<any>(students[0]);
  const [absent, setAbsent] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("homework");

  const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <PhotoBar
        students={students}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />

      {!selectedStudent ? (
        <article className="p-2 bg-gray-100 shadow-inner mb-4 rounded">
          <p>Choose a student to start writing reports</p>
        </article>
      ) : (
        <article className="p-2 mb-4 rounded">
					<StudentSummary absent={absent} setAbsent={setAbsent} selectedStudent={selectedStudent}/>
          {absent && (
            <article className="border shadow p-4 rounded mb-4">
              <p>No report for {selectedStudent.first_name} today.</p>
            </article>
          )}
          {!absent && (
            <CategoryButtons category={category} setCategory={setCategory}/>
          )}
          {/* HOMEWORK SECTION */}
          {!absent && category === "previous" && (
            <HomeworkSection scores={scores} reportData={reportData} />
          )}
          {!absent && category === "inclass" && (
            <InClassSection scores={scores} reportData={reportData} />
          )}
          {!absent && category === "evaluation" && <EvaluationSection />}
        </article>
      )}
    </>
  );
}
