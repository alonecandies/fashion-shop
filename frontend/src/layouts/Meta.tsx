import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { metaConfig } from '@src/configs/metaConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
        <meta httpEquiv="Cache-Control" content="max-age=31536000, must-revalidate" />
        <link rel="apple-touch-icon" href={`${router.basePath}/apple-touch-icon.png`} key="apple" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href={`${router.basePath}/lasy_logo.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href={`${router.basePath}/lasy_logo.png`}
          key="icon16"
        />
        <link rel="icon" href={`${router.basePath}/lasy_logo.png`} key="favicon" />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: metaConfig.locale,
          site_name: metaConfig.site_name
        }}
      />
    </>
  );
};

export { Meta };
