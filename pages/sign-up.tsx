import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import * as cookie from 'cookie';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import NextSeo from 'components/Utilities/Next-seo';
import type { SEO, FormFields, GeneratedToken } from 'interfaces';
import { Container } from 'styles/styled-components/auth.styled';
import { Text } from 'styles/styled-components/global.styled';
import { signUpFields } from 'utilities/fields';
import useForm from 'react-hook-form';
import { FieldValues, OnSubmit } from 'react-hook-form/dist/types';
import AuthWrapper from 'components/AuthWrapper';
import Input from 'components/Input';
import Button from 'components/Button';
import { api } from 'utilities/auth';

const CLIENT_URL = process.env.APP_URL;

type Props = { seo: SEO };

const Home: NextPage<Props> = ({ seo }) => {
  const router = useRouter();
  const { register, errors, handleSubmit, watch } = useForm();
  const [backendError, setBackendError] = React.useState({});
  const [loader, setLoader] = React.useState<boolean>(false);

  const onSignUpSubmit: OnSubmit<FieldValues> = async (value) => {
    try {
      setLoader(true);
      const { data } = await api().post('/api/auth/sign-up', { ...value });
      if (data?.meta?.status === 'success') {
        router.replace('/');
      }
      setLoader(false);
    } catch (error: any) {
      if (error?.response?.data?.meta?.status === 'error') {
        const { data } = error.response;
        setBackendError(data.message);
      }
      setLoader(false);
    }
  };

  return (
    <AuthWrapper>
      <NextSeo seo={seo} />
      <Container.Form>
        <Text.Title className="text-center mb-20">Sign Up</Text.Title>
        <form noValidate onSubmit={handleSubmit(onSignUpSubmit)}>
          {signUpFields?.map((val: FormFields) => (
            <Input
              key={val.id}
              type={val.type}
              reference={register(
                val.name === 'confirmPassword'
                  ? {
                      required: {
                        value: true,
                        message: 'Confirm password is required',
                      },
                      minLength: {
                        value: 7,
                        message: 'Confirm password must be greater than 7 characters.',
                      },
                      validate: (value: any) => {
                        return value === watch('password') || 'Confirm password do not match';
                      },
                    }
                  : val.validation,
              )}
              placeholder={val.placeholder}
              name={val.name}
              errors={{ ...errors, ...backendError }}
              onFocus={() => setBackendError({})}
            />
          ))}
          <Button disabled={loader} type="submit" styles={{ marginBottom: 24 }}>
            Sign Up
          </Button>
          <Text.SubTitle className="center">
            {`Already have an account? `}
            <Link href="/">Sign In</Link>
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
      mainseo: { title: `${process.env.APP_NAME} | Sign Up` },
    },
  };

  const cookies = cookie.parse(req.headers?.cookie || '');

  if (cookies.authToken && cookies.token) {
    const token = jwtDecode<GeneratedToken>(cookies.authToken);
    try {
      if (Date.now() >= token.exp * 1000) return { props };
      if (CLIENT_URL !== token.source) return { props };

      const { data } = await api(cookies.authToken).get(`${CLIENT_URL}/api/user`, { params: { id: token.userId }});

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

export default Home;
