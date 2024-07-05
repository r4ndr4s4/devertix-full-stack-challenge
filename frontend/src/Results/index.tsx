import { useContext } from "react";
import { AppStateContext } from "../App/AppState";

function Results() {
  const { questions, setCurrentQuestion } = useContext(AppStateContext);

  return (
    <>
      <h1>Results</h1>

      <p>{JSON.stringify(questions)}</p>

      <button onClick={() => setCurrentQuestion(1)}>Play again</button>
    </>
  );
}

export default Results;
