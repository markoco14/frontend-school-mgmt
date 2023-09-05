import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { Class } from "@/src/modules/classes/domain/entities/Class";
import { ClassStudent } from "@/src/modules/classes/domain/entities/ClassStudent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { classStudentAdapter } from "../../../adapters/classStudentAdapter";
import AddClassStudent from "./AddClassStudent";
import ClassStudentList from "./ClassStudentList";

export default function ManageClassStudents({
  selectedClass,
}: {
  selectedClass: Class;
}) {
  const router = useRouter();
  const [classStudentList, setClassStudentList] = useState<ClassStudent[]>([]);
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getClassList() {
      setLoading(true);
      await classStudentAdapter
        .list({
          class_id: Number(router?.query.class_id),
          details: true,
          order: "last_name",
        })
        .then((res) => {
          setLoading(false);
          setClassStudentList(res);
        });
    }
    if (router) {
      getClassList();
    }
  }, [router]);

  return (
    <div className="rounded border-2 p-4">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="text-xl">Student List</h3>
        <button
          onClick={() => {
            setIsAddingStudent(!isAddingStudent);
          }}
        >
          {isAddingStudent ? (
            <span>
              <i className="fa-solid fa-check"></i>
            </span>
          ) : (
            <span>
              <i className="fa-solid fa-plus"></i>{" "}
              <i className="fa-solid fa-user"></i>
            </span>
          )}
        </button>
      </div>
      {isAddingStudent ? (
        <AddClassStudent
          selectedClass={selectedClass}
          classStudentList={classStudentList}
          setClassStudentList={setClassStudentList}
        />
      ) : !loading ? (
        <ClassStudentList classStudentList={classStudentList} />
      ) : (
        <StudentListSkeletonProps />
      )}
    </div>
  );
}
