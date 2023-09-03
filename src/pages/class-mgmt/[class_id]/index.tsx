import AuthContext from "@/src/AuthContext";
import { Class } from "@/src/modules/class-mgmt/domain/entities/Class";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import ManageClassTeacher from "@/src/modules/class-mgmt/infrastructure/ui/components/ManageClassTeacher";
import ManageClassStudents from "@/src/modules/class-mgmt/infrastructure/ui/components/class-students/ManageClassStudents";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function ManageClassDetails() {
  const [selectedClass, setSelectedClass] = useState<Class>();
  const { user } = useContext(AuthContext);
  
  const router = useRouter();

  useEffect(() => {
    async function getClassData() {
      await classAdapter.getClassById({class_id: Number(router.query.class_id)})
      .then((res) => {
        setSelectedClass(res)
      })
    }

    if (router.query.class_id) {
      getClassData();
    }
  }, [router])

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
              <div className="flex justify-between items-baseline mb-2">
                <h2 className="text-3xl">{selectedClass?.name}</h2>
                <Link href="/class-mgmt">Back</Link>
              </div>
              {selectedClass.day && (
                <p className="text-xl">{selectedClass.day[0] === 1 ? "Monday" : "Wednesday"} & {selectedClass.day[1] === 4 ? "Thursday" : "Friday"}</p>
              )}
            </section>
            <ManageClassStudents selectedClass={selectedClass}/>
            <ManageClassTeacher selectedClass={selectedClass} setSelectedClass={setSelectedClass}/>
            {/* <DeleteClass
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            /> */}
          </>
        )}
        {/* {!selectedClass && (
          <div className="flex flex-col xs:flex-row xs:justify-between xs:gap-2 items-baseline mb-4 bg-gray-100 shadow-inner p-2 rounded">
            <h2 className="text-3xl">This class was deleted.</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
        )} */}
      </>
    </Layout>
  );
}
