import { useContext } from "react";
import { AppStateContext } from "../App/AppState";
import { IQuestionsWithAnswers } from "../App/types";

function Results() {
  const { questions, setQuestions, setCurrentQuestion } =
    useContext(AppStateContext);

  return (
    <>
      <h1>Results</h1>

      <p>{JSON.stringify(questions)}</p>

      <button
        onClick={() => {
          const currentQuestions = [...questions];

          const questionsWithAnswers: IQuestionsWithAnswers =
            currentQuestions.map((question) => {
              return {
                ...question,
                currentAnswer: undefined,
              };
            });

          setQuestions(questionsWithAnswers);

          setCurrentQuestion(0);
        }}
      >
        Play again
      </button>
    </>
  );
}

export default Results;
