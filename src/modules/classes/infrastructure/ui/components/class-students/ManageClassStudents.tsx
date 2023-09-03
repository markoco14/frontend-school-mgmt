import { Class } from "@/src/modules/classes/domain/entities/Class";
import { ClassStudent } from "@/src/modules/classes/domain/entities/ClassStudent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { classStudentAdapter } from "../../../adapters/classStudentAdapter";
import AddClassStudent from "./AddClassStudent";
import ClassStudentList from "./ClassStudentList";

export default function ManageClassStudents({selectedClass}: {selectedClass: Class;}) {
	const router = useRouter();
  const [classStudentList, setClassStudentList] = useState<ClassStudent[]>([]);
	const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  useEffect(() => {
    async function getClassList() {
      await classStudentAdapter.list({
        class_id: Number(router?.query.class_id),
        details: true,
        order: 'last_name'
      })
      .then((res) => {
        setClassStudentList(res);
      })
    }
    if (router) {
      getClassList();
    }
  }, [router])
	
	return (
		<div className="border-2 p-4 rounded">
      <div className="flex justify-between items-baseline gap-4 mb-4">
        <h3 className="text-xl">Student List</h3>
        <button
          onClick={() => {
            setIsAddingStudent(!isAddingStudent);
          }}
        >
          {isAddingStudent ? <span><i className="fa-solid fa-check"></i></span> : <span><i className="fa-solid fa-plus"></i> <i className="fa-solid fa-user"></i></span>}
        </button>
      </div>
      {isAddingStudent ? (
        <AddClassStudent
          selectedClass={selectedClass} 
          classStudentList={classStudentList}
          setClassStudentList={setClassStudentList}
        />
      ) : (
        <ClassStudentList classStudentList={classStudentList}/>
      )}
    </div>
	);
}