
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { StudentEvaluationFilters } from "@/src/modules/students/domain/entities/StudentEvaluationFilters";
import { useEffect, useState } from "react";

const ReportingEvaluationSection = ({
  date,
  selectedClass,
}: {
  date: Date;
  selectedClass: ClassEntity | undefined;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>([]);
  const [filters, setFilters] = useState<StudentEvaluationFilters>({});
  // const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    async function getEvaluations() {
      console.log(date.toISOString().split("T")[0]);
      const preparedDate = date?.toISOString().split("T")[0];
      setLoading(true);
      await studentEvaluationAdapter
        .list({ date: preparedDate, class_id: selectedClass?.id, filters: filters })
        .then((res) => {
          console.log(res);
          setEvaluations(res);
          setLoading(false);
        });
    }

    getEvaluations();
  }, [date, filters, selectedClass]);
  return (
    <>
      <section>
        <ul>
          {evaluations?.map((evaluation) => (
            <li key={`evaluation-${evaluation.id}`}>
              <p>ID: {evaluation.id}</p>
              <p>Date: {evaluation.date}</p>
              <p>Evaluation: {evaluation.evaluation_value}</p>
              <p>Class: {evaluation.class_id}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ReportingEvaluationSection;
