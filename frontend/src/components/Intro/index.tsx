import { useContext } from "react";
import { Button, Typography } from "antd";
import { AppStateContext } from "../../contexts/AppState";
import { NUMBER_OF_QUESTIONS } from "../../utils/config";

const { Title } = Typography;

function Intro() {
  const { setCurrentQuestion } = useContext(AppStateContext);

  return (
    <>
      <Title>Welcome to the Trivia Challenge!</Title>

      <Title level={2}>
        You will be presented with {NUMBER_OF_QUESTIONS} True of False
        questions.
      </Title>

      <Title level={2}>Can you score 100%?</Title>

      <Button type="text" onClick={() => setCurrentQuestion(0)}>
        BEGIN
      </Button>
    </>
  );
}

export default Intro;
