import { createContext } from "react";
import { IAppState } from "./types";

const initialAppState: IAppState = {
  questions: [],
  currentQuestion: 0,
};

export const AppStateContext = createContext(initialAppState);
