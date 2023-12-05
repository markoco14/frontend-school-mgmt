import ListContainer from "@/src/modules/core/components/ListContainer";
import { Answer } from "@/src/modules/tests/entities/Answer";

type AnswerListProps = {
  answers: Answer[];
};

const AnswerList = ({ answers }: AnswerListProps) => {
  return answers.length === 0 ? (
    <p>No answers for this question</p>
  ) : (
    <ListContainer>
      {answers.map((answer) => (
        <li key={answer.id}>{answer.answer}</li>
      ))}
    </ListContainer>
  );
};

export default AnswerList;
