import Modal from "@/src/modules/core/components/Modal";
import { Answer } from "@/src/modules/tests/entities/Answer";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { useEffect, useState } from "react";
import AnswerList from "./AnswerList";
import NewAnswerForm from "./NewAnswerForm";

const answers: Answer[] = [
  { id: 1, answer: "Does she give it to him?", questionId: 1 },
  { id: 2, answer: "Does she give the ball to him?", questionId: 1 },
  { id: 3, answer: "Does she give him it?", questionId: 1 },
  { id: 4, answer: "Does she give him the ball?", questionId: 1 },
  { id: 5, answer: "Do I look like him?", questionId: 2 },
  { id: 6, answer: "Do I look like her?", questionId: 2 },
  { id: 7, answer: "Do we want to take it from her?", questionId: 3 },
  { id: 8, answer: "Do they want to take it from her?", questionId: 3 },
  { id: 9, answer: "Do you want to take it from her?", questionId: 3 },
  { id: 10, answer: "Do I want to talk to them?", questionId: 4 },
];

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
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>();
  
  useEffect(() => {
    const answersToQuestion = answers.filter((answer) => {
      return answer.questionId === currentQuestion.id;
    });
    answersToQuestion && setCurrentAnswers(answersToQuestion);
  }, [currentQuestion]);

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

      {currentAnswers && <AnswerList answers={currentAnswers} />}
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
