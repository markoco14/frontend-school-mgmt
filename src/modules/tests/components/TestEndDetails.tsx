import Link from "next/link";
import { Test } from "../entities/Test";

const TestEndDetails = ({ test }: { test: Test }) => {
  
  return (
    <div className="grid gap-8 text-center">
      <p className="text-xl sm:text-8xl">Finished!</p>
      <p className="text-xl sm:text-3xl">Congratulations! You finished {test.name}</p>
			<Link href="/">Back to day&apos;s schedule.</Link>
    </div>
  );
};

export default TestEndDetails;
