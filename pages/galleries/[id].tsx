import { FC, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import Head from 'next/head'
import Image from 'next/image'

// components
import GalleryComponent from '@kvitkaphoto/components/gallery/Gallery'
// constants
import { API, DATA, LOGO, SITE_URL } from '@kvitkaphoto/constants'
// types
import { TGallery } from '@kvitkaphoto/types'

const Gallery: FC<TGallery> = ({ title, images }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)

    return () => window.removeEventListener('scroll', listenToScroll)
  }, [])

  const listenToScroll = () => {
    const heightToHideFrom = 100
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    if (winScroll > heightToHideFrom) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <Head>
        <title>{`${title} | ${LOGO}`}</title>
      </Head>

      <Container as="section" className="gallery-page">
        <div className="d-flex justify-content-center flex-column">
          <h1>{title} photos</h1>
          <a
            href={DATA.socialData[0].href}
            className="btn-instagram"
            rel="noreferrer"
          >
            Check our Instagram
            <br />
            for more photos
          </a>
        </div>

        <GalleryComponent images={images} />
      </Container>

      <Button
        id="go-to-top"
        title="Go to top"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={goToTop}
      >
        <Image src="/images/arrow.svg" width={20} height={20} alt="up" />
      </Button>
    </>
  )
}

export default Gallery

export async function getStaticPaths() {
  const res = await fetch(`${SITE_URL}${API.GALLERIES}`)
  const data = await res.json()

  const paths = data?.map(({ id }: TGallery) => {
    return {
      params: {
        id
      }
    }
  })

  return {
    fallback: 'blocking',
    paths
  }
}

export async function getStaticProps(context: any) {
  const id = context.params.id
  const res = await fetch(`${SITE_URL}${API.GALLERIES}/${id}`)
  const data = await res.json()

  return {
    props: {
      ...data?.[0]
    },
    revalidate: 1
  }
}
