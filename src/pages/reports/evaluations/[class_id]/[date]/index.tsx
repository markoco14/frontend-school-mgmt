import AuthContext from "@/src/AuthContext";
import BackButton from "@/src/components/ui/utils/BackButton";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { evaluationAttributeAdapter } from "@/src/modules/evaluation/infrastructure/adapters/evaluationAttributeAdapter";
import TextAttributeForm from "@/src/modules/reports/infrastructure/ui/components/evaluation/TextAttributeForm";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { studentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAdapter";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

export const getServerSideProps: GetServerSideProps<{
  students: Student[] | undefined;
}> = async (context) => {
  let students;
  context.query.date &&
    (await studentAdapter
      .listPresentStudentsWithEvaluations({
        classId: Number(context.query.class_id),
        date: context.query.date.toString(),
      })
      .then((res) => {
        students = res;
      }));

  return { props: { students } };
};

const RangeAttribute = ({
  student,
  evaluation,
  attribute,
}: {
  student: Student;
  evaluation: StudentEvaluation;
  attribute: EvaluationAttribute;
}) => {
  // console.log(evaluation);
  const maxValue = attribute.max_value;
  const minValue = attribute.min_value;
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
    <p>
      {values.map((value) => (
        <button
          onClick={() => {
            setSelectedValue(value);
            toast.success(
              `Setting ${student.first_name}'s ${attribute.name} at ${value}`,
            );
          }}
          key={value}
          className={`${
            selectedValue === value ? "bg-green-500" : ""
          } rounded border p-2 text-center shadow`}
        >
          {value}
        </button>
      ))}
    </p>
  );
};

export default function ReportDate({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, selectedSchool } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluationAttributes, setEvaluationAttributes] = useState<
    EvaluationAttribute[]
  >([]);
  const [tab, setTab] = useState<number>(1);
  console.log(students);

  const tabLinks = [
    {
      value: 1,
      name: "Behavior",
    },
    {
      value: 2,
      name: "Comments",
    },
  ];

  useEffect(() => {
    async function getData() {
      try {
        await evaluationAttributeAdapter
          .list({ school_id: selectedSchool?.id })
          .then((res) => {
            setLoading(false);
            setEvaluationAttributes(res);
          });
      } catch (error: any) {
        toast.error(error.details);
        setLoading(false);
      }
    }
    selectedSchool && getData();
  }, [selectedSchool]);
  return (
    <Layout>
      <section className="grid gap-4">
        <div>
          <BackButton />
        </div>
        {/* <PageTabNavigation links={tabLinks} tab={tab} setTab={setTab} /> */}
        {!students?.length ? (
          <p>
            No attendance records found for today. Please check with your
            admins.
          </p>
        ) : (
          <div>
            <ul className="divide-y border shadow">
              {students?.map((student) => (
                <li
                  key={student.id}
                  className="grid grid-cols-6 items-center p-2 hover:bg-gray-100"
                >
                  <p className="col-span-1">
                    {student.first_name} {student.last_name} {student.id}
                  </p>

                  {student.evaluations_for_day?.map((evaluation) =>
                    evaluation.evaluation_attribute.max_value &&
                    evaluation.evaluation_attribute.min_value ? (
                      <div
                        key={evaluation.id}
                        className="col-span-1 text-center"
                      >
                        <RangeAttribute
                          student={student}
                          evaluation={evaluation}
                          attribute={evaluation.evaluation_attribute}
                        />
                      </div>
                    ) : (
                      <div
                        key={evaluation.id}
                        className="col-span-3 grid items-center"
                      >
                        <TextAttributeForm
                          student={student}
                          evaluation={evaluation}
                          attribute={evaluation.evaluation_attribute}
                        />
                      </div>
                    ),
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </Layout>
  );
}
