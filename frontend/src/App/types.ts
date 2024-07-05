interface IQuestion {
  question: string;
  answer: boolean;
}

export type IQuestions = IQuestion[];

interface IQuestionWithAnswer extends IQuestion {
  currentAnswer: boolean | undefined;
}

export type IQuestionsWithAnswers = IQuestionWithAnswer[] | [];

export interface IAppState {
  questions: IQuestionsWithAnswers;
  currentQuestion: number;
}
