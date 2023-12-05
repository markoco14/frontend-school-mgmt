import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { addListItem } from "@/src/utils/addListItem";
import { useState } from "react";
import toast from "react-hot-toast";

type NewQuestionFormProps = {
  questionList: TestQuestion[];
  setQuestionList: Function;
};

const NewQuestionForm = ({questionList, setQuestionList}: NewQuestionFormProps) => {
    const [newQuestion, setNewQuestion] = useState<string>("");

    
  return (
    <div className="flex flex-col gap-2">
      <label>hello new question</label>
      <input
        type="text"
        className="border p-2"
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      <button
        onClick={() => {
          if (!newQuestion) {
            toast("You need to type the question before saving.");
          }
          // TODO: replace with call to API
          // return new DB ojbect
          const newQuestionMapper = {
            id: 8,
            question: newQuestion,
            mistakes: [],
            answers: [],
          };
          // handleUpdate(newQuestionMapper)
          // add to list
          const updatedQuestionList = addListItem(
            questionList,
            newQuestionMapper,
          );
          setQuestionList(updatedQuestionList);
        }}
        className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
      >
        OK
      </button>
    </div>
  );
}

export default NewQuestionForm;