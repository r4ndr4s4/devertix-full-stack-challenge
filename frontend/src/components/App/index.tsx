import { useCallback, useEffect, useMemo, useState } from "react";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { z } from "zod";
import { AppStateContext } from "../../contexts/AppState";
import Intro from "../Intro";
import {
  type AppState,
  type Questions,
  type QuestionsWithAnswers,
  QuestionsWithAnswers as questionsSchema,
} from "../../types";
import Question from "../Question";
import Results from "../Results";
import env from "../../utils/env";
import { NUMBER_OF_QUESTIONS } from "../../utils/config";

const { Paragraph } = Typography;

const Container = styled.div`
  width: 320px;
  height: 640px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  const [questions, setQuestions] = useState<QuestionsWithAnswers>();
  const [currentQuestion, setCurrentQuestion] = useState(-1);

  useEffect(() => {
    (async () => {
      try {
        const questionsToSync = localStorage.getItem("questions");

        if (questionsToSync) {
          const questionsToSyncAsJson = JSON.parse(questionsToSync);
          questionsSchema.parse(questionsToSyncAsJson);

          setQuestions(questionsToSyncAsJson);

          const currentQuestionToSync = localStorage.getItem("currentQuestion");

          const currentQuestionSchema = z.coerce.number();
          currentQuestionSchema.parse(currentQuestionToSync);

          setCurrentQuestion(Number(currentQuestionToSync));

          return;
        }

        const response = await fetch(
          `${env.VITE_BACKEND_BASE_URL}/questions?number=${NUMBER_OF_QUESTIONS}`
        );

        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const { data } = (await response.json()) as {
          data: { questions: Questions };
        };

        const questionsWithAnswers: QuestionsWithAnswers = data.questions.map(
          (question) => {
            return {
              ...question,
              currentAnswer: undefined,
            };
          }
        );

        setQuestions(questionsWithAnswers);
      } catch (e) {
        console.log(
          "Error happened while fetching questions/syncing from localStorage!",
          e
        );
      }
    })();
  }, []);

  const appState: AppState = useMemo(
    () =>
      currentQuestion === -1
        ? "INTRO"
        : currentQuestion < NUMBER_OF_QUESTIONS
        ? "QUESTION"
        : "RESULTS",
    [currentQuestion]
  );

  const currentComponent = useMemo(() => {
    switch (appState) {
      case "INTRO":
        return <Intro />;
      case "QUESTION":
        return <Question />;
      case "RESULTS":
        return <Results />;
    }
  }, [appState]);

  const syncQuestions = useCallback(
    (newQuestions: QuestionsWithAnswers | undefined) => {
      setQuestions(newQuestions);

      const questionsToSync = JSON.stringify(newQuestions);
      localStorage.setItem("questions", questionsToSync);
    },
    []
  );

  const syncCurrentQuestion = useCallback((newCurrentQuestion: number) => {
    setCurrentQuestion(newCurrentQuestion);

    localStorage.setItem("currentQuestion", String(newCurrentQuestion));

    // TODO reuse appState from above
    localStorage.setItem(
      "appState",
      newCurrentQuestion === -1
        ? "INTRO"
        : newCurrentQuestion < NUMBER_OF_QUESTIONS
        ? "QUESTION"
        : "RESULTS"
    );
  }, []);

  if (!questions) {
    return <Paragraph>Questions are not fetched...</Paragraph>;
  }

  return (
    <AppStateContext.Provider
      value={{
        questions,
        setQuestions: syncQuestions,
        currentQuestion,
        setCurrentQuestion: syncCurrentQuestion,
      }}
    >
      <Container>{currentComponent}</Container>
    </AppStateContext.Provider>
  );
}

export default App;
