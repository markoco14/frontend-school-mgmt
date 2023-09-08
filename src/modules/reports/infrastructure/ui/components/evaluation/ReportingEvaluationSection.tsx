import DateChangeButtons from "@/src/modules/core/infrastructure/ui/components/DateChangeButtons";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { StudentEvaluationFilters } from "@/src/modules/students/domain/entities/StudentEvaluationFilters";
import { useEffect, useState } from "react";

const ReportingEvaluationSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>([]);
  const [filters, setFilters] = useState<StudentEvaluationFilters>({});
	const [date, setDate] = useState<Date>(new Date());

	

  useEffect(() => {
    async function getEvaluations() {
			console.log(date.toISOString().split("T")[0])
			const preparedDate = date.toISOString().split("T")[0];
      setLoading(true);
      await studentEvaluationAdapter
        .list({ date: preparedDate, filters: filters })
        .then((res) => {
          console.log(res);
          setEvaluations(res);
          setLoading(false);
        });
    }

    getEvaluations();
  }, [date, filters]);
  return (
    <>
      <div className="border-b-2 sm:col-span-8">
        <DateChangeButtons date={date} setDate={setDate} />
      </div>
      <ul>
        {evaluations?.map((evaluation) => (
          <li key={`evaluation-${evaluation.id}`}>
            <p>ID: {evaluation.id}</p>
            <p>Date: {evaluation.date}</p>
            <p>Date: {evaluation.evaluation_value}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReportingEvaluationSection;
