import { TestQuestion } from "../entities/TestQuestion";

const TestQuestionRenderer = ({question}: {question: TestQuestion}) => {
	return <p className="text-center text-5xl sm:text-[180px]">{question.question}</p>;
}

export default TestQuestionRenderer;