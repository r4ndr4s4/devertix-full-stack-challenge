import { z } from "zod";

const Question = z.object({
  question: z.string(),
  answer: z.boolean(),
});

type Question = z.infer<typeof Question>;
export type Questions = Question[];

const QuestionWithAnswer = Question.extend({
  currentAnswer: z.boolean().optional(), // TODO don't allow optional, only to be undefined
});
export const QuestionsWithAnswers = z.array(QuestionWithAnswer);

export type QuestionsWithAnswers = z.infer<typeof QuestionsWithAnswers> | [];

export type AppState = "INTRO" | "QUESTION" | "RESULTS";

export interface IAppState {
  questions: QuestionsWithAnswers;
  setQuestions: (newQuestions: QuestionsWithAnswers | undefined) => void;
  currentQuestion: number;
  setCurrentQuestion: (newCurrentQuestion: number) => void;
}
