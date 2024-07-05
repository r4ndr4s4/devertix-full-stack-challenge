import { useContext } from "react";
import { AppStateContext } from "../App/AppState";

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
      <h1>Question ({currentQuestion})</h1>

      <p>{JSON.stringify(questions[currentQuestion - 1])}</p>

      <button onClick={() => setCurrentAnswer(false)}>False</button>
      <button onClick={() => setCurrentAnswer(true)}>True</button>
    </>
  );
}

export default Question;
