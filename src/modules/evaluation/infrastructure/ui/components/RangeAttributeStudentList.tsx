import { Student } from "@/src/modules/students/domain/entities/Student";
import Image from "next/image";
import EvaluationRangeAttribute2 from "./EvaluationRangeAttribute2";

const RangeAttributeStudentList = ({
  students,
  studentRefs,
  currentAttribute,
}: {
  students: Student[];
  studentRefs: any;
  currentAttribute: any;
}) => {
  return (
    <ul className="divide-y">
      {students?.map((student: Student, index: number) => (
        <li
          key={`student-${student.id}`}
          className="grid w-full grid-cols-2 gap-4 rounded p-2 hover:bg-blue-200"
          ref={(el) => (studentRefs.current[index] = el)}
        >
          <div className="flex items-center gap-4">
            <div className="relative col-span-1 flex justify-center">
              <Image
                src={student ? student?.photo_url : ""}
                alt={`An image of ${student?.first_name}`}
                width={50}
                height={50}
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>
            <div className="text-lg">{student?.first_name}</div>
          </div>
          <EvaluationRangeAttribute2 attribute={currentAttribute} />
          {/* <EvaluationRangeDescription attribute={currentAttribute} selectedValue={selectedValue}/> */}
        </li>
      ))}
    </ul>
  );
};

export default RangeAttributeStudentList;
