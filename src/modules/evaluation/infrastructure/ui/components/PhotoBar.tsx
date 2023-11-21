import { Student } from "@/src/modules/students/entities/Student";
import Image from "next/image";


const PhotoBar = ({
  students,
  selectedStudent,
  setSelectedStudent,
}: {
  students: any[];
  selectedStudent: Student;
  setSelectedStudent: Function;
}) => {
  return (
    <ul className="sticky top-0 z-10 mb-4 grid grid-cols-6 gap-2 rounded bg-white p-2 sm:hidden sm:gap-8">
      {students?.map((student, index) => (
        <li key={index}>
          <div className={`relative aspect-square`}>
            <Image
              src={student.photo_url}
              alt="An image of a student"
              fill={true}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw"
              style={{ objectFit: "cover" }}
              className={`${
                selectedStudent?.id === student.id
                  ? "border-2 border-green-300 shadow-xl shadow-green-100"
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

export default PhotoBar;