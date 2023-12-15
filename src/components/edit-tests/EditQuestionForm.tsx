import { Answer } from "@/src/modules/tests/entities/Answer";
import { TestQuestion } from "@/src/modules/tests/entities/TestQuestion";
import { useEffect, useRef, useState } from "react";
import AnswerList from "./AnswerList";

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
}: EditQuestionFormProps) => {
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>();
  const inputRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    const answersToQuestion = answers.filter((answer) => {
      return answer.questionId === currentQuestion.id;
    });
    answersToQuestion && setCurrentAnswers(answersToQuestion);
  }, [currentQuestion]);

  function handleAddAnswer() {
    if (!inputRef.current) {
      return
    }
    if (inputRef.current.value === '') {
      alert('choose a value for answer')
      return
    }
    const newAnswer: Answer = {
      id: Math.floor(Math.random() * 100) + 15,
      answer: inputRef.current?.value,
      questionId: currentQuestion.id
    }
    setCurrentAnswers(prev => [...prev, newAnswer])
    // but we really want to add to the total answer list
    // and derive the current answers from that list
    // later, when we use a db call, we won't need that
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddAnswer();
        }}
      >
        <label>New Answer</label>

        <input ref={inputRef} type="text" className="border p-2" />
        <button>OK</button>
      </form>
      {currentAnswers && <AnswerList answers={currentAnswers} />}
    </div>
  );
};

export default EditQuestionForm;
