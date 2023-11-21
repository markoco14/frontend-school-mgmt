import { useUserContext } from "@/src/UserContext";
import BackButton from "@/src/components/ui/utils/BackButton";
import Layout from "@/src/modules/core/components/Layout";
import Modal from "@/src/modules/core/components/Modal";
import PageTabNavigation from "@/src/modules/core/components/PageTabNavigation";
import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { subjectAdapter } from "@/src/modules/curriculum/infrastructure/adapters/subjectAdapter";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import RangeAttributeForm from "@/src/modules/reports/infrastructure/ui/components/evaluation/RangeAttributeForm";
import TextAttributeForm from "@/src/modules/reports/infrastructure/ui/components/evaluation/TextAttributeForm";
import { Student } from "@/src/modules/students/entities/Student";
import { studentAdapter } from "@/src/modules/students/adapters/studentAdapter";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<{
  students: Student[] | undefined;
}> = async (context) => {
  let students;
  context.query.date &&
    (await studentAdapter
      .listPresentStudentsWithEvaluations({
        classId: Number(context.query.class_id),
        date: context.query.date.toString(),
        present: true,
      })
      .then((res) => {
        students = res;
      }));

  return { props: { students } };
};

export default function ReportDate({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, selectedSchool } = useUserContext();
  const [tab, setTab] = useState<number>(1);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
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
  const classId = Number(router.query.class_id?.toString());

  const links = [
    {
      value: 1,
      name: "All 1",
    },
    {
      value: 6,
      name: "All 2",
    },
    {
      value: 2,
      name: "Numeric",
    },
    {
      value: 7,
      name: "Numeric 2",
    },
    {
      value: 3,
      name: "Text",
    },
    {
      value: 4,
      name: "Participation",
    },
    {
      value: 5,
      name: "Attitude",
    },
  ];

  async function batchCreateEvaluations({ students }: { students: Student[] }) {
    router.query.date &&
      selectedSubjectId &&
      (await studentEvaluationAdapter
        .batchCreateEvaluations({
          schoolId: Number(selectedSchool?.id),
          students: students,
          classId: Number(router.query.class_id),
          date: router.query.date.toString(),
          userId: Number(user?.user_id),
          subjectId: selectedSubjectId,
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
    subjectId === 0
      ? setSelectedSubjectId(undefined)
      : setSelectedSubjectId(subjectId);
  }

  function handleClose() {
    setIsBatchCreate(false);
  }

  useEffect(() => {
    async function getSubjects() {
      if (selectedSchool) {
        await subjectAdapter
          .list({ schoolId: selectedSchool.id, class_id: classId })
          .then((res) => {
            setSubjects(res);
          });
      }
    }

    getSubjects();
    students && setPresentStudents(students);
  }, [selectedSchool, setSubjects, students, classId]);

  return (
    <Layout>
      <section className="grid gap-4">
        <div>
          <BackButton />
        </div>

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
          <>
            <PageTabNavigation links={links} tab={tab} setTab={setTab} />
            {tab === 1 ? (
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
            ) : tab === 2 ? (
              <div className="grid grid-cols-2 gap-4">
                <ul>
                  {presentStudents?.map((student) => (
                    <li
                      key={`participation-${student.id}`}
                      className="flex items-center"
                    >
                      <p className="col-span-2 w-full text-xl xs:col-span-4">
                        {student.first_name} {student.last_name} {student.id}
                      </p>

                      <span>
                        {student.evaluations_for_day?.map(
                          (evaluation) =>
                            evaluation.evaluation_attribute.name ===
                              "Participation" && (
                              <div
                                key={evaluation.id}
                                className="col-span-2 rounded border bg-white p-2 text-center shadow xs:col-span-2"
                              >
                                <RangeAttributeForm
                                  student={student}
                                  evaluation={evaluation}
                                />
                              </div>
                            ),
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <ul>
                  {presentStudents?.map((student) => (
                    <li
                      key={`attitude-${student.id}`}
                      className="flex items-center"
                    >
                      <p className="col-span-2 w-full text-xl xs:col-span-4">
                        {student.first_name} {student.last_name} {student.id}
                      </p>

                      <span>
                        {student.evaluations_for_day?.map(
                          (evaluation) =>
                            evaluation.evaluation_attribute.name ===
                              "Attitude" && (
                              <div
                                key={evaluation.id}
                                className="col-span-2 rounded border bg-white p-2 text-center shadow xs:col-span-2"
                              >
                                <RangeAttributeForm
                                  student={student}
                                  evaluation={evaluation}
                                />
                              </div>
                            ),
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : tab === 3 ? (
              <div className="">
                <ul className="divide-y">
                  {presentStudents?.map((student) => (
                    <li
                      key={`participation-${student.id}`}
                      className="grid items-center gap-4 py-4 xs:grid-cols-4"
                    >
                      <p className="text-xl xs:col-span-1">
                        {student.first_name} {student.last_name} {student.id}
                      </p>

                      <span>
                        {student.evaluations_for_day?.map(
                          (evaluation) =>
                            evaluation.evaluation_attribute.name ===
                              "Teacher Comment" && (
                              <div
                                key={evaluation.id}
                                className="w-[70ch] xs:col-span-3 "
                              >
                                <TextAttributeForm evaluation={evaluation} />
                              </div>
                            ),
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : tab === 4 ? (
              <div className="grid grid-cols-2 gap-4">
                <ul>
                  {presentStudents?.map((student) => (
                    <li
                      key={`participation-${student.id}`}
                      className="flex items-center"
                    >
                      <p className="col-span-2 w-full text-xl xs:col-span-4">
                        {student.first_name} {student.last_name} {student.id}
                      </p>

                      <span>
                        {student.evaluations_for_day?.map(
                          (evaluation) =>
                            evaluation.evaluation_attribute.name ===
                              "Participation" && (
                              <div
                                key={evaluation.id}
                                className="col-span-2 rounded border bg-white p-2 text-center shadow xs:col-span-2"
                              >
                                <RangeAttributeForm
                                  student={student}
                                  evaluation={evaluation}
                                />
                              </div>
                            ),
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : tab === 5 ? (
              <div className="grid grid-cols-2 gap-4">
                <ul>
                  {presentStudents?.map((student) => (
                    <li
                      key={`attitude-${student.id}`}
                      className="flex items-center"
                    >
                      <p className="col-span-2 w-full text-xl xs:col-span-4">
                        {student.first_name} {student.last_name} {student.id}
                      </p>

                      <span>
                        {student.evaluations_for_day?.map(
                          (evaluation) =>
                            evaluation.evaluation_attribute.name ===
                              "Attitude" && (
                              <div
                                key={evaluation.id}
                                className="col-span-2 rounded border bg-white p-2 text-center shadow xs:col-span-2"
                              >
                                <RangeAttributeForm
                                  student={student}
                                  evaluation={evaluation}
                                />
                              </div>
                            ),
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : tab === 6 ? (
              <>
                <ul className="grid gap-4 border bg-gray-300 shadow xs:bg-gray-100 xs:p-4">
                  {presentStudents?.map((student) => (
                    <li
                      key={student.id}
                      className="gap-4 bg-white p-2 items-center xs:grid xs:grid-cols-6 xs:border-2 xs:p-4"
                    >
                      <p className="xs:col-span-1">
                        {student.first_name} {student.last_name} {student.id}
                      </p>
                      {!student.evaluations_for_day ? (
                        <p className="xs:col-span-1">
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
                                className="rounded border bg-white p-2 text-center shadow xs:col-span-1"
                              >
                                <RangeAttributeForm
                                  student={student}
                                  evaluation={evaluation}
                                />
                              </div>
                            ) : (
                              <div
                                key={evaluation.id}
                                className="grid w-full items-center rounded border p-2 shadow xs:col-span-3"
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
              </>
            ) : (
              <ul className="grid ">
                {presentStudents?.map((student) => (
                  <li
                    key={`participation-${student.id}`}
                    className="grid items-center xs:grid-cols-3"
                  >
                    <p className="w-full text-xl xs:col-span-1">
                      {student.first_name} {student.last_name} {student.id}
                    </p>

                    <span>
                      {student.evaluations_for_day?.map(
                        (evaluation) =>
                          evaluation.evaluation_attribute.name ===
                            "Participation" && (
                            <div
                              key={evaluation.id}
                              className="rounded border bg-white p-2 text-center shadow xs:col-span-1"
                            >
                              <RangeAttributeForm
                                student={student}
                                evaluation={evaluation}
                              />
                            </div>
                          ),
                      )}
                    </span>
                    <span>
                      {student.evaluations_for_day?.map(
                        (evaluation) =>
                          evaluation.evaluation_attribute.name ===
                            "Attitude" && (
                            <div
                              key={evaluation.id}
                              className="rounded border bg-white p-2 text-center shadow xs:col-span-1"
                            >
                              <RangeAttributeForm
                                student={student}
                                evaluation={evaluation}
                              />
                            </div>
                          ),
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
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
              defaultValue={0}
              onChange={(e) =>
                handleSelectSubject({ subjectId: Number(e.target.value) })
              }
            >
              <option value={0}>Please choose a subject</option>
              {subjects.map((subject) => (
                <option className="p-2" key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-1/2 rounded bg-blue-600 px-2 py-1 text-white disabled:bg-gray-600"
            disabled={!selectedSubjectId}
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
