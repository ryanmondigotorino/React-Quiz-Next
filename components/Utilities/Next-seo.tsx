import React from 'react';
import { NextSeo } from 'next-seo';
import { SEO } from 'interfaces';

const isProdMode = process.env.NODE_ENV === 'production';

type Props = { seo: SEO };

const NextSeoBundle = ({ seo }: Props) => {
  const [mainseo, setMainSeo] = React.useState<SEO['mainseo']>(seo?.mainseo);
  const [dynaseo, setDynaSeo] = React.useState<SEO['seo']>(seo?.seo || []);

  React.useEffect(() => {
    if (seo?.mainseo) {
      setMainSeo(seo?.mainseo);
    }

    if (seo?.seo) {
      setDynaSeo(seo?.seo);
    }

    return () => {
      setMainSeo({});
      setDynaSeo([]);
    };
  }, [seo]);

  return (
    <React.Fragment>
      <NextSeo
        description={mainseo?.description || process.env.APP_NAME || 'Toptal Quiz'}
        nofollow={!isProdMode}
        noindex={!isProdMode}
        title={mainseo?.title || process.env.APP_NAME || 'Toptal Quiz'}
      />
      {dynaseo && dynaseo?.length > 0
        ? dynaseo
            ?.filter((meta) => !!meta)
            .map((meta) => {
              const returnValue = {
                title: <NextSeo key={meta.name} nofollow={!isProdMode} noindex={!isProdMode} title={meta?.content} />,
                canonical: (
                  <NextSeo key={meta.name} canonical={meta?.content} nofollow={!isProdMode} noindex={!isProdMode} />
                ),
                default: (
                  <NextSeo
                    key={meta.name}
                    additionalMetaTags={[
                      {
                        property: meta?.name,
                        content: meta?.content,
                      },
                      {
                        property: meta?.name,
                        content: meta?.content,
                      },
                    ]}
                    nofollow={!isProdMode}
                    noindex={!isProdMode}
                  />
                ),
              };
              return meta?.name === 'title' || meta?.name === 'canonical'
                ? returnValue[meta.name]
                : returnValue.default;
            })
        : ''}
    </React.Fragment>
  );
};

export default NextSeoBundle;
