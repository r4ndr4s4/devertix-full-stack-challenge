import { useContext } from "react";
import { AppStateContext } from "../App/AppState";

function Intro() {
  const { setCurrentQuestion } = useContext(AppStateContext);

  return (
    <>
      <h1>Intro</h1>

      <button onClick={() => setCurrentQuestion(1)}>Begin</button>
    </>
  );
}

export default Intro;
