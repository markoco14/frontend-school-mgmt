import ListContainer from "@/src/modules/core/components/ListContainer";
import { Answer } from "@/src/modules/tests/entities/Answer";

type AnswerListProps = {
  answers: Answer[];
};

const AnswerList = ({ answers }: AnswerListProps) => {
  return answers.length === 0 ? (
    <p className="p-2">No answers found.</p>
  ) : (
    <ListContainer>
      {answers.map((answer, index) => (
        <li key={answer.id} className="p-2 hover:bg-gray-200 active:bg-gray-300">
          {index + 1}. {answer.answer}
        </li>
      ))}
    </ListContainer>
  );
};

export default AnswerList;
