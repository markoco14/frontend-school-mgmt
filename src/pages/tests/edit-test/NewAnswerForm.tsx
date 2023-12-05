import { Answer } from "@/src/modules/tests/entities/Answer";
import { useState } from "react";
import toast from "react-hot-toast";

type NewAnswerFormProps = {
  answerList: Answer[] | undefined;
};

const NewAnswerForm = ({answerList}: NewAnswerFormProps) => {
	const [newAnswer, setNewAnswer] = useState<string>('')
	answerList;
  return (
    <div className="flex flex-col gap-2">
      <label>hello new question</label>
      <input
        type="text"
        className="border p-2"
        onChange={(e) => setNewAnswer(e.target.value)}
      />
      <button
        onClick={() => {
          if (!newAnswer) {
            toast("You need to type the question before saving.");
          }
          // TODO: replace with call to API
          // return new DB ojbect
          // const newAnswerMapper = {
          //   id: 100,
          //   answers: newAnswer,
          // };
          // handleUpdate(newQuestionMapper)
          // add to list
          // const updatedQuestionList = addListItem(
          //   questionList,
          //   newQuestionMapper,
          // );
          // setQuestionList(updatedQuestionList);
        }}
        className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
      >
        OK
      </button>
    </div>
  );
};

export default NewAnswerForm;
