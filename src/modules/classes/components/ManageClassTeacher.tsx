import { useUserContext } from "@/src/contexts/UserContext";
import { classAdapter } from "@/src/modules/classes/adapters/classAdapter";
import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import { userAdapter } from "@/src/modules/user-mgmt/adapters/userAdapter";
import { Teacher } from "@/src/modules/user-mgmt/entities/Teacher";
import { useEffect, useState } from "react";

export default function ManageClassTeacher({
  selectedClass,
  setSelectedClass,
}: {
  selectedClass: ClassEntity;
  setSelectedClass: Function;
}) {
  const { selectedSchool } = useUserContext();
  const [teachers, setTeachers] = useState<Teacher[]>();
  const [isAddTeacher, setIsAddTeacher] = useState<boolean>(false);

  async function handleAddTeacher({
    class_id,
    teacher_id,
  }: {
    class_id: number;
    teacher_id: number;
  }) {
    await classAdapter
      .addClassTeacher({ class_id: class_id, teacher_id: teacher_id })
      .then((res) => {
        setSelectedClass(res);
      });
  }

  async function handleRemoveTeacher({ class_id }: { class_id: number }) {
    await classAdapter
      .deleteClassTeacher({ class_id: class_id })
      .then((res) => {
        setSelectedClass(res);
      });
  }

  useEffect(() => {
    async function getTeachers() {
      await userAdapter
        .listSchoolTeachers({ schoolId: selectedSchool?.id })
        .then((res) => setTeachers(res));
    }

    getTeachers();
  }, [selectedSchool]);

  return (
    <article className="rounded border-2 p-4">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="text-xl">Teacher Details</h3>
      </div>
      <section>
        <div className="flex items-baseline justify-between">
          <p>
            Primary Teacher:{" "}
            {selectedClass.teacher
              ? selectedClass.teacher
              : "No teacher assigned"}
          </p>
          <button
            className="rounded p-2 text-red-500 underline underline-offset-2 hover:bg-red-100 hover:text-red-900"
            onClick={() => handleRemoveTeacher({ class_id: selectedClass.id })}
          >
            Remove
          </button>
        </div>
        <button
          className="text-blue-700 underline underline-offset-2 duration-200 ease-in-out hover:-translate-y-1 hover:text-blue-900 hover:underline-offset-4"
          onClick={() => setIsAddTeacher(!isAddTeacher)}
        >
          {isAddTeacher ? "Hide Teachers" : "Assign Teacher"}
        </button>
        {isAddTeacher && (
          <>
            <p className="text-xl">Available Teachers</p>
            <ul className=" mb-4 rounded bg-white p-2 shadow-inner">
              {teachers?.map((teacher, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {teacher.first_name} {teacher.last_name}
                  </span>
                  <button
                    disabled={selectedClass.teacher ? true : false}
                    className="rounded p-2 text-blue-500 hover:bg-blue-100 hover:text-blue-900 disabled:cursor-not-allowed"
                    onClick={() => {
                      handleAddTeacher({
                        class_id: selectedClass.id,
                        teacher_id: teacher.id,
                      });
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </article>
  );
}
