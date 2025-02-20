import Link from "next/link";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../../../_app";

import Drawer from "@/src/components/Drawer";
import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import CardContainer from "@/src/modules/core/components/CardContainer";
import Layout from "@/src/modules/core/components/Layout";
import Modal from "@/src/modules/core/components/Modal";
import ReorderListContainer from "@/src/modules/core/components/ReorderListContainer";
import EditAnswers from "@/src/modules/tests/components/EditAnswers";
import { Test } from "@/src/modules/tests/entities/Test";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { Reorder } from "framer-motion";
import NewQuestionForm from "../../../../../components/edit-tests/NewQuestionForm";

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
  },
  {
    id: 2,
    question: "Does I look like he?",
    mistakes: ["Does", "he"],
  },
  {
    id: 3,
    question: "Do we want to take her from it?",
    mistakes: ["her", "it"],
  },
  {
    id: 4,
    question: "Do I want to talk to they?",
    mistakes: ["they"],
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
  const [isEditQuestion, setIsEditQuestion] = useState<boolean>(false);

  function handleCloseDrawer() {
    setIsEditQuestion(false);
    setCurrentQuestion(undefined);
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
                  key={`question-${question.id}`}
                  value={question}
                  className={`${question.id === currentQuestion?.id && "bg-blue-200"
                    } flex justify-between p-2 hover:bg-blue-300`}
                >
                  <span>
                    {index + 1}. {question.question}
                  </span>
                  {/* change to drawer button */}
                  <button
                    onClick={() => {
                      setIsEditQuestion(true);
                      setCurrentQuestion(question);
                    }}
                  >
                    Edit
                  </button>
                </Reorder.Item>
              ))}
            </ReorderListContainer>
          </section>
          <Drawer
            show={isEditQuestion}
            title={`Edit Question and Answers`}
            handleCloseDrawer={handleCloseDrawer}
          >
            <p>{currentQuestion?.question}</p>
            {currentQuestion && (
              <EditAnswers questionId={currentQuestion.id} />
            )}
          </Drawer>
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
        </CardContainer>
      </AdminLayout>
    </Layout>
  );
};

EditTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default EditTestPage;
