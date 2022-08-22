import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import NextSeo from 'components/Utilities/Next-seo';
import { Quiz, QuizQuestions, QuizChoices } from '@prisma/client';
import type { SEO } from 'interfaces';
import { api } from 'utilities/auth';
import Wrapper from 'components/User/Wrapper';
import ErrorComponent from 'components/ErrorPage';
import { toggleAlert } from 'redux/appSlice';
import Button from 'components/Button';
import { Wrapper as DashBoardWrapper, Content } from 'styles/styled-components/user/dashboard.styled';
import { Direction, Text } from 'styles/styled-components/global.styled';
import CheckBox from 'components/Checkbox';

const CLIENT_URL = process.env.APP_URL;

interface QuizQuestionProps extends QuizQuestions {
  quizChoices: Array<QuizChoices>;
}

interface QuizProps extends Quiz {
  quizQuestions: Array<QuizQuestionProps>;
}

type Props = { seo: SEO, quiz?: QuizProps };

const PublishQuiz: NextPage<Props> = ({ seo, quiz }) => {
  const [answers, setAnswers] = 
    React.useState<Array<QuizQuestionProps>>();
  const dispatch = useDispatch();
  

  interface SetAnswerProp { questionKey: number; choiceKey: number };

  const setRightAnswer = (
    { questionKey, choiceKey }: SetAnswerProp,
    value: boolean, type: 'multiple' | 'single'
  ) => {
    const getQuestions: Array<QuizQuestionProps> = JSON.parse(JSON.stringify(answers));
    switch (type) {
      case 'multiple':
        if (getQuestions[questionKey].quizChoices.filter((v) => !v.isAnswer).length > 1 || !value) {
          getQuestions[questionKey].quizChoices[choiceKey].isAnswer = value;
        }
        break;
      case 'single':
        getQuestions[questionKey].quizChoices = getQuestions[questionKey].quizChoices.map((v) => ({ ...v, isAnswer: false }));
        getQuestions[questionKey].quizChoices[choiceKey].isAnswer = value;
        break;
    }
    setAnswers(getQuestions);
  };

  const getFinalAnswer = () => {
    dispatch(
      toggleAlert({
        isVisible: false,
        header: '',
        message: '',
        btn: null,
      })
    );
    const checkIfCorrect = quiz?.quizQuestions.map((question, key) => {
      let correctAnswer = true;
      question.quizChoices.forEach((choice, keyChoice) => {
        const userAnswer = answers?.[key].quizChoices[keyChoice].isAnswer;
        if (!correctAnswer) {
          correctAnswer = false;
        } else {
          correctAnswer = choice.isAnswer === userAnswer;
        }
      });
      return correctAnswer;
    });
    dispatch(
      toggleAlert({
        icon: 'success',
        isVisible: true,
        header: 'Your Answer',
        message: `You answered ${checkIfCorrect?.filter((ans) => ans).length}/${quiz?.quizQuestions.length} questions correctly`,
        btn: (
          <Button
            type="button"
            styles={{ width: 133 }}
            onClick={() => {
              dispatch(
                toggleAlert({
                  isVisible: false,
                  header: '',
                  message: '',
                  btn: null,
                })
              );
              location.reload();
            }}
            >
              Retake
            </Button> 
        ),
      }),
    );
  };

  const confirmationAnswer = () => {
    dispatch(
      toggleAlert({
        icon: 'warning',
        isVisible: true,
        header: 'Confirmation',
        message: 'Submit your answer? Unanswered question can also be submitted.',
        btn: (
          <Direction.Row className="alert-wrap">
            <Button
              isClear
              type="button"
              styles={{ width: 133 }}
              onClick={() =>
                dispatch(
                  toggleAlert({
                    isVisible: false,
                    header: '',
                    message: '',
                    btn: null,
                  })
                )}
              >
                Close
              </Button> 
            <Button
              type="button"
              styles={{ width: 133 }}
              onClick={getFinalAnswer}
              >
                Confirm
              </Button> 
          </Direction.Row>
        ),
      }),
    );
  };

  React.useMemo(() => {
    if (quiz?.quizQuestions) {
      const getQuiz: QuizProps = JSON.parse(JSON.stringify(quiz));
      getQuiz.quizQuestions = getQuiz.quizQuestions.map((question) => ({
        ...question,
        quizChoices: question.quizChoices.map((choice) => ({
          ...choice,
          isAnswer: false,
        })),
      }));
      setAnswers(getQuiz.quizQuestions);
    }
  }, [quiz]);

  if (!quiz?.id) {
    return <ErrorComponent seo={seo} />;
  }
  
  return (
    <Wrapper>
      <NextSeo seo={seo} />
      <DashBoardWrapper.Content>
        <Direction.Row className="separator mb-20">
          <Text.Title className="text-uppercase">{quiz.title}</Text.Title>
        </Direction.Row>
        <Text.Title className="heading text-uppercase mb-20">Questions</Text.Title>
        <Content.Wrapper>
          {quiz.quizQuestions.map((question, key) => (
            <Direction.Col key={question.id} className="mb-20">
              <Text.SubTitle
                className="mb-20"
              >
                {`${key + 1}. ${question.question} ${question.type ? `(Select all possible answers)` : ''}`}
              </Text.SubTitle>
              <Direction.Col className="pl-15">
                {question.quizChoices.map((choice, keyChoice) => (
                  <CheckBox
                    key={choice.id}
                    data={answers?.[key].quizChoices[keyChoice].isAnswer}
                    label={choice.description}
                    onToggle={(value) => {
                      const type = question.type ? 'multiple' : 'single';
                      setRightAnswer({ questionKey: key, choiceKey: keyChoice}, value, type)
                    }}
                  />
                ))}
              </Direction.Col>
            </Direction.Col>
          ))}
          <Direction.Row className="justify-content-end">
            <Button
              type="button"
              styles={{ width: 'auto', padding: '15px 30px' }}
              onClick={confirmationAnswer}
            >
              Submit
            </Button>
          </Direction.Row>
        </Content.Wrapper>
      </DashBoardWrapper.Content>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;

  if (!params?.slug) {
    return {
      props: {
        seo: {
          mainseo: { title: `${process.env.APP_NAME} | Error 404 page not found` },
        },
      },
    };
  }

  const { data } = await api().get(`${CLIENT_URL}/api/quiz`, { params: { url: params.slug }});

  if (data?.meta?.status === 'success' && data?.meta?.count > 0) {
    const details: QuizProps = data?.data[0];
    return {
      props: {
        seo: {
          mainseo: { title: `${process.env.APP_NAME} | ${details.title}` },
        },
        quiz: details,
      },
    };
  }

  return {
    props: {
      seo: {
        mainseo: { title: `${process.env.APP_NAME} | Error 404 page not found` },
      },
    },
  };
};

export default PublishQuiz;
