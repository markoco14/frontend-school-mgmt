import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import CardContainer from "@/src/modules/core/components/CardContainer";
import Layout from "@/src/modules/core/components/Layout";
import ListContainer from "@/src/modules/core/components/ListContainer";
import Modal from "@/src/modules/core/components/Modal";
import { Test } from "@/src/modules/tests/entities/Test";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import NewTestForm from "./newTestForm";

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

const TestHomePage: NextPageWithLayout = () => {
  const { user, selectedSchool } = useUserContext();
  const [testList, setTestList] = useState(tests);
  const [isCreateTest, setIsCreateTest] = useState<boolean>(false);

  function handleClose() {
    setIsCreateTest(false);
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
          <div className="mb-4 p-2">
            <div className="flex justify-between">
              <h1 className="mb-1 text-3xl">{selectedSchool?.name} Tests</h1>
              <button
                className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
                onClick={() => {
                  setIsCreateTest(true);
                }}
              >
                New Test
              </button>
            </div>
            <p className="text-gray-700">Manage all your test data here.</p>
          </div>
          <ListContainer>
            {testList.map((test) => (
              <li
                key={`test-${test.id}`}
                className="flex justify-between gap-4 p-2 hover:bg-blue-300"
              >
                <p>{test.name}</p>
                {/* Actions */}
                <div className="flex gap-4">
                  <Link href={`/tests/do-test/${test.id}`}>Try</Link>
                  <Link href={`/tests/edit-test/${test.id}`}>Edit</Link>
                </div>
              </li>
            ))}
          </ListContainer>
        </CardContainer>
        <Modal show={isCreateTest} close={handleClose} title="Create New Test">
          <NewTestForm testList={testList} setTestList={setTestList} />
        </Modal>
      </AdminLayout>
    </Layout>
  );
};

TestHomePage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default TestHomePage;
