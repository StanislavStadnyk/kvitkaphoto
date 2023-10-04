import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en">
    <Head>
      <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
      <link href="/fonts/styles.css" rel="stylesheet" />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
