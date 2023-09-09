import { Student } from "@/src/modules/students/domain/entities/Student";
import Image from "next/image";
import { useEffect, useRef } from "react";

const VerticalPhotoBar = ({
  students,
  selectedStudent,
  setSelectedStudent,
}: {
  students: any[];
  selectedStudent: Student;
  setSelectedStudent: Function;
}) => {
  const studentRefs: any = useRef([]);

  useEffect(() => {
    const selectedIndex = students.findIndex(
      (s) => s.id === selectedStudent?.id,
    );
    if (selectedIndex >= 0 && studentRefs.current[selectedIndex]) {
      studentRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedStudent, students]);

  return (
    <ul className="no-scrollbar sticky top-0 z-10 hidden max-h-[70vh] grid-cols-6 gap-1 overflow-y-scroll border-r bg-white px-4 sm:grid sm:grid-cols-1 sm:flex-col sm:gap-8">
      {students?.map((student, index) => (
        <li key={index} ref={(el) => (studentRefs.current[index] = el)}>
          <div className={`relative aspect-square`}>
            <Image
              src={student.photo_url}
              alt="An image of a student"
              fill={true}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw"
              style={{ objectFit: "cover" }}
              className={`${
                selectedStudent?.id === student.id
                  ? "border-4 border-green-500"
                  : "opacity-50 grayscale"
              } rounded-full duration-200 ease-in-out`}
              onClick={() => {
                setSelectedStudent(student);
              }}
            />
          </div>
        </li>
      ))}
      <div
        className={`relative grid aspect-square place-items-center rounded-full bg-blue-100`}
      >
        <i className="fa-solid fa-plus text-blue-900"></i>
      </div>
    </ul>
  );
};

export default VerticalPhotoBar;