import Head from 'next/head'

// components
import Photostack from '@kvitkaphoto/components/photostack/Photostack'
import Social from '@kvitkaphoto/components/social/Social'
// constants
import { LOGO } from '@kvitkaphoto/constants'
import Trans from '@kvitkaphoto/translation/en.json'

const Home = () => (
  <>
    <Head>
      <title>{`${Trans.helmet_title_home} | ${LOGO}`}</title>
    </Head>
    <Photostack />
    <Social />
  </>
)

export default Home
