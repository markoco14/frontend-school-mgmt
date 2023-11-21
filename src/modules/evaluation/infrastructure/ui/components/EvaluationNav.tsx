import { Student } from "@/src/modules/students/entities/Student";

const EvaluationNav = ({
  evaluationAttributes,
	currentAttribute,
  setCurrentAttribute,
  setSelectedStudent,
  students,
}: {
  evaluationAttributes: any[];
	currentAttribute: any;
  setCurrentAttribute: Function;
  setSelectedStudent: Function;
  students: Student[];
}) => {
  return (
    <nav className="flex gap-4 p-4">
      {evaluationAttributes?.map((attribute: any) => (
        <button
          key={`attribute-${attribute.id}`}
          onClick={() => {
            setCurrentAttribute(attribute);
            attribute.data_type_id === 8
              ? setSelectedStudent(students[0])
              : setSelectedStudent();
          }}
          className={`${
            attribute.id === currentAttribute.id &&
            "underline decoration-blue-500 decoration-2 underline-offset-2"
          }`}
        >
          {attribute.name}
        </button>
      ))}
    </nav>
  );
};

export default EvaluationNav
