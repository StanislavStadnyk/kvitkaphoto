import SSRProvider from 'react-bootstrap/SSRProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        <ToastContainer autoClose={2000} />

        {/* Photostack */}
        <Script strategy="beforeInteractive" src="/js/modernizr.min.js" />
        <Script strategy="beforeInteractive" src="/js/classie.js" />
        <Script strategy="beforeInteractive" src="/js/photostack.js" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-RMS1F5M93T"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
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
