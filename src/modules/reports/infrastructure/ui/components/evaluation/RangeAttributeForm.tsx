import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { useState } from "react";
import toast from "react-hot-toast";

const RangeAttributeForm = ({
  student,
  evaluation,
}: {
  student: Student;
  evaluation: StudentEvaluation;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  async function updateEvaluationValue({
    evaluation,
    new_value,
  }: {
    evaluation: StudentEvaluation;
    new_value: number;
  }) {
    setLoading(true);
    await studentEvaluationAdapter
      .patch({
        evaluation_id: Number(evaluation.id),
        evaluation_value: new_value.toString(),
      })
      .then((res) => {
        setLoading(false);
        toast.success(`Updated successfully!`);
      });
  }
  const maxValue = evaluation.evaluation_attribute?.max_value;
  const minValue = evaluation.evaluation_attribute?.min_value;
  const valueArray = maxValue && minValue && new Array(maxValue - minValue);
  const values = Array.from(
    // @ts-ignore
    { length: maxValue - minValue + 1 },
    // @ts-ignore
    (_, i) => i + minValue,
  );

  const [selectedValue, setSelectedValue] = useState<number>(
    Number(evaluation.evaluation_value),
  );
  const length = 3;
  return (
    <div className="grid">
      <div>
        {values.map((value) => (
          <button
            key={value}
            onClick={() => {
              setSelectedValue(value);
              updateEvaluationValue({
                evaluation: evaluation,
                new_value: value,
              });
              toast.success(
                `Setting ${student.first_name}'s ${evaluation.evaluation_attribute?.name} at ${value}`,
              );
            }}
            className={`${
              selectedValue === value ? "bg-green-500" : ""
            } rounded border p-2 text-center shadow`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RangeAttributeForm;
