import { Answer } from "./Answer";

export type TestQuestion = {
  id: number;
  question: string;
  mistakes: string[];
  answers?: Answer[];
};
