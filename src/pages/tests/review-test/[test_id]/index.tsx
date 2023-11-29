import { Test } from "@/src/modules/tests/entities/Test";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { NextPageWithLayout } from "@/src/pages/_app";
import DOMPurify from "dompurify";
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
      "Does she give it to him?",
      "Does she give the ball to him?",
      "Does she give him it?",
      "Does she give him the ball?",
    ],
  },
  {
    id: 2,
    question: "Does I look like he?",
    mistakes: ["Does", "he"],
    answers: ["Do I look like him?", "Do I look like her?"],
  },
  {
    id: 3,
    question: "Do we want to take her from it?",
    mistakes: ["Do", "her", "it"],
    answers: [
      "Do we want to take it from her?",
      "Do they want to take it from her?",
      "Do you want to take it from her?",
    ],
  },
  {
    id: 4,
    question: "Do I want to talk to they?",
    mistakes: ["they"],
    answers: ["Do I want to talk to them?"],
  },
];

const ReviewTestPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTest: Test | undefined = tests.find((test) => {
    return test.id === Number(router.query.test_id);
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion: TestQuestion = questions[currentQuestionIndex];
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<number>(0);

  function highlightWrongWords(question: string) {
    question = question.replace("?", " ?");
    const words = question.split(" ");
    words.forEach((word: string, index: number) => {
      if (currentQuestion.mistakes.includes(word)) {
        words[index] = `<span class="text-red-600">${word}</span>`;
      }
    });
    const sentenceWithHighlights = words.join(" ").replace(" ?", "?");

    return sentenceWithHighlights;
  }

  const questionWithHighlights = highlightWrongWords(currentQuestion.question);
  // const questionWithHighlights =

  function highlightCorrections(question: string, answer: string) {
    let questionWords = question.replace("?", " ?").split(" ");
    let answerWords = answer.replace("?", " ?").split(" ");
    answerWords.forEach((word: string, index: number) => {
      // check if it is a new word
      if (!questionWords.includes(word)) {
        answerWords[index] = `<span class="text-green-600">${word}</span>`;
      }

      // check if the word is the same, but position has changed
      if (questionWords[index] !== word && word !== "?") {
        answerWords[index] = `<span class="text-green-600">${word}</span>`;
      }
    });
    let sentenceWithHighlights = "";
    sentenceWithHighlights = answerWords.join(" ").replace(" ?", "?");
    return sentenceWithHighlights;
  }

  const answerWithHighlights = highlightCorrections(
    currentQuestion.question,
    currentQuestion.answers[currentAnswerIndex],
  );

  function prev({
    currentIndex,
    stateFunction,
    min,
  }: {
    currentIndex: number;
    stateFunction: Function;
    min: number;
  }) {
    if (currentIndex !== min) {
      stateFunction((prev: number) => prev - 1);
    }
  }
  function next({
    currentIndex,
    stateFunction,
    max,
  }: {
    currentIndex: number;
    stateFunction: Function;
    max: number;
  }) {
    if (currentIndex + 1 < max) {
      stateFunction((prev: number) => prev + 1);
    }
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
    <main>
      {/* Header and in-game Navigation */}
      {/* Test sections */}
      <div className="h-screen divide-y">
        <div className="relative mx-auto flex min-h-[50%] items-center justify-center px-2 sm:w-[80%]">
          <p
            className="text-5xl text-gray-500 sm:text-[120px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(questionWithHighlights),
            }}
          ></p>
          <div className="absolute top-2">
            <p>Number of questions: {questions.length}</p>
            <p>Current question: {currentQuestionIndex + 1}</p>
          </div>
          <div className="absolute bottom-2">
            <button
              disabled={currentQuestionIndex === 0}
              className="rounded border p-2 disabled:bg-gray-300"
              onClick={() => {
                prev({
                  currentIndex: currentQuestionIndex,
                  stateFunction: setCurrentQuestionIndex,
                  min: 0,
                });
                setCurrentAnswerIndex(0);
              }}
            >
              Prev
            </button>
            <button
              disabled={currentQuestionIndex + 1 >= questions.length}
              className="rounded border p-2 disabled:bg-gray-300"
              onClick={() => {
                next({
                  currentIndex: currentQuestionIndex,
                  stateFunction: setCurrentQuestionIndex,
                  max: questions.length,
                });
                setCurrentAnswerIndex(0);
              }}
            >
              Next
            </button>
          </div>
        </div>
        <div className="relative mx-auto flex min-h-[50%] items-center justify-center px-2 sm:w-[80%]">
          <p
            className="text-5xl sm:text-[120px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(answerWithHighlights),
            }}
          ></p>
          {/* Debug bar */}
          <div className="absolute top-2">
            <p>Number of answers: {currentQuestion.answers.length}</p>
            <p>Current answer: {currentAnswerIndex + 1}</p>
          </div>
          <div className="absolute bottom-2">
            <button
              disabled={currentAnswerIndex === 0}
              className="rounded border p-2 disabled:bg-gray-300"
              onClick={() => {
                prev({
                  currentIndex: currentAnswerIndex,
                  stateFunction: setCurrentAnswerIndex,
                  min: 0,
                });
              }}
            >
              Prev
            </button>
            <button
              disabled={
                currentAnswerIndex + 1 >= currentQuestion.answers.length
              }
              className="rounded border p-2 disabled:bg-gray-300"
              onClick={() => {
                next({
                  currentIndex: currentAnswerIndex,
                  stateFunction: setCurrentAnswerIndex,
                  max: currentQuestion.answers.length,
                });
              }}
            >
              Next
            </button>
          </div>
        </div>
        {/* <div className="grid h-full place-items-center gap-16 p-2 sm:p-0">
          <p className="absolute right-2 top-2 text-xl sm:right-4 sm:text-5xl">
            {currentQuestionIndex + 1}/{questions.length}
          </p>
          <div className="divide-y">
            <p className="py-4 text-center text-gray-700 text-5xl sm:text-[180px]">
              {currentQuestion.question}
            </p>
            <p className="py-4 text-center text-5xl sm:text-[180px]">
              {currentAnswer}
            </p>
          </div>
        </div> */}
      </div>
    </main>
  );
};

ReviewTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ReviewTestPage;
