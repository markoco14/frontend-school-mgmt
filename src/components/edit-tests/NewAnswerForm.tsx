import { Answer } from "@/src/modules/tests/entities/Answer";
import { useState } from "react";
import toast from "react-hot-toast";

type NewAnswerFormProps = {
  answerList: Answer[] | undefined;
  updateAnswerList: Function;
};

const NewAnswerForm = ({answerList, updateAnswerList}: NewAnswerFormProps) => {
	const [newAnswer, setNewAnswer] = useState<string>('')
	answerList;
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-600">Type your answer below.</label>
      <input
        type="text"
        className="border p-2"
        onChange={(e) => setNewAnswer(e.target.value)}
      />
      <button
        onClick={() => {
          if (!newAnswer) {
            toast("You need to type the question before saving.");
            return
          }
          updateAnswerList({answer: newAnswer, answerList: answerList});
        }}
        className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
      >
        OK
      </button>
    </div>
  );
};

export default NewAnswerForm;
