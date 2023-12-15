import { useEffect, useRef, useState } from "react";
import { Answer } from "../entities/Answer";
import ReorderListContainer from "../../core/components/ReorderListContainer";
import { Reorder } from "framer-motion";

type EditAnswersProps = {
  questionId: number;
};

const requestAnswers: Answer[] = [
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

const EditAnswers = ({ questionId }: EditAnswersProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddAnswer() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.value === "") {
      alert("choose a value for answer");
      return;
    }
    const newAnswer: Answer = {
      id: Math.floor(Math.random() * 100) + 15,
      answer: inputRef.current?.value,
      questionId: questionId,
    };
    setAnswers((prev) => [...prev, newAnswer]);
  }


  useEffect(() => {
    function getAnswers() {
      setLoading(true);
      const answersToQuestion = requestAnswers.filter((answer) => {
        return answer.questionId === questionId;
      });
      setAnswers(answersToQuestion);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    getAnswers();
  }, [questionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
      <ReorderListContainer
        axis="y"
        values={answers}
        onReorder={setAnswers}
      >
        {answers.map((answer, index) => (
          <Reorder.Item
            key={`question-${answer.id}`}
            value={answer}
            className={`flex justify-between p-2 hover:bg-blue-300`}
          >
            <span>
              {index + 1}. {answer.answer}
            </span>
          </Reorder.Item>
        ))}
      </ReorderListContainer>
    </>
  );
};

export default EditAnswers;
