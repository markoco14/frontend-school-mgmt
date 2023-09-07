import AuthContext from "@/src/AuthContext";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { useContext, useEffect, useRef, useState } from "react";
import { evaluationAttributeAdapter } from "../../adapters/evaluationAdapter";
import toast from "react-hot-toast";
import Image from "next/image";
import EvaluationAttribute2 from "./EvaluationAttribute2";
import VerticalPhotoBar from "./VerticalPhotoBar";
import PhotoBar from "./PhotoBar";
import EvaluationAttribute from "./EvaluationAttribute";
import SetStudentButtons from "./SetStudentButtons";

const EvaluationSection2 = ({
  students,
  selectedStudent,
  setSelectedStudent,
}: {
  students: any;
  selectedStudent: any;
  setSelectedStudent: Function;
}) => {
  const { selectedSchool } = useContext(AuthContext);
  const scale = [1, 2, 3, 4, 5];
  const [evaluationAttributes, setEvaluationAttributes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<any>();
  const [currentAttribute, setCurrentAttribute] = useState<any>();

  const studentRefs: any = useRef([]);

  useEffect(() => {
    const selectedIndex = students.findIndex(
      (s: Student) => s.id === selectedStudent?.id,
    );
    if (selectedIndex >= 0 && studentRefs.current[selectedIndex]) {
      studentRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedStudent, students]);

  useEffect(() => {
    async function getEvaluationAttributes() {
      try {
        await evaluationAttributeAdapter
          .list({ school_id: selectedSchool?.id })
          .then((res) => {
            // console.log('evaluation attributes', res);
            console.log("first attribute", res[0]);
            setLoading(false);
            setEvaluationAttributes(res);
            setCurrentAttribute(res[0]);
          });
      } catch (error: any) {
        toast.error(error.details);
        setLoading(false);
      }
    }

    getEvaluationAttributes();
  }, [selectedSchool]);

  return (
    <>
      <article className="grid gap-4 sm:pr-4">
        {/* attribute selector */}
        <div>
          {/* 
            TODO: this needs to come from unique attributes array
            grab the name of each attribute and stuff them in uniques array.
            or... just make directly from the attributes and check by name. 
          */}
          <nav className="flex gap-4">
            {evaluationAttributes?.map((attribute: any) => (
              <button
                key={`attribute-${attribute.id}`}
                onClick={() => {
                  setCurrentAttribute(attribute);
                  attribute.data_type_id === 8
                    ? setSelectedStudent(students[0])
                    : setSelectedStudent();
                }}
              >
                {attribute.name}
              </button>
            ))}
          </nav>
        </div>
        {currentAttribute?.data_type_id === 9 ? (
          <div className="grid sm:grid-cols-2">
            {/* <PhotoBar
              students={students}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            /> */}
            <ul className="divide-y">
              {students?.map((student: Student, index: number) => (
                <li
                  key={`student-${student.id}`}
                  className="grid grid-cols-2 w-full gap-4 rounded p-2 hover:bg-blue-200"
                  ref={(el) => (studentRefs.current[index] = el)}
                > 
                <div className="flex gap-4 items-center">
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
                  <div className="text-lg">
                    {student?.first_name}
                  </div>
                </div>
                  <EvaluationAttribute2 attribute={currentAttribute} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <article className="grid grid-cols-8 gap-4 sm:pr-4">
            <div className="relative col-span-8 sm:col-span-1">
              <VerticalPhotoBar
                students={students}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
              />
              <PhotoBar
                students={students}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
              />
            </div>
            <div className="col-span-8 flex flex-col gap-4 sm:col-span-7">
              <div className="text-xl">
                {selectedStudent?.first_name} {selectedStudent?.last_name}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
                <EvaluationAttribute attribute={currentAttribute} />
              </div>
              <div className="flex gap-2">
                <SetStudentButtons
                  students={students}
                  selectedStudent={selectedStudent}
                  setSelectedStudent={setSelectedStudent}
                />
              </div>
            </div>
          </article>
        )}

        {/* <div className="relative col-span-8 sm:col-span-1">
          <VerticalPhotoBar
            students={students}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
          <PhotoBar
            students={students}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        </div>
        <div className="col-span-8 flex flex-col gap-4 sm:col-span-7">
          <div className="text-xl">
            {selectedStudent?.first_name} {selectedStudent?.last_name}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
            {evaluationAttributes?.map((attribute: any, index: number) => (
              <div
                key={`attribute-${attribute.id}`}
                className={`${
                  attribute.data_type_id === 8
                    ? "col-span-2 sm:col-span-3"
                    : "col-span-2 sm:col-span-1"
                } grid gap-2`}
              >
                <EvaluationAttribute attribute={attribute} />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <SetStudentButtons
              students={students}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </div>
        </div> */}
      </article>
    </>
  );
};

export default EvaluationSection2