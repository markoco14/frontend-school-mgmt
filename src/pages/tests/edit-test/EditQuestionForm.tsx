import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { Dispatch, SetStateAction } from "react";
import AnswerList from "./AnswerList";

type EditQuestionFormProps = {
  currentQuestion: TestQuestion;
  setIsNewAnswer: Dispatch<SetStateAction<boolean>>;
};

const EditQuestionForm = ({
  currentQuestion,
  setIsNewAnswer,
}: EditQuestionFormProps) => {
  return (
    <div>
      <div className="mb-8 flex">
        <button
          onClick={() => setIsNewAnswer(true)}
          className="rounded border-2 p-2 shadow hover:bg-gray-100 active:bg-gray-200 active:shadow-md"
        >
          New Answer
        </button>
      </div>

      <AnswerList answers={currentQuestion.answers} />
    </div>
  );
};

export default EditQuestionForm;
