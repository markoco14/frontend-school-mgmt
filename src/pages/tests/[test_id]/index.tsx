import { useRouter } from "next/router";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";

const tests = [
  { id: 1, name: "Test 1" },
  { id: 2, name: "Test 2" },
  { id: 3, name: "Test 3" },
  { id: 4, name: "Test 4" },
];

const DoTestPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTest = tests.find((test) => {
    return test.id === Number(router.query.test_id);
  });

  return (
    <main>
      <button onClick={() => router.push('/tests')}className="absolute left-0 top-0">Back</button>
      <div>
        <h1>{selectedTest?.name}</h1>
      </div>
    </main>
  );
};

DoTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default DoTestPage;
