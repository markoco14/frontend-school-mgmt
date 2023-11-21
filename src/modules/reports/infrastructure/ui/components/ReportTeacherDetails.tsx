import { useUserContext } from "@/src/UserContext";
import { Student } from "@/src/modules/students/entities/Student";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const NoData = ({ text }: { text: string }) => {
  return (
    <article className="mb-4 grid gap-2 rounded border p-4 shadow xs:grid-cols-2">
      <p>{text}</p>
    </article>
  );
};

const HomeworkSection = ({
  scores,
  reportData,
}: {
  scores: number[];
  reportData: any;
}) => {
  const [homeworkDone, setHomeworkDone] = useState<boolean>(false);
  const [homeworkMistakes, setHomeworkMistakes] = useState<number>(0);
  return reportData?.prevHmwkAssessments.length === 0 ? (
    <NoData text={"No homework from last class"} />
  ) : (
    reportData?.prevHmwkAssessments.map((assessment: any, index: number) => (
      <article
        key={index}
        className="mb-4 grid gap-2 rounded border p-4 shadow xs:grid-cols-2"
      >
        <div
          onClick={() => setHomeworkDone(!homeworkDone)}
          className={`
                ${homeworkDone ? "bg-green-300" : "bg-red-300"} 
                col-span-1 flex flex-col items-center rounded p-2  hover:cursor-pointer`}
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
            ${
              homeworkMistakes <= 6 && homeworkMistakes >= 4 && "bg-orange-300"
            } 
            ${
              homeworkMistakes < 4 && "bg-green-300"
            } col-span-1 flex flex-col items-center justify-between rounded p-2`}
        >
          <p>{assessment} Corrections?</p>
          <ul className="grid w-full  grid-cols-5 gap-2 text-center">
            {scores.map((number, index) => (
              <li
                key={index}
                className={`${
                  homeworkMistakes === number ? "bg-blue-500" : "bg-white"
                } block rounded p-2`}
                onClick={() => setHomeworkMistakes(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </article>
    ))
  );
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

  return reportData?.inClassAssessments.length === 0 ? (
    <NoData text={"No assessments in class today"} />
  ) : (
    reportData?.inClassAssessments?.map((assessment: any, index: number) => (
      <div key={index} className="mb-4 grid gap-2 xs:grid-cols-2 ">
        <div
          className={`col-span-1 mb-4 flex flex-col items-center justify-between gap-4 rounded border p-4 shadow`}
        >
          <p>{assessment} Score?</p>
          <ul className="grid w-full  grid-cols-5 gap-2 text-center">
            {scores.map((number, index) => (
              <li
                key={index}
                className={`
                    ${
                      number >= 8 &&
                      number === score &&
                      "bg-green-500 text-white shadow-lg shadow-green-300"
                    } 
                    ${
                      number <= 7 &&
                      number >= 5 &&
                      number === score &&
                      "bg-orange-500 text-white shadow-lg shadow-orange-300"
                    } 
                    ${
                      number < 5 &&
                      number >= 0 &&
                      number === score &&
                      "bg-red-500 text-white shadow-lg shadow-red-300"
                    } 
                    ${number >= 8 && "bg-green-300"} 
                    ${number <= 7 && number >= 5 && "bg-orange-300"} 
                    ${number < 5 && number >= 0 && "bg-red-300"} 
                    block rounded p-2`}
                onClick={() => setScore(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`col-span-1 mb-4 flex flex-col items-center justify-between rounded border p-4 shadow`}
        >
          <p>{assessment} Corrections?</p>
          <ul className="grid w-full  grid-cols-5 gap-2 text-center">
            {scores.map((number, index) => (
              <li
                key={index}
                className={`
                    ${
                      number >= 8 &&
                      number === corrections &&
                      "bg-red-500 text-white shadow-lg shadow-red-300"
                    } 
                    ${number >= 8 && "bg-red-300"} 
                    ${
                      number <= 7 &&
                      number >= 3 &&
                      number === corrections &&
                      "bg-orange-500 text-white shadow-lg shadow-orange-300"
                    } 
                    ${number <= 7 && number >= 3 && "bg-orange-300"} 
                    ${
                      number < 3 &&
                      number >= 0 &&
                      number === corrections &&
                      "bg-green-500 text-white shadow-lg shadow-green-300"
                    } 
                    ${number < 3 && number >= 0 && "bg-green-300"} 
                    block rounded p-2`}
                onClick={() => setCorrections(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))
  );
};

const EvaluationSection = () => {
  const scale = [1, 2, 3, 4, 5];
  return (
    <article className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2 rounded border p-4 shadow">
          <label>Participation</label>
          <div className="flex gap-4">
            {scale.map((number: number, index: number) => (
              <span
                key={index}
                className="rounded bg-gray-100 p-4 shadow-inner"
              >
                {number}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-2 rounded border p-4 shadow">
          <label>Listening</label>
          <div className="flex gap-4">
            {scale.map((number: number, index: number) => (
              <span
                key={index}
                className="rounded bg-gray-100 p-4 shadow-inner"
              >
                {number}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-2 rounded border p-4 shadow">
        <label>Comment</label>
        <TextareaAutosize
          minRows={2}
          className="rounded border bg-gray-100 p-2 shadow-inner"
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
    <ul className="sticky top-0 z-10 mb-4 grid grid-cols-6 gap-2 rounded bg-white p-2 sm:gap-8">
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
          ),
      )}
      <div
        className={`relative grid aspect-square place-items-center rounded-full bg-blue-100`}
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
  const { user } = useUserContext();
  return (
    <div className="mb-4 grid grid-cols-4 items-center gap-4 rounded border p-4 shadow">
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

const CategoryButtons = ({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Function;
}) => {
  return (
    <div className="mb-4 flex gap-8 rounded border p-4 shadow">
      <button
        onClick={() => setCategory("previous")}
        className={`${
          category === "previous" &&
          "underline decoration-blue-500 decoration-4 underline-offset-2"
        } duration-200 ease-in-out hover:underline hover:decoration-blue-300 hover:decoration-4 hover:underline-offset-2`}
      >
        Due Today
      </button>
      <button
        onClick={() => setCategory("inclass")}
        className={`${
          category === "inclass" &&
          "underline decoration-blue-500 decoration-4 underline-offset-2"
        } duration-200 ease-in-out hover:underline hover:decoration-blue-300 hover:decoration-4 hover:underline-offset-2`}
      >
        In Class
      </button>
      <button
        onClick={() => setCategory("evaluation")}
        className={`${
          category === "evaluation" &&
          "underline decoration-blue-500 decoration-4 underline-offset-2"
        } duration-200 ease-in-out hover:underline hover:decoration-blue-300 hover:decoration-4 hover:underline-offset-2`}
      >
        Evaluation
      </button>
    </div>
  );
};

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

  const { user } = useUserContext();

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
        <article className="mb-4 rounded bg-gray-100 p-2 shadow-inner">
          <p>Choose a student to start writing reports</p>
        </article>
      ) : (
        <article className="mb-4 rounded p-2">
          <StudentSummary
            absent={absent}
            setAbsent={setAbsent}
            selectedStudent={selectedStudent}
          />
          {absent && (
            <article className="mb-4 rounded border p-4 shadow">
              <p>No report for {selectedStudent.first_name} today.</p>
            </article>
          )}
          {!absent && (
            <CategoryButtons category={category} setCategory={setCategory} />
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
