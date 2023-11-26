import TestStartDetails from "@/src/modules/tests/components/TestStartDetails";
import { Test } from "@/src/modules/tests/entities/Test";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import TestQuestionRenderer from "@/src/modules/tests/components/TestQuestionRenderer";

const tests: Test[] = [
  { id: 1, name: "Level 7 Unit 1 Test 1", maxCorrections: 2, allowNoCorrections: true },
  { id: 2, name: "Level 10 Unit 4 Test 2", maxCorrections: 3, allowNoCorrections: true },
  { id: 3, name: "Level 3 Unit 8 Test 3", maxCorrections: 1, allowNoCorrections: false },
  { id: 4, name: "Level 6 Unit 2 Test 4", maxCorrections: 2, allowNoCorrections: true },
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
        <div className="absolute left-0 top-0 grid w-full grid-cols-10 bg-gray-200 py-2 opacity-0 duration-200 ease-in-out hover:opacity-100">
          <button onClick={() => router.push("/tests")} className="col-span-1">
            Quit
          </button>
          <h1 className="col-span-8 text-center text-5xl">
            {selectedTest?.name}
          </h1>
        </div>

        {/* Test sections */}
        <div className="h-screen">
          <div className="grid h-full place-content-center place-items-center">
            {!isStarted ? (
              <>
                <TestStartDetails test={selectedTest} />
                <button onClick={() => setIsStarted(true)}>Start Test</button>
              </>
            ) : (
              <TestQuestionRenderer question={currentQuestion}/>
            )}
          </div>
        </div>

        {/* TestQuestion button bar */}
        <div className="absolute bottom-0 left-0 flex w-full justify-center gap-8 bg-gray-200 py-2 text-5xl opacity-0 duration-200 ease-in-out hover:opacity-100">
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
      </main>
    </>
  );
};

DoTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default DoTestPage;