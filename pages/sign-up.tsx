import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import NextSeo from 'components/Utilities/Next-seo';
import type { SEO, FormFields } from 'interfaces';
import { Container } from 'styles/styled-components/auth.styled';
import { Text } from 'styles/styled-components/global.styled';
import { signUpFields } from 'utilities/fields';
import useForm from 'react-hook-form';
import { FieldValues, OnSubmit } from 'react-hook-form/dist/types';
import AuthWrapper from 'components/AuthWrapper';
import Input from 'components/Input';
import Button from 'components/Button';

type Props = { seo: SEO };

const Home: NextPage<Props> = ({ seo }) => {
  const router = useRouter();
  const { register, errors, handleSubmit, watch } = useForm();
  const [backendError, setBackendError] = React.useState({});
  const [loader, setLoader] = React.useState<boolean>(false);

  const onSignUpSubmit: OnSubmit<FieldValues> = async (value) => {
    try {
      setLoader(true);
      const { data } = await axios.post('/api/auth/sign-up', { ...value });
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

export const getServerSideProps: GetServerSideProps = async () => {
  const props: Props = {
    seo: {
      mainseo: { title: `${process.env.APP_NAME} | Sign Up` },
    },
  };

  return { props };
};

export default Home;
