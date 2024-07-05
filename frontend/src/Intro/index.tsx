import { useContext } from "react";
import { AppStateContext } from "../App/AppState";

function Intro() {
  const questions = useContext(AppStateContext);

  return <p>{JSON.stringify(questions)}</p>;
}

export default Intro;
