import { Dispatch, SetStateAction } from "react";

interface IQuestion {
  question: string;
  answer: boolean;
}

export type IQuestions = IQuestion[];

interface IQuestionWithAnswer extends IQuestion {
  currentAnswer: boolean | undefined;
}

export type IQuestionsWithAnswers = IQuestionWithAnswer[] | [];

export type AppState = "INTRO" | "QUESTION" | "RESULTS";

export interface IAppState {
  questions: IQuestionsWithAnswers;
  setQuestions: Dispatch<
    React.SetStateAction<IQuestionsWithAnswers | undefined>
  >;
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
}
