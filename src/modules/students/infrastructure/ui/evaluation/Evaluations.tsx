import { useEffect, useState } from "react";
import { Student } from "../../../domain/entities/Student";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";

const Evaluations = ({ student }: { student: Student }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>([]);

  useEffect(() => {
    async function getEvaluations() {
      setLoading(true);
      await studentEvaluationAdapter
        .list({ student_id: student.id })
        .then((res) => {
          setEvaluations(res);
          setLoading(false);
        });
    }

    getEvaluations();
  }, [student]);

  return (
    <>
      <h2>Evaluations</h2>
      {loading ? (
        <Skeleton>
          <ClassListSkeletonProps />
        </Skeleton>
      ) : (
        <ul>
          {evaluations?.map((evaluation, index) => (
            <li
              key={`evaluation-${evaluation.id}`}
              className="flex justify-between"
            >
              <p>{evaluation.id}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Evaluations