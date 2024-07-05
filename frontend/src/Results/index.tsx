import { useCallback, useContext, useMemo } from "react";
import { AppStateContext } from "../App/AppState";
import { IQuestionsWithAnswers } from "../App/types";
import { NUMBER_OF_QUESTIONS } from "../App";

function Results() {
  const { questions, setQuestions, setCurrentQuestion } =
    useContext(AppStateContext);

  const correctAnswers = useMemo(
    () =>
      questions.filter(({ answer, currentAnswer }) => answer === currentAnswer)
        .length,
    [questions]
  );

  const answerList = useMemo(
    () =>
      questions.map(({ question, answer, currentAnswer }) => {
        return (
          <p key={crypto.randomUUID()}>{`${
            answer === currentAnswer ? "+" : "-"
          } ${question}`}</p>
        );
      }),
    [questions]
  );

  const resetGame = useCallback(() => {
    const currentQuestions = [...questions];

    const questionsWithAnswers: IQuestionsWithAnswers = currentQuestions.map(
      (question) => {
        return {
          ...question,
          currentAnswer: undefined,
        };
      }
    );

    setQuestions(questionsWithAnswers);

    setCurrentQuestion(0);
  }, [questions, setCurrentQuestion, setQuestions]);

  return (
    <>
      <h1>
        You scored
        <br />({`${correctAnswers}/${NUMBER_OF_QUESTIONS}`})
      </h1>

      {answerList}

      <button onClick={resetGame}>PLAY AGAIN?</button>
    </>
  );
}

export default Results;
