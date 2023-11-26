import TestQuestionRenderer from "@/src/modules/tests/components/TestQuestionRenderer";
import TestStartDetails from "@/src/modules/tests/components/TestStartDetails";
import { Test } from "@/src/modules/tests/entities/Test";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../_app";

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
    name: "Level 3 Unit 8 Test 3",
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
  { id: 1, question: "Do her give the it to he?" },
  { id: 2, question: "Does I look like he?" },
  { id: 3, question: "Do we want to take her from it?" },
  { id: 4, question: "Do I want to talk to they?" },
];

const DoTestPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTest: Test | undefined = tests.find((test) => {
    return test.id === Number(router.query.test_id);
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion: TestQuestion = questions[currentQuestionIndex];
  const [isStarted, setIsStarted] = useState<boolean>(false);

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
          <div className="absolute left-0 top-0 grid w-full grid-cols-10 bg-gray-200 py-2 opacity-0 duration-200 ease-in-out hover:opacity-100">
            <button
              onClick={() => router.push("/tests")}
              className="col-span-1"
            >
              Quit
            </button>
            <h1 className="col-span-8 text-center text-xl sm:text-5xl">
              {selectedTest?.name}
            </h1>
          </div>
        )}

        {/* Test sections */}
        <div className="h-screen">
          <div className="grid h-full place-items-center gap-16 p-2 sm:place-content-center sm:p-0">
            {!isStarted ? (
              <>
                <TestStartDetails test={selectedTest} />
                <div className="flex gap-4  text-3xl sm:text-5xl ">
                  <button
                    className="p-4 duration-100 rounded ease-in-out hover:-translate-y-2 hover:bg-gray-600 hover:text-white"
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
            ) : (
              <TestQuestionRenderer question={currentQuestion} />
            )}
          </div>
        </div>

        {/* TestQuestion button bar */}
        {isStarted && (
          <div className="absolute bottom-0 left-0 flex w-full justify-center gap-8 bg-gray-200 py-2 duration-200 ease-in-out hover:opacity-100 sm:text-5xl sm:opacity-0">
            {isStarted && (
              <button
                onClick={() => {
                  setIsStarted(false);
                }}
              >
                Start
              </button>
            )}
            <button
              onClick={() => {
                previousQuestion();
              }}
            >
              Prev
            </button>
            <button
              onClick={() => {
                nextQuestion();
              }}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </>
  );
};

DoTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default DoTestPage;
