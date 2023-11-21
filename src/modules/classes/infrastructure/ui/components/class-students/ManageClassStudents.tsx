import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import { ClassStudent } from "@/src/modules/classes/entities/ClassStudent";
import Modal from "@/src/modules/core/components/Modal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { classStudentAdapter } from "@/src/modules/classes/adapters/classStudentAdapter";
import AddClassStudent from "./AddClassStudent";
import ClassStudentList from "./ClassStudentList";

export default function ManageClassStudents({
  selectedClass,
}: {
  selectedClass: ClassEntity;
}) {
  const router = useRouter();
  const [classStudentList, setClassStudentList] = useState<ClassStudent[]>([]);
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleClose() {
    setIsAddingStudent(false);
  }

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
      <Modal
        show={isAddingStudent}
        close={handleClose}
        title={`Add Student to ${selectedClass.name}`}
      >
        <AddClassStudent
          selectedClass={selectedClass}
          classStudentList={classStudentList}
          setClassStudentList={setClassStudentList}
        />
      </Modal>
      {!loading ? (
        <ClassStudentList classStudentList={classStudentList} />
      ) : (
        <StudentListSkeletonProps studentQuantity={10} />
      )}
    </div>
  );
}
