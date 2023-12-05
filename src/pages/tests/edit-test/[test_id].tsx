// import { Reorder } from "framer-motion";

import Link from "next/link";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../_app";

import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import CardContainer from "@/src/modules/core/components/CardContainer";
import Layout from "@/src/modules/core/components/Layout";
import Modal from "@/src/modules/core/components/Modal";
// import ReorderListContainer from "@/src/modules/core/components/ReorderListContainer";
import ListContainer from "@/src/modules/core/components/ListContainer";
import { Test } from "@/src/modules/tests/entities/Test";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { addListItem } from "@/src/utils/addListItem";
import toast from "react-hot-toast";
import AnswerList from "./AnswerList";

const currentTest: Test = {
  id: 1,
  name: "Level 7 Unit 1 Test 1",
  maxCorrections: 2,
  allowNoCorrections: true,
};

const questions: TestQuestion[] = [
  {
    id: 1,
    question: "Do her give the it to he?",
    mistakes: ["Do", "her", "the", "he"],
    answers: [
      { id: 1, answer: "Does she give it to him?" },
      { id: 2, answer: "Does she give the ball to him?" },
      { id: 3, answer: "Does she give him it?" },
      { id: 4, answer: "Does she give him the ball?" },
    ],
  },
  {
    id: 2,
    question: "Does I look like he?",
    mistakes: ["Does", "he"],
    answers: [
      { id: 5, answer: "Do I look like him?" },
      { id: 6, answer: "Do I look like her?" },
    ],
  },
  {
    id: 3,
    question: "Do we want to take her from it?",
    mistakes: ["her", "it"],
    answers: [
      { id: 7, answer: "Do we want to take it from her?" },
      { id: 8, answer: "Do they want to take it from her?" },
      { id: 9, answer: "Do you want to take it from her?" },
    ],
  },
  {
    id: 4,
    question: "Do I want to talk to they?",
    mistakes: ["they"],
    answers: [{ id: 10, answer: "Do I want to talk to them?" }],
  },
];

const EditTestPage: NextPageWithLayout = () => {
  const { user } = useUserContext();
  const test = currentTest;
  const [questionList, setQuestionList] = useState<TestQuestion[]>(questions);
  const [currentQuestion, setCurrentQuestion] = useState<
    TestQuestion | undefined
  >();

  const [isNewQuestion, setIsNewQuestion] = useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<string>("");

  // async function handleReorder(values: any[]) {
  //   setQuestionList(values);
  //   // can set up debounce logic
  //   // do not update in db until no reorders for last 2 seconds
  //   // can worry about that logic later
  // }

  if (!user) {
    return (
      <Layout>
        <AdminLayout>
          <CardContainer>
            <p>You are not logged in!</p>
            <Link href="/">Log in</Link>
          </CardContainer>
        </AdminLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminLayout>
        <CardContainer>
          <div className="mb-8 grid gap-2">
            <h1 className="text-3xl">{test.name}</h1>
            <p className="text-gray-500">
              Click a question below to edit the answers. Drag and drop to
              change question order.
            </p>
          </div>
          <div className="mb-8 flex">
            <button
              onClick={() => setIsNewQuestion(true)}
              className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
            >
              New Question
            </button>
          </div>
          {/* Questions */}
          <div className="grid grid-cols-2">
            <ListContainer>
              {questionList?.map((question, index) => (
                <li
                  key={`question-${question.id}`}
                  // value={question}
                  className={`${
                    currentQuestion?.id === question.id ? "bg-blue-200" : ""
                  } p-2 duration-200 ease-in-out hover:cursor-pointer hover:bg-blue-300`}
                  onClick={() => setCurrentQuestion(question)}
                >
                  <div className={`flex justify-between`}>
                    <p>
                      {index + 1}. {question.question}
                    </p>
                  </div>
                </li>
              ))}
            </ListContainer>
            <div>
              {!currentQuestion ? (
                <div>
                  <p className="p-2">Click a question to list answers.</p>
                </div>
              ) : (
                <AnswerList answers={currentQuestion.answers} />
                // <p>Answers for &quot;{currentQuestion.question}&quot;</p>
              )}
            </div>
          </div>
          
          <Modal
            show={isNewQuestion}
            close={setIsNewQuestion}
            title="New Question"
          >
            <div className="flex flex-col gap-2">
              <label>hellow new question</label>
              <input
                type="text"
                className="border p-2"
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <button
                onClick={() => {
                  if (!newQuestion) {
                    toast("You need to type the question before saving.");
                  }
                  // TODO: replace with call to API
                  // return new DB ojbect
                  const newQuestionMapper = {
                    id: 8,
                    question: newQuestion,
                    mistakes: [],
                    answers: [],
                  };
                  // add to list
                  const updatedQuestionList = addListItem(
                    questionList,
                    newQuestionMapper,
                  );
                  setQuestionList(updatedQuestionList);
                }}
                className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
              >
                OK
              </button>
            </div>
          </Modal>
        </CardContainer>
      </AdminLayout>
    </Layout>
  );
};

EditTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default EditTestPage;
