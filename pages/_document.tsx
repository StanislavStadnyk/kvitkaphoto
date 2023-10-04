import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en">
    <Head>
      <link
        type="font/woff"
        rel="preload"
        href="/fonts/OpenSans-CondBold-webfont.woff"
        as="font"
        crossOrigin="true"
      />
      <link
        type="font/woff"
        rel="preload"
        href="/fonts/OpenSans-CondLight-webfont.woff"
        as="font"
        crossOrigin="true"
      />
      <link
        type="font/woff"
        rel="preload"
        href="/fonts/PTN57F-webfont.woff"
        as="font"
        crossOrigin="true"
      />
      <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
      <link type="text/css" rel="stylesheet" href="/fonts/styles.css" />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
