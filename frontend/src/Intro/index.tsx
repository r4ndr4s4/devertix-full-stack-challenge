import { useContext } from "react";
import { AppStateContext } from "../App/AppState";
import { NUMBER_OF_QUESTIONS } from "../App";

function Intro() {
  const { setCurrentQuestion } = useContext(AppStateContext);

  return (
    <>
      <h1>Welcome to the Trivia Challenge!</h1>

      <h2>
        You will be presented with {NUMBER_OF_QUESTIONS} True of False
        questions.
      </h2>

      <h2>Can you score 100%?</h2>

      <button onClick={() => setCurrentQuestion(1)}>BEGIN</button>
    </>
  );
}

export default Intro;
