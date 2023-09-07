import EvaluationRangeAttribute from "./EvaluationRangeAttribute";
import EvaluationTextAttribute from "./EvaluationTextAttribute";

const EvaluationAttribute = ({ attribute }: { attribute: any }) => {
  return (
    <div
      key={`attribute-${attribute?.id}`}
      className="rounded border p-2 shadow-inner"
    >
      {attribute?.data_type_id === 9 && (
        <EvaluationRangeAttribute attribute={attribute} />
      )}
      {attribute?.data_type_id === 8 && (
        <EvaluationTextAttribute attribute={attribute} />
      )}
    </div>
  );
};

export default EvaluationAttribute