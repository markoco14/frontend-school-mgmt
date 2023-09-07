import EvaluationRangeAttribute2 from "./EvaluationRangeAttribute2";
import EvaluationTextAttribute2 from "./EvaluationTextAttribute2";

const EvaluationAttribute2 = ({ attribute }: { attribute: any }) => {
  console.log("in evaluation attribute 2", attribute);
  return (
    <div>
      {attribute?.data_type_id === 9 && (
        <EvaluationRangeAttribute2 attribute={attribute} />
      )}
      {attribute?.data_type_id === 8 && (
        <EvaluationTextAttribute2 attribute={attribute} />
      )}
    </div>
  );
};

export default EvaluationAttribute2
