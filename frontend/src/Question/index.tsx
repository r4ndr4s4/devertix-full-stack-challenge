import { useCallback, useContext } from "react";
import { AppStateContext } from "../App/AppState";
import { NUMBER_OF_QUESTIONS } from "../App";

function Question() {
  const { questions, setQuestions, currentQuestion, setCurrentQuestion } =
    useContext(AppStateContext);

  const setCurrentAnswer = useCallback(
    (currentAnswer: boolean) => {
      const currentQuestions = [...questions];
      currentQuestions[currentQuestion].currentAnswer = currentAnswer;

      setQuestions(currentQuestions);

      setCurrentQuestion(currentQuestion + 1);
    },
    [currentQuestion, questions, setCurrentQuestion, setQuestions]
  );

  return (
    <>
      <h1>
        Question
        <br />({`${currentQuestion + 1}/${NUMBER_OF_QUESTIONS}`})
      </h1>

      <p>{questions[currentQuestion].question}</p>

      <button onClick={() => setCurrentAnswer(false)}>False</button>
      <button onClick={() => setCurrentAnswer(true)}>True</button>
    </>
  );
}

export default Question;
