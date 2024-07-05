import { useCallback, useContext, useMemo } from "react";
import { Button, Typography } from "antd";
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import styled from "@emotion/styled";
import { AppStateContext } from "../../contexts/AppState";
import { IQuestionsWithAnswers } from "../../types";
import { NUMBER_OF_QUESTIONS } from "../../utils/config";

const { Title, Paragraph } = Typography;

const AnswerContainer = styled.div`
  text-align: left;
`;

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
          <Paragraph key={crypto.randomUUID()}>
            {answer === currentAnswer ? (
              <PlusCircleTwoTone twoToneColor="#4caf50" />
            ) : (
              <MinusCircleTwoTone twoToneColor="#f44336" />
            )}
            {` ${question}`}
          </Paragraph>
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

    setCurrentQuestion(-1);
  }, [questions, setCurrentQuestion, setQuestions]);

  return (
    <>
      <Title>
        You scored
        <br />
        {`${correctAnswers} / ${NUMBER_OF_QUESTIONS}`}
      </Title>

      <AnswerContainer>{answerList}</AnswerContainer>

      <Button type="text" onClick={resetGame}>
        PLAY AGAIN?
      </Button>
    </>
  );
}

export default Results;
