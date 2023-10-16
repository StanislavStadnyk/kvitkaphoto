import SSRProvider from 'react-bootstrap/SSRProvider'

import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

// components
import Layout from '@kvitkaphoto/components/layout/Layout'
// constants
import { LOGO, META_DESCRIPTION, META_KEYWORDS } from '@kvitkaphoto/constants'
import supabase from '@kvitkaphoto/supabase.config'

// styles
import '../styles/index.scss'

// types
type AppOwnProps = { data: any }

export function CustomApp({
  Component,
  pageProps,
  data
}: AppProps & AppOwnProps) {
  return (
    <>
      <SSRProvider>
        <Head>
          <meta property="og:url" content="https://www.kvitkaphoto.com.au/" />
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content="Kvitkaphoto Photography Melbourne"
          />
          <meta
            property="og:description"
            content="Kvitkaphoto Photography Melbourne"
          />
          <meta property="og:image" content="/images/img-meta.webp" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="utf-8" />
          <meta content="text/html; charset=utf-8" />
          <meta name="description" content={META_DESCRIPTION} />
          <meta name="keywords" content={META_KEYWORDS} />

          <title>{LOGO}</title>
        </Head>

        <Layout data={data}>
          <Component {...pageProps} />
        </Layout>

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
      </SSRProvider>
    </>
  )
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
  const { data } = await supabase.from('galleries').select()

  return { ...ctx, data }
}

export default CustomApp
