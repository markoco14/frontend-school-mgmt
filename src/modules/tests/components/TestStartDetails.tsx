import { Test } from "../entities/Test";

const TestStartDetails = ({ test }: { test: Test }) => {
  let mistakeString = "";

  if (test.maxCorrections) {
    for (let i = 0; i <= test.maxCorrections; i++) {
      // Skip 0 mistakes if 0 mistakes not allowed
      if (!test.allowNoCorrections && i === 0) {
        continue;
      }
      mistakeString += `${i}-`;
    }
  }

  return (
    <div className="grid gap-8 text-center">
      <p className="mb-16 text-3xl sm:text-8xl">{test.name}</p>
      <p className="text-xl sm:text-5xl">
        Correct any mistakes in the following sentences.
      </p>
      <p className="text-3xl text-red-700 sm:text-8xl">{mistakeString}X</p>
    </div>
  );
};

export default TestStartDetails;
