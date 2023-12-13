import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const Document = () => (
  <Html lang="en">
    <Head>
      <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400|Open+Sans+Condensed:300,700&display=swap"
        rel="stylesheet"
      />
    </Head>

    <body>
      <Main />
      <NextScript />

      {/* Photostack */}
      <Script strategy="beforeInteractive" src="/js/modernizr.min.js" />
      <Script strategy="beforeInteractive" src="/js/classie.min.js" />
      <Script strategy="beforeInteractive" src="/js/photostack.js" />

      {/* GA */}
      <Script
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RMS1F5M93T"
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        async
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RMS1F5M93T', {
                page_path: window.location.pathname,
              });
            `
        }}
      />
    </body>
  </Html>
)

export default Document
