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
  data: any
}

const Layout: FC<Props> = ({ children, data }) => {
  // get data for gallery dropdown
  const galleryDropDown = data?.map((item: TGallery): TDropDownItem => {
    return {
      link: `${ROUTES.GALLERIES}/${item.id}`,
      text: item.title
    }
  })

  const router = useRouter()
  const clsMain = router.pathname !== ROUTES.HOME ? 'main' : ''

  return (
    <>
      <Header galleryDropDown={galleryDropDown} />
      <main className={clsMain}>{children}</main>

      <div className="dark-seo">{DARK_SEO}</div>
    </>
  )
}

export default Layout
