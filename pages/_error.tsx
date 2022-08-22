import React from 'react';
import type { NextPage } from 'next';
import type { SEO } from 'interfaces';
import ErrorComponent from 'components/ErrorPage';

type Props = { seo: SEO };

const Error404: NextPage<Props> = ({ seo }) => <ErrorComponent seo={seo} />

Error404.getInitialProps = async () => ({
  seo: { mainseo: { title: `${process.env.APP_NAME} | Error 404 page not found` } },
});

export default Error404;
