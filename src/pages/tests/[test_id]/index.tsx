import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../_app";

type Question = {
  id: number;
  question: string;
};

type Test = {
  id: number;
  name: string;
};

const tests: Test[] = [
  { id: 1, name: "Test 1" },
  { id: 2, name: "Test 2" },
  { id: 3, name: "Test 3" },
  { id: 4, name: "Test 4" },
];

const questions: Question[] = [
  { id: 1, question: "Do her give the it to he?" },
  { id: 2, question: "Does I look like he?" },
  { id: 3, question: "Do we want to take her from it?" },
  { id: 4, question: "Do I want to talk to they?" },
];

const DoTestPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTest = tests.find((test) => {
    return test.id === Number(router.query.test_id);
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion: Question = questions[currentQuestionIndex];

  function previousQuestion() {
    if (currentQuestionIndex - 1 < 0) {
      // check if first index
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  }

  function nextQuestion() {
    if (currentQuestionIndex + 1 >= questions.length) {
      // check if last index
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }
  return (
    <main>
      {/* Header and In-game Navigation */}
      <div className="absolute left-0 top-0 grid w-full grid-cols-10 bg-gray-200 py-2 opacity-0 duration-200 ease-in-out hover:opacity-100">
        <button onClick={() => router.push("/tests")} className="col-span-1">
          Back
        </button>
        <h1 className="col-span-8 text-center text-5xl">
          {selectedTest?.name}
        </h1>
      </div>
      {/* Current Question */}
      <div className="h-screen">
        <div className="grid h-full place-items-center">
          <p className="text-center text-[180px]">{currentQuestion.question}</p>
        </div>
      </div>
      {/* Question button bar */}
      <div className="flex justify-center gap-8 absolute bottom-0 left-0 w-full bg-gray-200 py-2 text-5xl opacity-0 duration-200 ease-in-out hover:opacity-100">
        <button
          onClick={() => {
            previousQuestion();
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            nextQuestion();
          }}
        >
          Next
        </button>
      </div>
    </main>
  );
};

DoTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default DoTestPage;
