import { FC, ReactElement } from 'react'

import { useRouter } from 'next/router'

// components
import Header from '@kvitkaphoto/components/header/Header'
// constants
import { DARK_SEO, ROUTES } from '@kvitkaphoto/constants'
// types
import { TDropDownItem, TGallery } from '@kvitkaphoto/types'

type Props = {
  children: ReactElement
  data: TGallery[]
}

const Layout: FC<Props> = ({ children, data }) => {
  const galleryDropDown = data?.map(
    ({ id, title }: TGallery): TDropDownItem => {
      return {
        link: `${ROUTES.GALLERIES}/${id}`,
        text: title
      }
    }
  )

  const router = useRouter()
  const clsMain =
    router.pathname === ROUTES.HOME || router.pathname === ROUTES.ADMIN
      ? 'index-page'
      : 'main'

  return (
    <>
      <Header galleryDropDown={galleryDropDown} />
      <main className={clsMain}>{children}</main>

      <div className="dark-seo">{DARK_SEO}</div>
    </>
  )
}

export default Layout
