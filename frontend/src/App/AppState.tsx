import { createContext } from "react";
import { IAppState } from "./types";

const initialAppState: IAppState = {
  questions: [],
  setQuestions: () => true,
  currentQuestion: 0,
  setCurrentQuestion: () => true,
};

export const AppStateContext = createContext(initialAppState);
