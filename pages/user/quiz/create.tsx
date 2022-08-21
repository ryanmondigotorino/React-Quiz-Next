import React from 'react';
import * as cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import { User } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import type { NextPage, GetServerSideProps } from 'next';
import type { SEO, GeneratedToken } from 'interfaces';
import type { Questions, Choices } from 'interfaces/quiz';
import NextSeo from 'components/Utilities/Next-seo';
import Wrapper from 'components/User/Wrapper';
import useForm from 'react-hook-form';
import { FieldValues, OnSubmit } from 'react-hook-form/dist/types';
import { Direction, Text } from 'styles/styled-components/global.styled';
import Input from 'components/Input';
import Button from 'components/Button';
import CheckBox from 'components/Checkbox';
import { toggleAlert } from 'redux/appSlice';
import { Wrapper as DashBoardWrapper, Content } from 'styles/styled-components/user/dashboard.styled';
import { api } from 'utilities/auth';

const CLIENT_URL = process.env.APP_URL;

type Props = { seo: SEO; user?: User };

const choicesParams: Choices = {
  description: '',
  isAnswer: false,
};

const questionParams: Questions = {
  question: '',
  type: false,
  choices: [...Array(5)].map(() => choicesParams),
};


const CreateQuiz: NextPage<Props> = ({ seo, user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, errors, handleSubmit } = useForm();
  const [backendError, setBackendError] = React.useState({});
  const [questionField, setQuestionField]
    = React.useState<Array<Questions>>(() => [...Array(2)].map(() => questionParams));
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
  const onFormSubmit: OnSubmit<FieldValues> = async (value) => {
    setIsLoading(false);
    let payload = value;
    if (payload.questions) {
      const questionsData: Array<Questions> = [];
      questionField.forEach((_, i) => {
        const questionDetails: Questions = {
          question: payload.questions[`question${i}`],
          type: questionField[i].type,
          choices: questionField[i].choices.map((choice, d) => ({
            description: payload.questions[`choices${i}`][`description${d}`],
            isAnswer: choice.isAnswer,
          }))
        };
        if (Object.keys(questionDetails).length) questionsData.push(questionDetails);
      });
      const questions = questionsData;
      payload = { ...payload, questions };
      
      const { data } = await api().post('/api/quiz', { ...payload });

      if (data?.meta?.status === 'success') {
        dispatch(
          toggleAlert({
            icon: 'success',
            isVisible: true,
            header: 'Success!',
            message: 'Quiz created successfully.',
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
                  router.push('/user');
                }}
                >
                  Ok
                </Button> 
            ),
          }),
        );
      }
    }
    setIsLoading(true);
  };


  /**
   * @function addChoices
   * @return void
   * 
   * Temporary removed as this function is not needed for now 
   * 
   * const addChoices = (fieldKey: number) => {
      const getQuestions: Array<Questions> = JSON.parse(JSON.stringify(questionField));
      getQuestions[fieldKey].choices = [...getQuestions[fieldKey].choices, choicesParams];
      setQuestionField(getQuestions);
    };
   * 
   * @author Ryan M. Torino
   */

  interface SetAnswerProp { questionKey: number; choiceKey: number };

  const setRightAnswer = ({ questionKey, choiceKey }: SetAnswerProp, value: boolean, type: 'multiple' | 'single') => {
    const getQuestions: Array<Questions> = JSON.parse(JSON.stringify(questionField));
    switch (type) {
      case 'multiple':
        if (getQuestions[questionKey].choices.filter((v) => !v.isAnswer).length > 1 || !value) {
          getQuestions[questionKey].choices[choiceKey].isAnswer = value;
        }
        break;
      case 'single':
        getQuestions[questionKey].choices = getQuestions[questionKey].choices.map((v) => ({ ...v, isAnswer: false }));
        getQuestions[questionKey].choices[choiceKey].isAnswer = value;
        break;
    }
    setQuestionField(getQuestions);
  };

  const setMultipleChoice = (fieldKey: number, value: boolean) => {
    const getQuestions: Array<Questions> = JSON.parse(JSON.stringify(questionField));
    getQuestions[fieldKey].type = value;
    getQuestions[fieldKey].choices = getQuestions[fieldKey].choices.map((v) => ({ ...v, isAnswer: false }));
    setQuestionField(getQuestions);
  };

  return (
    <Wrapper user={user}>
      <NextSeo seo={seo} />
      <DashBoardWrapper.Content>
        <Direction.Row className="separator">
          <Text.Title className="text-uppercase">Create Quiz</Text.Title>
        </Direction.Row>
        <Content.Wrapper>
          <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
            <Input
              type="text"
              reference={register({
                required: {
                  value: true,
                  message: 'Quiz title is required'
                }
              })}
              placeholder="Enter Title"
              name="title"
              errors={{ ...errors, ...backendError }}
              onFocus={() => setBackendError({})}
            />
            <Text.Title className="heading text-uppercase mb-20">Questions</Text.Title>
            {questionField.map((question, key) => (
              <Direction.Col key={key}>
                <Direction.Row className="w-100 justify-content-between">
                  <Input
                    type="text"
                    reference={register({
                      required: {
                        value: true,
                        message: `Question #${key + 1} is required`,
                      }
                    })}
                    placeholder={`Enter Question #${key + 1}`}
                    name={`questions[question${key}]`}
                    styles={{ width: 'calc(100% - 300px)' }}
                    errors={{ ...errors, ...backendError }}
                    onFocus={() => setBackendError({})}
                  />
                  <CheckBox
                    data={question.type}
                    label="Multiple Choice"
                    onToggle={(value) => setMultipleChoice(key, value)}
                  />
                </Direction.Row>
                <Direction.Col className="pl-15 mb-20">
                  <Text.SubTitle className="heading mb-20">Choices</Text.SubTitle>
                  {question.choices.map((choice, keyChoice) => (
                    <Direction.Row
                      key={`${key}-${keyChoice}`}
                      className="justify-content-between w-350"
                    >
                      <Input
                        type="text"
                        reference={register({
                          required: {
                            value: true,
                            message: `Question choice is required`,
                          }
                        })}
                        placeholder={`Enter choice`}
                        styles={{ width: 200 }}
                        name={`questions[choices${key}[description${keyChoice}]]`}
                        errors={{ ...errors, ...backendError }}
                        onFocus={() => setBackendError({})}
                      />
                      <CheckBox
                        data={choice.isAnswer}
                        label="Right Answer"
                        onToggle={(value) => {
                          const type = question.type ? 'multiple' : 'single';
                          setRightAnswer({ questionKey: key, choiceKey: keyChoice}, value, type)
                        }}
                      />
                    </Direction.Row>
                  ))}
                  {/* 
                    * Removed this line as per choice is statically declared as 5
                    <Text.SubTitle className="clickable d-none" onClick={() => addChoices(key)}>+ Add choices</Text.SubTitle>
                  */}
                </Direction.Col>
              </Direction.Col>
            ))}
            <Direction.Row className="justify-content-end separator">
              <Button disabled={isLoading} type="submit" styles={{ width: 'auto', padding: '15px 30px' }}>
                Create
              </Button>
            </Direction.Row>
          </form>
        </Content.Wrapper>
      </DashBoardWrapper.Content>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const props: Props = {
    seo: {
      mainseo: { title: `${process.env.APP_NAME} | Create Quiz` },
    },
  };

  const unvalidated = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };

  const cookies = cookie.parse(req.headers?.cookie || '');

  if (!(cookies.authToken && cookies.token)) return unvalidated;

  const token = jwtDecode<GeneratedToken>(cookies.authToken);
  try {
    if (Date.now() >= token.exp * 1000) return unvalidated;
    if (CLIENT_URL !== token.source) return unvalidated;

    const { data } = await api(cookies.authToken).get(`${CLIENT_URL}/api/user`, { params: { id: token.userId }});

    const user = data?.data?.[0] as User;
    if (user.id === token.userId) {
      return { props: { ...props, user } };
    }
  } catch (error) {
    return unvalidated;
  }
  return { props };
};

export default CreateQuiz;
