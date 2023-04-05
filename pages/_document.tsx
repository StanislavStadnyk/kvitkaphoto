import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html>
    <Head>
      <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300i,700&amp;subset=cyrillic-ext"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700&amp;subset=cyrillic,cyrillic-ext"
        rel="stylesheet"
      />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
