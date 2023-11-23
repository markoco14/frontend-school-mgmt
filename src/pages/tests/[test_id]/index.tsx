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
      <div className="bg-gray-200 absolute left-0 top-0 grid py-2 w-full grid-cols-10 opacity-0 duration-200 ease-in-out hover:opacity-100">
        <button onClick={() => router.push("/tests")} className="col-span-1">
          Back
        </button>
        <h1 className="col-span-8 text-center text-5xl">
          {selectedTest?.name}
        </h1>
      </div>
      <div className="h-screen">
        <div className="grid h-full place-items-center">
          <p className="text-center text-[180px]">Did her give the it to he?</p>
        </div>
      </div>
    </main>
  );
};

DoTestPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default DoTestPage;
