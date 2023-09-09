import AuthContext from "@/src/AuthContext";
import { Student } from "@/src/modules/students/domain/entities/Student";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { evaluationAttributeAdapter } from "../../adapters/evaluationAttributeAdapter";
import EvaluationNav from "./EvaluationNav";
import EvaluationTextAttribute2 from "./EvaluationTextAttribute2";
import PhotoBar from "./PhotoBar";
import RangeAttributeStudentList from "./RangeAttributeStudentList";
import SetStudentButtons from "./SetStudentButtons";
import VerticalPhotoBar from "./VerticalPhotoBar";

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
  const [evaluationAttributes, setEvaluationAttributes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
    <article className="grid divide-y sm:pr-4">
      {/* attribute selector */}
      {/* 
            TODO: this needs to come from unique attributes array
            grab the name of each attribute and stuff them in uniques array.
            or... just make directly from the attributes and check by name. 
          */}
      <EvaluationNav
        evaluationAttributes={evaluationAttributes}
        currentAttribute={currentAttribute}
        setCurrentAttribute={setCurrentAttribute}
        setSelectedStudent={setSelectedStudent}
        students={students}
      />
      {currentAttribute?.data_type_id === 9 ? (
        <div className="grid sm:grid-cols-2">
          {/* <PhotoBar
              students={students}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            /> */}
          <RangeAttributeStudentList
            students={students}
            studentRefs={studentRefs}
            currentAttribute={currentAttribute}
          />
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-4">
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
              <EvaluationTextAttribute2 attribute={currentAttribute} />
            </div>
            <div className="flex gap-2">
              <SetStudentButtons
                students={students}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default EvaluationSection2;
