import { useCallback, useContext } from "react";
import { Button, Typography } from "antd";
import styled from "@emotion/styled";
import { AppStateContext } from "../App/AppState";
import { NUMBER_OF_QUESTIONS } from "../App";

const { Title, Paragraph } = Typography;

const QuestionContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.88);
  padding: 125px 75px;
  margin-bottom: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

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
      <Title>
        Question
        <br />
        {`${currentQuestion + 1} / ${NUMBER_OF_QUESTIONS}`}
      </Title>

      <QuestionContainer>
        <Paragraph>{questions[currentQuestion].question}</Paragraph>
      </QuestionContainer>

      <ButtonContainer>
        <Button type="primary" onClick={() => setCurrentAnswer(false)}>
          False
        </Button>

        <Button type="primary" onClick={() => setCurrentAnswer(true)}>
          True
        </Button>
      </ButtonContainer>
    </>
  );
}

export default Question;
