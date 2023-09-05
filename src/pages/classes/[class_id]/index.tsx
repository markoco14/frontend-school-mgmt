import AuthContext from "@/src/AuthContext";
import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import { ClassAssessment } from "@/src/modules/classes/domain/entities/ClassAssessment";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import { classAdapter } from "@/src/modules/classes/infrastructure/adapters/classAdapter";
import { classAssessmentAdapter } from "@/src/modules/classes/infrastructure/adapters/classAssessmentAdapter";
import ManageClassTeacher from "@/src/modules/classes/infrastructure/ui/components/ManageClassTeacher";
import ManageClassStudents from "@/src/modules/classes/infrastructure/ui/components/class-students/ManageClassStudents";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<{
  classEntity: ClassEntity;
}> = async (context) => {
  const id = Number(context.query.class_id);
  const classEntity = await classAdapter.getClassById({ class_id: id });

  return { props: { classEntity } };
};

export default function ManageClassDetails({
  classEntity,
}: {
  classEntity: ClassEntity;
}) {
  console.log(classEntity);
  const [selectedClass, setSelectedClass] = useState<ClassEntity>(classEntity);
  const [assessments, setAssessments] = useState<ClassAssessment[]>([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    async function getAssessments() {
      setLoading(true);
      await classAssessmentAdapter
        .list({ class_id: classEntity.id, details: true })
        .then((res) => {
          console.log(res);
          setAssessments(res);
          setLoading(false);
        });
    }

    getAssessments();
    // async function getClassData() {
    //   await classAdapter
    //     .getClassById({ class_id: Number(router.query.class_id) })
    //     .then((res) => {
    //       setSelectedClass(res);
    //     });
    // }

    // if (router.query.class_id) {
    //   getClassData();
    // }
  }, [classEntity]);

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        {selectedClass && (
          <>
            <section className="mb-4">
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="text-3xl">{selectedClass?.name}</h2>
                <Link href="/classes">Back</Link>
              </div>
              {selectedClass.day && (
                <p className="text-xl">
                  {selectedClass.day[0] === 1 ? "Monday" : "Wednesday"} &{" "}
                  {selectedClass.day[1] === 4 ? "Thursday" : "Friday"}
                </p>
              )}
            </section>
            <section className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
              <div className="col-span-1 md:row-span-2">
                <ManageClassStudents selectedClass={selectedClass} />
              </div>
              <article className="col-span-1 row-span-1 rounded border-2 p-4">
                <h2 className="text-xl">Class Assessments</h2>
                {loading ? (
                  <Skeleton>
                    <ClassListSkeletonProps />
                  </Skeleton>
                ) : (
                  <ul>
                    {assessments?.map((assessment, index) => (
                      <li key={`assessment-${assessment.id}`}>
                        {assessment.assessment.name}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
              <article className="col-span-1 row-span-1">
                <ManageClassTeacher
                  selectedClass={selectedClass}
                  setSelectedClass={setSelectedClass}
                />
              </article>
            </section>
            {/* <DeleteClass
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            /> */}
          </>
        )}
        {/* {!selectedClass && (
          <div className="flex flex-col xs:flex-row xs:justify-between xs:gap-2 items-baseline mb-4 bg-gray-100 shadow-inner p-2 rounded">
            <h2 className="text-3xl">This class was deleted.</h2>
            <Link href="/classes">Back</Link>
          </div>
        )} */}
      </>
    </Layout>
  );
}
