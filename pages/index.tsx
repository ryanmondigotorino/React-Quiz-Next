import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import * as cookie from 'cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextSeo from 'components/Utilities/Next-seo';
import type { SEO, FormFields, GeneratedToken } from 'interfaces';
import { Container } from 'styles/styled-components/auth.styled';
import { Text } from 'styles/styled-components/global.styled';
import { signInFields } from 'utilities/fields';
import useForm from 'react-hook-form';
import jwtDecode from 'jwt-decode';
import { FieldValues, OnSubmit } from 'react-hook-form/dist/types';
import AuthWrapper from 'components/AuthWrapper';
import Input from 'components/Input';
import { setAuthorization } from 'utilities/auth';
import Button from 'components/Button';

const CLIENT_URL = process.env.APP_URL;

type Props = { seo: SEO };
const SignIn: NextPage<Props> = ({ seo }) => {
  const router = useRouter();
  const { register, errors, handleSubmit } = useForm();
  const [backendError, setBackendError] = React.useState({});
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSignInSubmit: OnSubmit<FieldValues> = async (value) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/sign-in', { ...value });
      if (data?.data) {
        setAuthorization(data.data);
        router.push('/user');
      }
    } catch (error: any) {
      if (error?.response?.data?.meta?.status === 'error') {
        const { data } = error.response;
        setBackendError(data.message);
      }
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <NextSeo seo={seo} />
      <Container.Form>
        <Text.Title className="text-center mb-20">Sign In</Text.Title>
        <form noValidate onSubmit={handleSubmit(onSignInSubmit)}>
          {signInFields?.map((val: FormFields) => (
            <Input
              key={val.id}
              type={val.type}
              reference={register(val.validation)}
              placeholder={val.placeholder}
              name={val.name}
              errors={{ ...errors, ...backendError }}
              onFocus={() => setBackendError({})}
            />
          ))}
          <Button disabled={loading} type="submit" styles={{ marginBottom: 24 }}>
            Sign In
          </Button>
          <Text.SubTitle className="center">
            {`Don't have an account? `}
            <Link href="/sign-up">Sign Up</Link>
            {' here.'}
          </Text.SubTitle>
        </form>
      </Container.Form>
    </AuthWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const props: Props = {
    seo: {
      mainseo: { title: `${process.env.APP_NAME} | Sign In` },
    },
  };

  const cookies = cookie.parse(req.headers?.cookie || '');

  if (cookies.authToken && cookies.token) {
    const token = jwtDecode<GeneratedToken>(cookies.authToken);
    try {
      if (Date.now() >= token.exp * 1000) return { props };
      if (CLIENT_URL !== token.source) return { props };

      const { data } = await axios({
        method: 'GET',
        url: `${CLIENT_URL}/api/user`,
        params: {
          id: token.userId,
        },
      });

      if (data?.data?.[0]?.id === token.userId) {
        return {
          redirect: {
            destination: '/user',
            permanent: false,
          },
        };
      }
    } catch (error) {
      return { props };
    }
  }

  return { props };
};

export default SignIn;
