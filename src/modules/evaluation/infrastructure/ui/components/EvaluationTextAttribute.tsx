import TextareaAutosize from "react-textarea-autosize";

const EvaluationTextAttribute = ({ attribute }: { attribute: any }) => {
  return (
    <div className="grid gap-2">
      <label>{attribute.name}</label>
      <TextareaAutosize
        minRows={2}
        className="w-full rounded border p-2 shadow"
      />
    </div>
  );
};

export default EvaluationTextAttribute;
