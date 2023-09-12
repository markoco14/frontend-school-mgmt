import EvaluationListSkeletonProps from "@/src/components/ui/skeleton/EvaluationListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { StudentEvaluationFilters } from "@/src/modules/students/domain/entities/StudentEvaluationFilters";
import { studentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAdapter";
import { Dictionary } from "lodash";
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
  const [studentsWithEvaluations, setStudentsWithEvaluations] =
    useState<Student[]>();
  const [filters, setFilters] = useState<StudentEvaluationFilters>({});
  // const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    async function getEvaluations() {
      const preparedDate = date?.toISOString().split("T")[0];
      setLoading(true);
      await studentAdapter
        .listPresentStudentsWithEvaluations({
          date: preparedDate,
          classId: Number(selectedClass?.id),
          // filters: filters,
        })
        .then((res) => {
          // const groupedData = groupBy(
          //   res,
          //   (evaluation) => evaluation.student?.last_name,
          // );
          console.log(res);
          setStudentsWithEvaluations(res);
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
    <>
      {loading ? (
        <Skeleton>
          <EvaluationListSkeletonProps />
        </Skeleton>
      ) : (
        <ul className="grid gap-4">
          {studentsWithEvaluations?.map((student) => (
            <li key={student.id} className="grid gap-4 rounded-lg bg-white p-4 shadow">
              <div className="flex gap-4 items-center">
                <div className="relative col-span-1 flex justify-center">
                  <Image
                    src={student?.photo_url}
                    alt={`An image of ${student.first_name}`}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </div>
                <p>
                  {student.first_name} {student.last_name}
                </p>
              </div>
              <div className="grid grid-cols-2">
                {student.evaluations_for_day?.map((evaluation) => (
                  <p
                    key={evaluation.id}
                    className={`${
                      evaluation.evaluation_attribute_id === 3
                        ? "col-span-2"
                        : "col-span-1"
                    }`}
                  >
                    {evaluation.evaluation_value}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReportingEvaluationSection;
