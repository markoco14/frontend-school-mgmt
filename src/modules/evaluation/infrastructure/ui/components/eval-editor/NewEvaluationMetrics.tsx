import { useState } from "react";
import NewRangeMetricForm from "./NewRangeMetricForm";
import NewTextMetricForm from "./newTextMetricForm";

const NewEvaluationMetrics = () => {
	const [isRange, setIsRange] = useState<boolean>(true);
	
	return (
    <article className="min-h-[500px] min-w-[800px]">
      <div className="grid grid-cols-2">
        <button
          className={`${
            isRange
              ? "border-l-2 border-r-2 border-t-2 border-blue-300 bg-blue-300 text-blue-900 decoration-2 "
              : "border-b-2 border-blue-300 bg-gray-100 shadow-inner"
          } w-full rounded-tl py-2 duration-200 ease-in-out`}
          onClick={() => setIsRange(true)}
        >
          Numeric Metric
        </button>
        <button
          className={`${
            isRange
              ? "border-b-2 border-blue-300 bg-gray-100 shadow-inner"
              : "border-l-2 border-r-2 border-t-2 border-blue-300 bg-blue-300 text-blue-900 decoration-2 "
          } w-full rounded-tr py-2 duration-200 ease-in-out`}
          onClick={() => setIsRange(false)}
        >
          Text Metric
        </button>
      </div>
      {isRange ? (
        <div className="border-b-2 border-l-2 border-r-2 border-blue-300">
          <NewRangeMetricForm />
        </div>
      ) : (
        <div className="border-b-2 border-l-2 border-r-2 border-blue-300">
          <NewTextMetricForm />
        </div>
      )}
    </article>
  );
}

export default NewEvaluationMetrics;