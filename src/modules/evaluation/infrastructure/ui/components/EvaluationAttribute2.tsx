import EvaluationRangeAttribute2 from "./EvaluationRangeAttribute2";
import EvaluationTextAttribute from "./EvaluationTextAttribute";

const EvaluationAttribute2 = ({ attribute }: { attribute: any }) => {
  console.log("in evaluation attribute 2", attribute);
  return (
    <div key={`attribute-${attribute?.id}`}>
      {attribute?.data_type_id === 9 && (
        <EvaluationRangeAttribute2 attribute={attribute} />
      )}
      {attribute?.data_type_id === 8 && (
        <EvaluationTextAttribute attribute={attribute} />
      )}
    </div>
  );
};

export default EvaluationAttribute2
