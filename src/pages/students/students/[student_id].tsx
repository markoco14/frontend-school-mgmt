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

const StudentProfile = ({ student }: { student: Student }) => {
  return (
    <section className="flex gap-2 border p-2 shadow">
      <div className="relative col-span-1">
        <Image
          src={student ? student.photo_url : ""}
          alt={`An image of ${student.first_name}`}
          width={200}
          height={200}
          style={{ objectFit: "cover" }}
          className="grow-0"
        />
      </div>
      <article>
        <p>
          {student.first_name} {student.last_name}
        </p>
        <p>{student.age}</p>
        <p>{student.gender === 1 ? "Female" : "Male"}</p>
      </article>
    </section>
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
    <div>
      <button onClick={() => router.back()} className="border rounded p-2">Back</button>
    </div>
  );
};

export default function Home({
  student,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const [assessments, setAssessments] = useState<StudentAssessment[]>([]);
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
      <div className="grid gap-4">
        <BackButton />
        <StudentProfile student={student} />
        <nav className="rounded border p-2 shadow">
          <button onClick={() => setTab(1)}>Evaluations</button>
        </nav>
        <section className="rounded border p-2 shadow">
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
        </section>
      </div>
    </Layout>
  );
}
