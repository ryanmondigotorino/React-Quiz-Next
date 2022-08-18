import React from 'react';
import * as cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import type { NextPage, GetServerSideProps } from 'next';
import Wrapper from 'components/User/Wrapper';
import NextSeo from 'components/Utilities/Next-seo';
import type { SEO, GeneratedToken, User } from 'interfaces';

const CLIENT_URL = process.env.APP_URL;

type Props = { seo: SEO; user?: User };

const UserDashboard: NextPage<Props> = ({ seo, user }) => {
  return (
    <Wrapper user={user}>
      <NextSeo seo={seo} />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const props: Props = {
    seo: {
      mainseo: { title: `${process.env.APP_NAME} | Dashboard` },
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

    const { data } = await axios({
      method: 'GET',
      url: `${CLIENT_URL}/api/user`,
      params: {
        id: token.userId,
      },
    });

    const user = data?.data?.[0] as User;
    if (user.id === token.userId) {
      return { props: { ...props, user } };
    }
  } catch (error) {
    return unvalidated;
  }
  return { props };
};

export default UserDashboard;