import TextareaAutosize from "react-textarea-autosize";

const EvaluationTextAttribute2 = ({ attribute }: { attribute: any }) => {
  return (
    <TextareaAutosize
      minRows={2}
      className="w-full rounded border p-2 shadow"
    />
  );
};

export default EvaluationTextAttribute2;
