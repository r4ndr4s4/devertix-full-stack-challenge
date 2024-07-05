import { useContext } from "react";
import { AppStateContext } from "../App/AppState";
import { NUMBER_OF_QUESTIONS } from "../App";

function Question() {
  const { questions, setQuestions, currentQuestion, setCurrentQuestion } =
    useContext(AppStateContext);

  const setCurrentAnswer = (currentAnswer: boolean) => {
    const currentQuestions = [...questions];
    currentQuestions[currentQuestion - 1].currentAnswer = currentAnswer;

    setQuestions(currentQuestions);

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <>
      <h1>Question ({`${currentQuestion}/${NUMBER_OF_QUESTIONS}`})</h1>

      <p>{questions[currentQuestion - 1].question}</p>

      <button onClick={() => setCurrentAnswer(false)}>False</button>
      <button onClick={() => setCurrentAnswer(true)}>True</button>
    </>
  );
}

export default Question;
