import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import EvaluationListSkeletonProps from "@/src/components/ui/skeleton/EvaluationListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { StudentEvaluationFilters } from "@/src/modules/students/domain/entities/StudentEvaluationFilters";
import { Dictionary, groupBy } from "lodash";
import { useEffect, useState } from "react";

const ReportingEvaluationSection = ({
  date,
  selectedClass,
}: {
  date: Date;
  selectedClass: ClassEntity | undefined;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluations, setEvaluations] =
    useState<Dictionary<StudentEvaluation[]>>();
  const [filters, setFilters] = useState<StudentEvaluationFilters>({});
  // const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    async function getEvaluations() {
      const preparedDate = date?.toISOString().split("T")[0];
      setLoading(true);
      await studentEvaluationAdapter
        .list({
          date: preparedDate,
          class_id: selectedClass?.id,
          filters: filters,
        })
        .then((res) => {
          const groupedData = groupBy(
            res,
            (evaluation) => evaluation.student?.last_name,
          );
          setEvaluations(groupedData);
          setLoading(false);
        });
    }

    getEvaluations();
  }, [date, filters, selectedClass]);

  function isSatOrSun({ date }: { date: Date }) {
    if (
      date.toDateString().split(" ")[0] === "Sat" ||
      date.toDateString().split(" ")[0] === "Sun"
    ) {
      return true;
    }
  }

  function isEmpty(obj: Dictionary<StudentEvaluation[]>) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  return (
    <ul className="grid gap-4">
      {loading && (
        <Skeleton>
          <EvaluationListSkeletonProps />
        </Skeleton>
      )}
      {!loading &&
        evaluations &&
        isEmpty(evaluations) &&
        isSatOrSun({ date: date }) && (
          <p className="rounded-lg border bg-white p-4 text-2xl">
            No school today
          </p>
        )}
      {!loading &&
        evaluations &&
        isEmpty(evaluations) &&
        !isSatOrSun({ date: date }) && (
          <p className="rounded-lg border bg-white p-4 text-2xl">
            No evaluations yet
          </p>
        )}
      {!loading &&
        evaluations &&
        Object.entries(evaluations).map(([studentId, studentData]) => (
          <li
            key={studentId}
            className="grid gap-2 rounded-lg border bg-white p-4"
          >
            <p className="text-xl">
              {studentData[0].student?.first_name}{" "}
              {studentData[0].student?.last_name}{" "}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {studentData
                .sort(
                  (a: StudentEvaluation, b: StudentEvaluation) =>
                    a.evaluation_attribute_id - b.evaluation_attribute_id,
                )
                .map((evaluation: any) => (
                  <div
                    key={evaluation.id}
                    className={`${
                      evaluation.evaluation_attribute_id !== 3
                        ? "col-span-1"
                        : "col-span-2"
                    }`}
                  >
                    {evaluation.evaluation_attribute_id !== 3 ? (
                      <div className="rounded border p-2 shadow">
                        <p>
                          {evaluation.evaluation_attribute.name}:{" "}
                          {evaluation.evaluation_value}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded border p-2 shadow">
                        <p>{evaluation.evaluation_value}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ReportingEvaluationSection;
