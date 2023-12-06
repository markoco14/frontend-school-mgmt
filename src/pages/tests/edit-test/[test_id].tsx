import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../_app";

import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import CardContainer from "@/src/modules/core/components/CardContainer";
import Layout from "@/src/modules/core/components/Layout";
import Modal from "@/src/modules/core/components/Modal";
import ReorderListContainer from "@/src/modules/core/components/ReorderListContainer";
import { Answer } from "@/src/modules/tests/entities/Answer";
import { Test } from "@/src/modules/tests/entities/Test";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { addListItem } from "@/src/utils/addListItem";
import { Reorder } from "framer-motion";
import toast from "react-hot-toast";
import AnswerList from "./AnswerList";
import NewAnswerForm from "./NewAnswerForm";
import NewQuestionForm from "./NewQuestionForm";
import Drawer from "./Drawer";

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



const EditTestPage: NextPageWithLayout = () => {
  const { user } = useUserContext();
  const test = currentTest;
  const [questionList, setQuestionList] = useState<TestQuestion[]>(questions);
  const [currentQuestion, setCurrentQuestion] = useState<
    TestQuestion | undefined
  >();

  const [isNewQuestion, setIsNewQuestion] = useState<boolean>(false);
  const [isNewAnswer, setIsNewAnswer] = useState<boolean>(false);

  // Drawer
  const [isEditQuestion, setIsEditQuestion] = useState<boolean>(false);
  function handleCloseDrawer() {
    setIsEditQuestion(false);
    setCurrentQuestion(undefined);
  }

  // TODO: try derived state for answerList
  const answerList = currentQuestion?.answers;


  function handleAddAnswerToQuestion({
    answer,
    answerList,
  }: {
    answer: string;
    answerList: Answer[];
  }) {
    if (!currentQuestion) {
      toast("You need to choose a question first.");
      return;
    }

    const randomId = Math.floor(Math.random() * 100) + 15;
    const newAnswer: Answer = {
      id: randomId,
      answer: answer,
      questionId: currentQuestion?.id,
    };
    // update answer list
    const updatedAnswerList = addListItem(answerList, newAnswer);

    // update question list
    const updatedQuestionList = questionList.map((question) => {
      if (question.id !== currentQuestion.id) {
        return question;
      }
      question.answers = updatedAnswerList;
      return question;
    });

    setQuestionList(updatedQuestionList);
  }

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
        {isEditQuestion && currentQuestion && (
          <Drawer
            title={`Edit "${currentQuestion.question}"`}
            handleCloseDrawer={handleCloseDrawer}
          >

                <div className="mb-8 flex">
                  <button
                    onClick={() => setIsNewAnswer(true)}
                    className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
                  >
                    New Answer
                  </button>
                </div>
              {!currentQuestion ? (
                <AnimatePresence>
                  <motion.p
                    className="p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Click a question to list answers.
                  </motion.p>
                </AnimatePresence>
              ) : (
                <AnswerList answers={currentQuestion.answers} />
              )}
          </Drawer>
        )}
        <CardContainer>
          <div className="mb-8 grid gap-2">
            <h1 className="text-3xl">{test.name}</h1>
            <p className="text-gray-500">
              Click a question below to edit the answers. Drag and drop to
              change question order.
            </p>
          </div>
          {/* Questions */}
          <section>
            <div className="mb-8 flex">
              <button
                onClick={() => setIsNewQuestion(true)}
                className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
              >
                New Question
              </button>
            </div>
            <ReorderListContainer
              axis="y"
              values={questionList}
              onReorder={setQuestionList}
            >
              {questionList.map((question, index) => (
                <Reorder.Item
                  key={question.id}
                  value={question}
                  className={`${
                    question.id === currentQuestion?.id && "bg-blue-200"
                  } flex justify-between p-2 hover:bg-blue-300`}
                >
                  <span>
                    {index + 1}. {question.question}
                  </span>
                  <button
                    onClick={() => {
                      if (question.id === currentQuestion?.id) {
                        setCurrentQuestion(undefined);
                        setIsEditQuestion(false);
                        return;
                      }
                      setCurrentQuestion(question);
                      setIsEditQuestion(true);
                    }}
                  >
                    Answers
                  </button>
                </Reorder.Item>
              ))}
            </ReorderListContainer>
          </section>

          <Modal
            show={isNewQuestion}
            close={setIsNewQuestion}
            title="New Question"
          >
            <NewQuestionForm
              questionList={questionList}
              setQuestionList={setQuestionList}
            />
          </Modal>
          <Modal show={isNewAnswer} close={setIsNewAnswer} title="New Answer">
            <NewAnswerForm
              answerList={answerList}
              updateAnswerList={handleAddAnswerToQuestion}
            />
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
