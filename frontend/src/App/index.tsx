import { useEffect, useState } from "react";
import { AppStateContext } from "./AppState";
import Intro from "../Intro";
import { IQuestions, IQuestionsWithAnswers } from "./types";

function App() {
  const [questions, setQuestions] = useState<IQuestionsWithAnswers>();
  // TODO loading state

  // TODO swr/react query
  useEffect(() => {
    (async () => {
      try {
        // TODO env var validation
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/questions?number=10`
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
    <AppStateContext.Provider value={{ questions, currentQuestion: 0 }}>
      <Intro />
    </AppStateContext.Provider>
  );
}

export default App;
