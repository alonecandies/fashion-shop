import Document, { Html, Head, Main, NextScript } from 'next/document';

import { metaConfig } from '@src/configs/metaConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={metaConfig.locale}>
        <div id="fb-root"></div>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
