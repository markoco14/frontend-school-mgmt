import { Reorder } from "framer-motion";

import Link from "next/link";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../_app";

import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import CardContainer from "@/src/modules/core/components/CardContainer";
import Layout from "@/src/modules/core/components/Layout";
import { Test } from "@/src/modules/tests/entities/Test";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import ReorderListContainer from "@/src/modules/core/components/ReorderListContainer";

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
    mistakes: ["her", "it"],
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

const EditTestPage: NextPageWithLayout = () => {
  const { user } = useUserContext();
  const test = currentTest;
  const [questionList, setQuestionList] = useState<TestQuestion[]>(questions);

  async function handleReorder(values: any[]) {
    setQuestionList(values);
    // can set up debounce logic
    // do not update in db until no reorders for last 2 seconds
    // can worry about that logic later
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
          <div className="grid gap-2 mb-8">
            <h1 className="text-3xl">{test.name}</h1>
            <p className="text-gray-500">Click a question below to edit the answers.</p>
          </div>
          <ReorderListContainer
            axis="y"
            values={questionList}
            onReorder={handleReorder}
          >
            {questionList?.map((question, index) => (
              <Reorder.Item
                className="p-2 hover:bg-blue-300 hover:cursor-pointer"
                key={`question-${question.id}`}
                value={question}
              >
                <>
                  <p>
                    {index + 1}. {question.question}
                  </p>
                </>
              </Reorder.Item>
            ))}
          </ReorderListContainer>
        </CardContainer>
      </AdminLayout>
    </Layout>
  );
};

EditTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default EditTestPage;
