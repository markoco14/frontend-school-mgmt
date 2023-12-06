import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { useState } from "react";
import AnswerList from "./AnswerList";
import Modal from "@/src/modules/core/components/Modal";
import NewAnswerForm from "./NewAnswerForm";

type EditQuestionFormProps = {
  currentQuestion: TestQuestion;
  handleAddAnswerToQuestion: Function;
};

const EditQuestionForm = ({
  currentQuestion,
  handleAddAnswerToQuestion,
}: EditQuestionFormProps) => {
  const [isNewAnswer, setIsNewAnswer] = useState<boolean>(false);
  const answerList = currentQuestion?.answers;

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

      <AnswerList answers={answerList} />
      <Modal show={isNewAnswer} close={setIsNewAnswer} title="New Answer">
        <NewAnswerForm
          answerList={answerList}
          updateAnswerList={handleAddAnswerToQuestion}
        />
      </Modal>
    </div>
  );
};

export default EditQuestionForm;
