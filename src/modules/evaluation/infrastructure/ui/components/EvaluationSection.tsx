import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { evaluationAttributeAdapter } from "../../adapters/evaluationAttributeAdapter";
import EvaluationAttribute from "./EvaluationAttribute";
import PhotoBar from "./PhotoBar";
import SetStudentButtons from "./SetStudentButtons";
import VerticalPhotoBar from "./VerticalPhotoBar";

const EvaluationSection = ({
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

  useEffect(() => {
    async function getData() {
      try {
        await evaluationAttributeAdapter
          .list({ school_id: selectedSchool?.id })
          .then((res) => {
            setLoading(false);
            setEvaluationAttributes(res);
          });
      } catch (error: any) {
        toast.error(error.details);
        setLoading(false);
      }
    }
    getData();
  }, [selectedSchool]);

  return (
    <>
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
        </div>
      </article>
    </>
  );
};

export default EvaluationSection;
