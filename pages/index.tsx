import dynamic from 'next/dynamic'
import Head from 'next/head'

// components
import Social from '@kvitkaphoto/components/social/Social'
// constants
import { LOGO } from '@kvitkaphoto/constants'
import Trans from '@kvitkaphoto/translation/en.json'

const DynamicPhotostack = dynamic(
  () => import('@kvitkaphoto/components/photostack/Photostack'),
  {
    loading: () => <span className="spinner">Loading...</span>,
    ssr: false
  }
)

const Home = () => (
  <>
    <Head>
      <title>{`${Trans.helmet_title_home} | ${LOGO}`}</title>
    </Head>

    <DynamicPhotostack />
    <Social />
  </>
)

export default Home
