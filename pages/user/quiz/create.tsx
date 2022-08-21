import React from 'react';
import * as cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import { User, Quiz } from '@prisma/client';
import type { NextPage, GetServerSideProps } from 'next';
import type { SEO, GeneratedToken, TableParams, Pagination } from 'interfaces';
import NextSeo from 'components/Utilities/Next-seo';
import Wrapper from 'components/User/Wrapper';
import { Direction, Text } from 'styles/styled-components/global.styled';
import { Wrapper as DashBoardWrapper, Content } from 'styles/styled-components/user/dashboard.styled';
import { api } from 'utilities/auth';

const CLIENT_URL = process.env.APP_URL;

type Props = { seo: SEO; user?: User };

const CreateQuiz: NextPage<Props> = ({ seo, user }) => {
  return (
    <Wrapper user={user}>
      <NextSeo seo={seo} />
      <DashBoardWrapper.Content>
        <Direction.Row className="separator">
          <Text.Title className="text-uppercase">Create Quiz</Text.Title>
        </Direction.Row>
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
