import { useEffect, useMemo, useState } from "react";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { AppStateContext } from "../../contexts/AppState";
import Intro from "../Intro";
import { AppState, IQuestions, IQuestionsWithAnswers } from "../../types";
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
  const [questions, setQuestions] = useState<IQuestionsWithAnswers>();
  const [currentQuestion, setCurrentQuestion] = useState(-1);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${env.VITE_BACKEND_BASE_URL}/questions?number=${NUMBER_OF_QUESTIONS}`
        );

        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const { data } = (await response.json()) as {
          data: { questions: IQuestions };
        };

        const questionsWithAnswers: IQuestionsWithAnswers = data.questions.map(
          (question) => {
            return {
              ...question,
              currentAnswer: undefined,
            };
          }
        );

        setQuestions(questionsWithAnswers);
      } catch (e) {
        console.log("Error happened while fetching questions!", e);
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

  if (!questions) {
    return <Paragraph>Questions are not fetched...</Paragraph>;
  }

  return (
    <AppStateContext.Provider
      value={{ questions, setQuestions, currentQuestion, setCurrentQuestion }}
    >
      <Container>{currentComponent}</Container>
    </AppStateContext.Provider>
  );
}

export default App;
