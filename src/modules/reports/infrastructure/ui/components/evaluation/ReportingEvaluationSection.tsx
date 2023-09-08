import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { StudentEvaluationFilters } from "@/src/modules/students/domain/entities/StudentEvaluationFilters";
import Image from "next/image";
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
        .list({
          date: preparedDate,
          class_id: selectedClass?.id,
          filters: filters,
        })
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
        <ul className="divide-y">
          {evaluations?.map((evaluation) => (
            <li key={`evaluation-${evaluation.id}`} className="grid gap-2 py-2">
              <div className="flex items-center gap-2">
                <div className="relative col-span-1 flex justify-center">
                  <Image
                    src={
                      evaluation.student ? evaluation.student?.photo_url : ""
                    }
                    alt={`An image of ${evaluation.student?.first_name}`}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </div>
                <p>
                  {evaluation.student?.first_name}{" "}
                  {evaluation.student?.last_name}
                </p>
              </div>
              <div>
                <p>{evaluation.evaluation_attribute.name}</p>
                <p>
                  {evaluation.evaluation_attribute_id !== 3 ? (
                    <>
                      {evaluation.evaluation_value} /{" "}
                      {evaluation.evaluation_attribute.max_value}
                    </>
                  ) : (
                    <>{evaluation.evaluation_value}</>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ReportingEvaluationSection;
