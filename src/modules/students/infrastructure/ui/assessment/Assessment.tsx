import { useEffect, useState } from "react";
import { Student } from "../../../domain/entities/Student";
import { StudentAssessment } from "../../../domain/entities/StudentAssessment";
import { studentAssessmentAdapter } from "../../adapters/studentAssessmentAdapter";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";

const Assessments = ({ student }: { student: Student }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [assessments, setAssessments] = useState<StudentAssessment[]>([]);

  useEffect(() => {
    async function getAssessments() {
      setLoading(true);
      await studentAssessmentAdapter
        .list({ student_id: student.id, details: true })
        .then((res) => {
          setAssessments(res);
          setLoading(false);
        });
    }

    getAssessments();
  }, [student]);

  return (
    <>
      <h2>Student Assessments</h2>
      {loading ? (
        <Skeleton>
          <ClassListSkeletonProps />
        </Skeleton>
      ) : (
        <ul>
          {assessments?.map((assessment, index) => (
            <li
              key={`assessment-${assessment.id}`}
              className="flex justify-between"
            >
              <span>{assessment.assessment?.name}</span>
              <span className={`${!assessment.score && "text-red-500"} `}>
                {assessment.score
                  ? assessment.score
                  : `No score / ${assessment.assessment?.total_marks}`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Assessments