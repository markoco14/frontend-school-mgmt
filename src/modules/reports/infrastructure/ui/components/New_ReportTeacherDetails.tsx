import AuthContext from "@/src/AuthContext";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
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

const EvaluationRangeAttribute = ({ attribute }: { attribute: any }) => {
  const [selectedValue, setSelectedValue] = useState<number>(
    attribute.maxValue,
  );
  return (
    <div className="grid gap-2">
      <label>{attribute.title}</label>

      <div className={`grid grid-cols-${attribute.maxValue} gap-4`}>
        {Array.from(
          { length: attribute.maxValue - attribute.minValue + 1 },
          (_, i) => i + attribute.minValue,
        ).map((value) => (
          <button
            onClick={() => {
              setSelectedValue(value);
            }}
            key={value}
            className={`${
              selectedValue === value ? "bg-green-500" : ""
            } rounded border p-4 text-center shadow-inner`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};
const EvaluationTextAttribute = ({ attribute }: { attribute: any }) => {
  return (
    <div className="grid gap-2">
      <label>{attribute.title}</label>
      <TextareaAutosize
        minRows={2}
        className="w-full rounded border p-2 shadow-inner"
      />
    </div>
  );
};

const EvaluationAttribute = ({ attribute }: { attribute: any }) => {
  return (
    <div key={`attribute-${attribute.id}`}>
      {attribute.type === "range" && (
        <EvaluationRangeAttribute attribute={attribute} />
      )}
      {attribute.type === "text" && (
        <EvaluationTextAttribute attribute={attribute} />
      )}
    </div>
  );
};

const SetStudentButtons = ({
  students,
  selectedStudent,
  setSelectedStudent,
}: {
  students: any[];
  selectedStudent: any;
  setSelectedStudent: Function;
}) => {
  const currentIndex = students.findIndex((s) => s === selectedStudent);

  const selectNext = () => {
    if (currentIndex < students.length - 1) {
      setSelectedStudent(students[currentIndex + 1]);
    }
  };

  const selectPrevious = () => {
    if (currentIndex > 0) {
      setSelectedStudent(students[currentIndex - 1]);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        disabled={currentIndex === 0}
        onClick={selectPrevious}
        className="w-24 sm:w-32 rounded border border-blue-500 hover:bg-blue-300 disabled:cursor-not-allowed disabled:border-gray-500 disabled:hover:bg-gray-300"
      >
        {students[currentIndex - 1]?.first_name
          ? students[currentIndex - 1]?.first_name
          : ""}
      </button>
      <button
        onClick={() => {
          toast.success(`${selectedStudent?.first_name}'s report saved!`);
          if (currentIndex + 1 !== students.length) {
            setSelectedStudent(students[currentIndex + 1]);
          }
        }}
        className="w-24 sm:w-32 rounded bg-blue-500 px-2 py-1 text-white shadow hover:bg-blue-600 disabled:bg-gray-300 "
      >
        Save
      </button>
      <button
        disabled={currentIndex + 1 === students.length}
        onClick={selectNext}
        className="w-24 sm:w-32 rounded border border-blue-500 hover:bg-blue-300 disabled:cursor-not-allowed disabled:border-gray-500 disabled:hover:bg-gray-300"
      >
        {students[currentIndex + 1]?.first_name
          ? students[currentIndex + 1]?.first_name
          : ""}
      </button>
    </div>
  );
};

const EvaluationSection = ({
  students,
  selectedStudent,
  setSelectedStudent,
}: {
  students: any;
  selectedStudent: any;
  setSelectedStudent: Function;
}) => {
  const scale = [1, 2, 3, 4, 5];
  const [evaluationAttributes, setEvaluationAttributes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/behaviorEvaluationAttributes")
      .then((response) => response.json())
      .then((data) => {
        setEvaluationAttributes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <article className="grid grid-cols-8 gap-4 sm:pr-4">
        <div className="relative col-span-8 sm:col-span-1">
          <VerticalPhotoBar
            students={students}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
          <PhotoBar
            students={students}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        </div>
        <div className="col-span-8 flex flex-col gap-4 sm:col-span-7">
          <div className="text-xl">
            {selectedStudent?.first_name} {selectedStudent?.last_name}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {evaluationAttributes?.map((attribute: any, index: number) => (
              <div
                key={`attribute-${attribute.id}`}
                className={`${
                  attribute.type === "text" ? "col-span-3" : "col-span-1"
                } grid gap-2`}
              >
                <EvaluationAttribute attribute={attribute} />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <SetStudentButtons
              students={students}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </div>
        </div>
      </article>
    </>
  );
};

const VerticalPhotoBar = ({
  students,
  selectedStudent,
  setSelectedStudent,
}: {
  students: any[];
  selectedStudent: Student;
  setSelectedStudent: Function;
}) => {
  const studentRefs: any = useRef([]);

  useEffect(() => {
    const selectedIndex = students.findIndex(
      (s) => s.id === selectedStudent?.id,
    );
    if (selectedIndex >= 0 && studentRefs.current[selectedIndex]) {
      studentRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedStudent, students]);

  return (
    <ul className="no-scrollbar sticky top-0 z-10 hidden max-h-[75vh] grid-cols-6 gap-1 overflow-y-scroll border-r bg-white px-4 sm:grid sm:grid-cols-1 sm:flex-col sm:gap-8">
      {students?.map((student, index) => (
        <li key={index} ref={(el) => (studentRefs.current[index] = el)}>
          <div className={`relative aspect-square`}>
            <Image
              src={student.photo_url}
              alt="An image of a student"
              fill={true}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw"
              style={{ objectFit: "cover" }}
              className={`${
                selectedStudent?.id === student.id
                  ? "border-4 border-green-500"
                  : "opacity-50 grayscale"
              } rounded-full duration-200 ease-in-out`}
              onClick={() => {
                setSelectedStudent(student);
              }}
            />
          </div>
        </li>
      ))}
      <div
        className={`relative grid aspect-square place-items-center rounded-full bg-blue-100`}
      >
        <i className="fa-solid fa-plus text-blue-900"></i>
      </div>
    </ul>
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
    <ul className="sticky top-0 z-10 mb-4 grid grid-cols-6 gap-2 rounded bg-white p-2 sm:hidden sm:gap-8">
      {students?.map((student, index) => (
        <li key={index}>
          <div className={`relative aspect-square`}>
            <Image
              src={student.photo_url}
              alt="An image of a student"
              fill={true}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw"
              style={{ objectFit: "cover" }}
              className={`${
                selectedStudent?.id === student.id
                  ? "border-2 border-green-300 shadow-xl shadow-green-100"
                  : "opacity-50 grayscale"
              } rounded-full duration-200 ease-in-out`}
              onClick={() => {
                setSelectedStudent(student);
              }}
            />
          </div>
        </li>
      ))}
      <div
        className={`relative grid aspect-square place-items-center rounded-full bg-blue-100`}
      >
        <i className="fa-solid fa-plus text-blue-900"></i>
      </div>
    </ul>
  );
};

const StudentSummary = ({ selectedStudent }: { selectedStudent: any }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="mb-4 grid grid-cols-4 items-center gap-4 rounded border p-4 shadow">
      <div className="relative col-span-1 aspect-square">
        <Image
          src={selectedStudent?.photo_url}
          alt="An image of a student"
          fill={true}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      </div>
      <div className="col-span-3">
        <p className="mb-2 text-3xl">
          {selectedStudent?.first_name} {selectedStudent?.last_name}
        </p>
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
    <div className="mb-4 flex gap-8 overflow-x-scroll rounded border p-4 shadow">
      <button
        onClick={() => setCategory("homework")}
        className={`${
          category === "homework" &&
          "underline decoration-blue-500 decoration-4 underline-offset-2"
        } duration-200 ease-in-out hover:underline hover:decoration-blue-300 hover:decoration-4 hover:underline-offset-2`}
      >
        Exercise 1?
      </button>
      <button
        onClick={() => setCategory("test-corrs")}
        className={`${
          category === "test-corrs" &&
          "underline decoration-blue-500 decoration-4 underline-offset-2"
        } duration-200 ease-in-out hover:underline hover:decoration-blue-300 hover:decoration-4 hover:underline-offset-2`}
      >
        Test Corrections?
      </button>
      <button
        onClick={() => setCategory("hw-corrs")}
        className={`${
          category === "hw-corrs" &&
          "underline decoration-blue-500 decoration-4 underline-offset-2"
        } duration-200 ease-in-out hover:underline hover:decoration-blue-300 hover:decoration-4 hover:underline-offset-2`}
      >
        Exercise Corrections?
      </button>
      <button
        onClick={() => setCategory("test")}
        className={`${
          category === "test" &&
          "underline decoration-blue-500 decoration-4 underline-offset-2"
        } duration-200 ease-in-out hover:underline hover:decoration-blue-300 hover:decoration-4 hover:underline-offset-2`}
      >
        Test Score
      </button>
      <button
        onClick={() => setCategory("evaluation")}
        className={`${
          category === "evaluation" &&
          "underline decoration-blue-500 decoration-4 underline-offset-2"
        } duration-200 ease-in-out hover:underline hover:decoration-blue-300 hover:decoration-4 hover:underline-offset-2`}
      >
        Behavior
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
  const { user } = useContext(AuthContext);

  const [selectedStudent, setSelectedStudent] = useState<any>();
  const [category, setCategory] = useState<string>("homework");

  const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [loading, setLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/dailyReportStudentList")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
        setSelectedStudent(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <article>
        {/* <VerticalPhotoBar
          students={students}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
        /> */}
        <CategoryButtons category={category} setCategory={setCategory} />
        <div className="col-span-7 rounded sm:border sm:shadow">
          {/* <StudentSummary selectedStudent={selectedStudent} /> */}

          {/* HOMEWORK SECTION */}
          {category === "homework" && (
            <HomeworkSection scores={scores} reportData={reportData} />
          )}
          {category === "hw-corrs" && (
            <HomeworkSection scores={scores} reportData={reportData} />
          )}
          {category === "test-corrs" && (
            <HomeworkSection scores={scores} reportData={reportData} />
          )}
          {category === "test" && (
            <InClassSection scores={scores} reportData={reportData} />
          )}
          {category === "evaluation" && (
            <EvaluationSection
              students={students}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          )}
        </div>
      </article>
    </>
  );
}
