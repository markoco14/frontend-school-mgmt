import AuthContext from "@/src/AuthContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { StudentAssessment } from "@/src/modules/students/domain/entities/StudentAssessment";
import { studentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAdapter";
import { studentAssessmentAdapter } from "@/src/modules/students/infrastructure/adapters/studentAssessmentAdapter";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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

const StudentPhoto = ({ student }: { student: Student }) => {
  return (
    <section className="flex items-center gap-4 border shadow sm:grid">
      <div className="relative h-24 w-24 sm:aspect-square sm:h-full sm:w-full">
        <Image
          src={student ? student.photo_url : ""}
          alt={`An image of ${student.first_name}`}
          fill={true}
          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw"
          // width={200}
          // height={200}
          style={{ objectFit: "cover" }}
          // className="rounded-full"
        />
      </div>
      <article className="sm:mb-4">
        <p className="text-center text-2xl">
          {student.first_name} {student.last_name}
        </p>
      </article>
    </section>
  );
};

const Evaluations = ({ student }: { student: Student }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>([]);

  useEffect(() => {
    async function getEvaluations() {
      setLoading(true);
      // await studentAssessmentAdapter
      //   .list({ student_id: student.id, details: true })
      //   .then((res) => {
      //     setEvaluations(res);
      //     setLoading(false);
      //   });
    }

    getEvaluations();
  }, [student]);

  return (
    <>
      <h2>Evaluations</h2>
      {loading ? (
        <Skeleton>
          <ClassListSkeletonProps />
        </Skeleton>
      ) : (
        <ul>
          {evaluations?.map((assessment, index) => (
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

export const getServerSideProps: GetServerSideProps<{
  student: Student;
}> = async (context) => {
  const id = Number(context.query.student_id);
  const student = await studentAdapter.getStudent({ id: id });

  return { props: { student } };
};

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="rounded border p-2">
      Back
    </button>
  );
};

export default function Home({
  student,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const [tab, setTab] = useState<number>(1);

  async function handleDeleteStudent(id: number) {
    try {
      setLoading(true);
      const response = await studentAdapter.deleteStudentById({ id: id });
      toast.success("Student deleted.");
      setLoading(false);
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <SchoolHeader />
      <div className="grid gap-4 sm:grid-cols-8">
        <div className="sm:col-span-8">
          <BackButton />
        </div>
        <div className="sm:col-span-2">
          <StudentPhoto student={student} />
        </div>
        <div className="flex flex-col gap-4 sm:col-span-6">
          <nav className="flex gap-4 overflow-x-auto rounded border p-2 shadow">
            <button onClick={() => setTab(1)}>Profile</button>
            <button onClick={() => setTab(2)}>Evaluations</button>
            {/* <button onClick={() => setTab(3)}>Assessments</button> */}
          </nav>
          {tab === 1 && (
            <section className="rounded border p-2 shadow">
              <h2>Profile</h2>
            </section>
          )}
          {tab === 2 && (
            <section className="rounded border p-2 shadow">
              <Evaluations student={student} />
            </section>
          )}
          {tab === 3 && (
            <section className="rounded border p-2 shadow">
              <Assessments student={student} />
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
