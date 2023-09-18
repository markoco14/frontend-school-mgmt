import EvaluationListSkeletonProps from "@/src/components/ui/skeleton/EvaluationListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { StudentEvaluation } from "@/src/modules/evaluation/domain/entities/StudentEvaluation";
import { studentEvaluationAdapter } from "@/src/modules/evaluation/infrastructure/adapters/studentEvaluationAdapter";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { StudentEvaluationFilters } from "@/src/modules/students/domain/entities/StudentEvaluationFilters";
import { studentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAdapter";
import { Dictionary } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [isDeleteEvaluation, setIsDeleteEvaluation] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  // const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getEvaluations() {
      const preparedDate = date?.toISOString().split("T")[0];
      setLoading(true);
      try {

        await studentAdapter
          .listPresentStudentsWithEvaluations({
            date: preparedDate,
            classId: Number(selectedClass?.id),
            present: true,
            signal: signal,
          })
          .then((res) => {
            // const groupedData = groupBy(
            //   res,
            //   (evaluation) => evaluation.student?.last_name,
            // );
            setStudentsWithEvaluations(res);
            setLoading(false);
          });
      } catch (error) {
        console.error(error)
      }
    }

    getEvaluations();

    return () => {
      controller.abort();
    }
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

  function handleClose() {
    setIsDeleteEvaluation(false);
    setSelectedStudent(undefined);
  }

  async function handleDeleteEvaluations({
    student_id,
  }: {
    student_id: number;
  }) {
    await studentEvaluationAdapter
      .batchDelete({
        student_id: student_id,
        date: date.toISOString().split("T")[0], // gets "2023-09-07 YYYY-mm-dd format"
      })
      .then((res) => {
        const updatedEvaluations = studentsWithEvaluations?.map(
          (student: Student) => {
            // Find the attendance object that matches the ID of the newAttendance
            if (student.id === student_id) {
              // Replace it with newAttendance
              student.evaluations_for_day = null;
            }
            // Leave all other objects unchanged
            return student;
          },
        );
        setStudentsWithEvaluations(updatedEvaluations);
        toast.success("deleted");
      });
  }
  return (
    <>
      {loading ? (
        <Skeleton>
          <EvaluationListSkeletonProps />
        </Skeleton>
      ) : (
        <ul className="grid gap-4">
          {!studentsWithEvaluations?.length ? (
            <p className="grid gap-4 rounded-lg bg-white p-4 shadow">
              Evaluations not created
            </p>
          ) : (
            studentsWithEvaluations?.map((student) => (
              <li
                key={student.id}
                className="grid gap-4 rounded-lg bg-white p-4 shadow"
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
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
                  <button
                    onClick={() => {
                      setIsDeleteEvaluation(true);
                      setSelectedStudent(student);
                    }}
                  >
                    delete
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {!student.evaluations_for_day ? (
                    <p>No student evaluations today.</p>
                  ) : (
                    student.evaluations_for_day.map((evaluation) => (
                      <p
                        key={evaluation.id}
                        className={`${
                          evaluation.evaluation_attribute_id === 3
                            ? "col-span-2"
                            : "col-span-1"
                        } rounded border p-2`}
                      >
                        {evaluation.evaluation_attribute?.name !== "Comment" &&
                          `${evaluation.evaluation_attribute?.name}:`}{" "}
                        {evaluation.evaluation_value ? (evaluation.evaluation_value) : "Comment not written yet."}
                      </p>
                    ))
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
      <Modal
        show={isDeleteEvaluation}
        close={handleClose}
        title={`Delete student's evaluations`}
      >
        <p>
          Are you sure you want to delete this {selectedStudent?.first_name}
          &apos;s records?
        </p>
        <button
          onClick={() => {
            selectedStudent &&
              handleDeleteEvaluations({
                student_id: selectedStudent.id,
              });
            setSelectedStudent(undefined);
          }}
        >
          Yes
        </button>
      </Modal>
    </>
  );
};

export default ReportingEvaluationSection;
