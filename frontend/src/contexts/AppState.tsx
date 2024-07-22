import { createContext } from "react";
import { type IAppState } from "../types";

const initialAppState: IAppState = {
  questions: [],
  setQuestions: () => true,
  currentQuestion: -1,
  setCurrentQuestion: () => true,
};

export const AppStateContext = createContext(initialAppState);
