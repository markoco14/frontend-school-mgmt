import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { useEffect, useState } from "react";
import { Student } from "@/src/modules/students/entities/Student";
import { StudentEvaluationFilters } from "@/src/modules/students/entities/StudentEvaluationFilters";



const EvaluationList = ({
  evaluations,
}: {
  evaluations: StudentEvaluation[];
}) => {
  return (
    <ul className="divide-y">
      {evaluations?.map((evaluation) => (
        <li key={`evaluation-${evaluation.id}`} className="p-2">
          {/* <p>ID: {evaluation.id}</p> */}
          <p>Date: {new Date(evaluation.date).toDateString()}</p>
          {/* <p>Evaluation Type: {evaluation.evaluation_type === 0 && "Daily"}</p> */}
          {/* <p>Attribute ID: {evaluation.evaluation_attribute_id}</p> */}
          <p>
            Evaluation Value:
            {evaluation.evaluation_value}
          </p>
          <p>Author: {evaluation.author_id}</p>
          {/* <p>Subject: {evaluation.subject_id}</p> */}
          {/* <p>Level: {evaluation.level_id}</p> */}
          {/* <p>Class: {evaluation.class_id}</p> */}
        </li>
      ))}
    </ul>
  );
};

const EvaluationFilters = ({
  filters,
  setFilters,
}: {
  filters: StudentEvaluationFilters;
	setFilters: Function;
}) => {
  return (
    <div className="flex gap-2 border-b-2 p-2">
      <p>Evaluation Attribute ID</p>
      <select
        defaultValue={
          filters.evaluation_attribute_id ? filters.evaluation_attribute_id : ""
        }
        onChange={(e) => {
          let newFilters = { ...filters };

          if (e.target.value === "") {
            delete newFilters.evaluation_attribute_id;
          } else {
            newFilters.evaluation_attribute_id = Number(e.target.value);
          }

          setFilters(newFilters);
        }}
      >
        <option value="">All</option>
        <option value="1">Participation</option>
        <option value="2">Attitude</option>
        <option value="3">Comments</option>
      </select>
    </div>
  );
};

const Evaluations = ({ student }: { student: Student }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>([]);
	const [filters, setFilters] = useState<StudentEvaluationFilters>({});

  useEffect(() => {
    async function getEvaluations() {
      setLoading(true);
      await studentEvaluationAdapter
        .list({ student_id: student.id, filters: filters })
        .then((res) => {
          setEvaluations(res);
          setLoading(false);
        });
    }

    getEvaluations();
  }, [student, filters]);

  return (
    <>
      {/* EVALUATION FILTERS */}

      {/* EVALUATION LIST */}
      {loading ? (
        <Skeleton>
          <ClassListSkeletonProps />
        </Skeleton>
      ) : (
        <>
          <EvaluationFilters filters={filters} setFilters={setFilters}/>
          <EvaluationList evaluations={evaluations} />
        </>
      )}
    </>
  );
};

export default Evaluations;
