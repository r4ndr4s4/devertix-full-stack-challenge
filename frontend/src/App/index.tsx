import { useEffect, useState } from "react";
import { AppStateContext } from "./AppState";
import Intro from "../Intro";
import { IQuestions, IQuestionsWithAnswers } from "./types";
import Question from "../Question";
import Results from "../Results";

export const NUMBER_OF_QUESTIONS = 10;

function App() {
  const [questions, setQuestions] = useState<IQuestionsWithAnswers>();
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  // TODO loading state

  // TODO swr/react query
  useEffect(() => {
    (async () => {
      try {
        // TODO env var validation
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_BASE_URL
          }/questions?number=${NUMBER_OF_QUESTIONS}`
        );

        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const { data } = (await response.json()) as {
          data: { questions: IQuestions };
        };

        console.log({ data }); // TODO remove

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
        // TODO overlay error message
        console.log("Error happened while fetching questions!", e);
      }
    })();
  }, []);

  if (!questions) {
    return <p>Questions are not fetched...</p>;
  }

  return (
    <AppStateContext.Provider
      value={{ questions, setQuestions, currentQuestion, setCurrentQuestion }}
    >
      {currentQuestion === -1 ? (
        <Intro />
      ) : currentQuestion < NUMBER_OF_QUESTIONS ? (
        <Question />
      ) : (
        <Results />
      )}
    </AppStateContext.Provider>
  );
}

export default App;
