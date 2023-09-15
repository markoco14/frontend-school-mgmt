import AuthContext from "@/src/AuthContext";
import BackButton from "@/src/components/ui/utils/BackButton";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { Subject } from "@/src/modules/curriculum/domain/entities/Subject";
import { subjectAdapter } from "@/src/modules/curriculum/infrastructure/adapters/subjectAdapter";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import RangeAttributeForm from "@/src/modules/reports/infrastructure/ui/components/evaluation/RangeAttributeForm";
import TextAttributeForm from "@/src/modules/reports/infrastructure/ui/components/evaluation/TextAttributeForm";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { studentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAdapter";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

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

export default function ReportDate({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, selectedSchool } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(1);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number>();
  const [presentStudents, setPresentStudents] = useState<Student[]>([]);
  const [nullEvaluationCount, setNullEvaluationCount] = useState<number>(() => {
    let nullEvaluationCount = 0;
    students?.forEach((student) => {
      if (student.evaluations_for_day === null) {
        nullEvaluationCount += 1;
      }
    });
    return nullEvaluationCount;
  });

  const [isBatchCreate, setIsBatchCreate] = useState<boolean>(false);
  const router = useRouter();

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

  async function batchCreateEvaluations({ students }: { students: Student[] }) {
    router.query.date &&
      selectedSubject &&
      (await studentEvaluationAdapter
        .batchCreateEvaluations({
          schoolId: selectedSchool.id,
          students: students,
          classId: Number(router.query.class_id),
          date: router.query.date.toString(),
          userId: Number(user?.user_id),
          subjectId: selectedSubject,
        })
        .then((res) => {
          setPresentStudents(res);
          if (nullEvaluationCount) {
            setNullEvaluationCount(0);
          }
          setIsBatchCreate(false);
        }));
  }

  function handleSelectSubject({ subjectId }: { subjectId: number }) {
    setSelectedSubject(subjectId);
  }

  function handleClose() {
    setIsBatchCreate(false);
  }

  useEffect(() => {
    async function getSubjects() {
      if (selectedSchool) {
        await subjectAdapter
          .listSchoolSubjects({ schoolId: selectedSchool.id })
          .then((res) => {
            setSubjects(res.results);
            setSelectedSubject(res.results[0]?.id);
          });
      }
    }

    getSubjects();
    students && setPresentStudents(students);
  }, [selectedSchool, setSubjects, students]);

  return (
    <Layout>
      <section className="grid gap-4">
        <div>
          <BackButton />
        </div>
        {/* <PageTabNavigation links={tabLinks} tab={tab} setTab={setTab} /> */}
        {!presentStudents?.length ? (
          <p>
            No attendance records found for today. Please check with your
            admins.
          </p>
        ) : nullEvaluationCount === presentStudents.length ? (
          <button
            className="text-left underline underline-offset-2"
            onClick={() => {
              setIsBatchCreate(true);
            }}
          >
            Create student evaluations
          </button>
        ) : (
          <ul className="grid gap-4 border bg-gray-300 shadow xs:bg-gray-100 xs:p-4">
            {presentStudents?.map((student) => (
              <li
                key={student.id}
                className="flex flex-col gap-4 bg-white p-2 xs:grid xs:grid-cols-4 xs:border-2 xs:p-4"
              >
                <p className="col-span-2 w-full text-xl xs:col-span-4">
                  {student.first_name} {student.last_name} {student.id}
                </p>
                {!student.evaluations_for_day ? (
                  <p className="xs:col-span-4">
                    Student evaluations not prepared.{" "}
                    <button
                      onClick={() => {
                        setIsBatchCreate(true);
                      }}
                      className="underline underline-offset-2"
                    >
                      Click to prepare them now.
                    </button>
                  </p>
                ) : (
                  <>
                    {student.evaluations_for_day?.map((evaluation) =>
                      evaluation.evaluation_attribute.max_value &&
                      evaluation.evaluation_attribute.min_value ? (
                        <div
                          key={evaluation.id}
                          className="col-span-2 rounded border bg-white p-2 text-center shadow xs:col-span-2"
                        >
                          <RangeAttributeForm
                            student={student}
                            evaluation={evaluation}
                          />
                        </div>
                      ) : (
                        <div
                          key={evaluation.id}
                          className="grid w-full items-center rounded border p-2 shadow xs:col-span-4"
                        >
                          <TextAttributeForm evaluation={evaluation} />
                        </div>
                      ),
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      <Modal
        show={isBatchCreate}
        close={handleClose}
        title={`Create Evaluation Reports`}
      >
        <div className="flex flex-col gap-4">
          <p>Confirm the subject before creating the evaluations</p>
          <div>
            <select
              className="w-full rounded border bg-white p-2 shadow"
              defaultValue={subjects[0]?.id}
              onChange={(e) =>
                handleSelectSubject({ subjectId: Number(e.target.value) })
              }
            >
              {subjects.map((subject) => (
                <option className="p-2" key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-1/2 rounded bg-blue-600 px-2 py-1 text-white disabled:bg-gray-600"
            disabled={!selectedSubject}
            onClick={() => {
              batchCreateEvaluations({ students: presentStudents });
            }}
          >
            Create Evaluations
          </button>
        </div>
      </Modal>
    </Layout>
  );
}
