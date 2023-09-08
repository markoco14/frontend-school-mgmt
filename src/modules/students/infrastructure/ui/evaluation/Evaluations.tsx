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
      {loading ? (
        <Skeleton>
          <ClassListSkeletonProps />
        </Skeleton>
      ) : (
        <ul className="divide-y">
          {evaluations?.map((evaluation, index) => (
            <li key={`evaluation-${evaluation.id}`} className="p-2">
              <p>ID: {evaluation.id}</p>
              <p>Date: {new Date(evaluation.date).toDateString()}</p>
              <p>Evaluation Type: {evaluation.evaluation_type === 0 && "Daily"}</p>
              <p>
                Evaluation Value:
                {evaluation.evaluation_value}
              </p>
              <p>Author: {evaluation.author_id}</p>
              <p>Subject: {evaluation.subject_id}</p>
              <p>Level: {evaluation.level_id}</p>
              <p>Class: {evaluation.class_id}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Evaluations