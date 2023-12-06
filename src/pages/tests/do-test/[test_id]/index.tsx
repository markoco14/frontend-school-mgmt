import TestEndDetails from "@/src/modules/tests/components/TestEndDetails";
import TestQuestionRenderer from "@/src/modules/tests/components/TestQuestionRenderer";
import TestStartDetails from "@/src/modules/tests/components/TestStartDetails";
import { Test } from "@/src/modules/tests/entities/Test";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { NextPageWithLayout } from "@/src/pages/_app";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

const tests: Test[] = [
  {
    id: 1,
    name: "Level 7 Unit 1 Test 1",
    maxCorrections: 2,
    allowNoCorrections: true,
  },
  {
    id: 2,
    name: "Level 10 Unit 4 Test 2",
    maxCorrections: 3,
    allowNoCorrections: true,
  },
  {
    id: 3,
    name: "Level 5 Unit 5 Test 3",
    maxCorrections: 1,
    allowNoCorrections: false,
  },
  {
    id: 4,
    name: "Level 6 Unit 2 Test 4",
    maxCorrections: 2,
    allowNoCorrections: true,
  },
];

const questions: TestQuestion[] = [
  {
    id: 1,
    question: "Do her give the it to he?",
    mistakes: ["Do", "her", "the", "he"],
    answers: [
      { id: 1, answer: "Does she give it to him?", questionId: 1 },
      { id: 2, answer: "Does she give the ball to him?", questionId: 1 },
      { id: 3, answer: "Does she give him it?", questionId: 1 },
      { id: 4, answer: "Does she give him the ball?", questionId: 1 },
    ],
  },
  {
    id: 2,
    question: "Does I look like he?",
    mistakes: ["Does", "he"],
    answers: [
      { id: 5, answer: "Do I look like him?", questionId: 2 },
      { id: 6, answer: "Do I look like her?", questionId: 2 },
    ],
  },
  {
    id: 3,
    question: "Do we want to take her from it?",
    mistakes: ["her", "it"],
    answers: [
      { id: 7, answer: "Do we want to take it from her?", questionId: 3 },
      { id: 8, answer: "Do they want to take it from her?", questionId: 3 },
      { id: 9, answer: "Do you want to take it from her?", questionId: 3 },
    ],
  },
  {
    id: 4,
    question: "Do I want to talk to they?",
    mistakes: ["they"],
    answers: [{ id: 10, answer: "Do I want to talk to them?", questionId: 4 }],
  },
];

const DoTestPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTest: Test | undefined = tests.find((test) => {
    return test.id === Number(router.query.test_id);
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion: TestQuestion = questions[currentQuestionIndex];
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isEndPage, setIsEndPage] = useState<boolean>(false);

  function previousQuestion() {
    if (currentQuestionIndex - 1 < 0) {
      // check if first index
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  }

  function nextQuestion() {
    if (currentQuestionIndex >= questions.length) {
      // check if last index
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }

  if (!selectedTest) {
    return (
      <div className="h-screen">
        <div className="grid h-full place-items-center">
          <p>This test does not exist.</p>
          <button onClick={() => router.push("/tests")} className="col-span-1">
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <main>
        {/* Header and in-game Navigation */}
        {isStarted && (
          <header className="absolute left-0 top-0 grid w-full grid-cols-10 bg-gray-200 px-4 py-2 opacity-0 duration-200 ease-in-out hover:opacity-100">
            <div className="col-span-1 flex items-center gap-4">
              <button onClick={() => router.push("/")} className="col-span-1">
                Home
              </button>
              <button
                onClick={() => router.push("/tests")}
                className="col-span-1"
              >
                Tests
              </button>
            </div>
            <h1 className="col-span-8 text-center text-xl sm:text-5xl">
              {selectedTest?.name}
            </h1>
          </header>
        )}

        {/* Test sections */}
        <div className="h-screen">
          <div className="grid h-full place-items-center gap-16 p-2 sm:place-content-center sm:p-0">
            {!isStarted ? (
              <>
                <TestStartDetails test={selectedTest} />
                <div className="flex gap-4  text-3xl sm:text-5xl ">
                  <button
                    className="rounded p-4 duration-100 ease-in-out hover:-translate-y-2 hover:bg-gray-600 hover:text-white"
                    onClick={() => router.push("/tests")}
                  >
                    Quit
                  </button>
                  <button
                    className="rounded p-4 underline underline-offset-4 duration-100 ease-in-out hover:-translate-y-2 hover:bg-green-600 hover:text-white"
                    onClick={() => setIsStarted(true)}
                  >
                    Start Test
                  </button>
                </div>
              </>
            ) : currentQuestionIndex >= questions.length ? (
              <TestEndDetails test={selectedTest} />
            ) : (
              <div>
                <p className="absolute right-2 top-2 text-xl sm:right-4 sm:text-5xl">
                  {currentQuestionIndex + 1}/{questions.length}
                </p>
                <TestQuestionRenderer question={currentQuestion} />
              </div>
            )}
          </div>
        </div>

        {/* Test question navigation bar */}
        {isStarted && (
          <nav className="absolute bottom-0 left-0 flex w-full justify-center gap-8 bg-gray-200 py-2 duration-200 ease-in-out hover:opacity-100 sm:text-5xl sm:opacity-0">
            {isStarted && (
              <button
                onClick={() => {
                  setIsStarted(false);
                  setIsEndPage(false);
                  setCurrentQuestionIndex(0);
                }}
                className="rounded border p-2 duration-200 ease-in-out disabled:bg-gray-300 disabled:opacity-50"
              >
                Info
              </button>
            )}
            <button
              disabled={currentQuestionIndex == 0}
              onClick={() => {
                if (isEndPage) {
                  setIsEndPage(false);
                  return;
                }
                previousQuestion();
              }}
              className="rounded border p-2 duration-200 ease-in-out disabled:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            <button
              disabled={currentQuestionIndex >= questions.length}
              onClick={() => {
                nextQuestion();
              }}
              className="rounded border p-2 duration-200 ease-in-out disabled:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
            <button
              disabled={currentQuestionIndex >= questions.length}
              onClick={() => {
                setCurrentQuestionIndex(questions.length);
              }}
              className="rounded border p-2 duration-200 ease-in-out disabled:bg-gray-300 disabled:opacity-50"
            >
              End
            </button>
          </nav>
        )}
      </main>
    </>
  );
};

DoTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default DoTestPage;
