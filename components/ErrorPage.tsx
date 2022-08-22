import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import type { SEO } from 'interfaces';
import Button from 'components/Button';
import Link from 'next/link';
import { theme } from 'utilities/colors';
import NextSeo from 'components/Utilities/Next-seo';

const ErrorWrapper = styled.div`
  background: url('/images/access-bg.png') no-repeat;
  background-size: cover;
  height: 100vh;
  &.no-margin {
    margin-top: 104px;
  }
  .brand-logo {
    color: ${theme.primary};
    font-size: 10.4375rem;
    height: 3rem;
    width: 12.5rem;
  }
  .content {
    text-align: center;
    margin-top: 186px;
    &__title {
      margin-top: 1.5rem;
      margin-bottom: 0;
      font-family: 'Open Sans';
      font-weight: 600;
      font-size: 48px;
    }
    &__404 {
      font-size: 128px;
      font-family: 'Open Sans';
      font-weight: 600;
      margin-bottom: 0;
    }
    &__desc {
      font-family: 'Open Sans';
      font-weight: 400;
      font-size: 15px;
      color: ${theme.gray[400]};
      margin-bottom: 0;
    }
  }
`;

type Props = { seo: SEO };

const ErrorPage: React.FC<Props> = ({ seo }) => {
  const router = useRouter();
  return (
    <ErrorWrapper
      className={`d-flex flex-column align-items-center ${
        router.pathname.includes('/alpha/') ||
        router.pathname.includes('/listings/') ||
        router.pathname.includes('admin')
          ? 'no-margin'
          : ''
      }`}
    >
      <NextSeo seo={seo} />
      <div className="content">
        <p className="content__title">Oops! Page not found</p>
        <p className="content__404">404</p>
        <p className="content__desc">We&apos;re sorry, but the page you requested was not found.</p>
        <Link passHref href="/">
          <a href="replace">
            <Button type="button" styles={{ width: 300, marginTop: 25 }}>
                Back to Home
            </Button>
          </a>
        </Link>
      </div>
    </ErrorWrapper>
  );
};

export default ErrorPage;
