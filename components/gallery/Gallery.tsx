import { FC } from 'react'

import 'lightgallery/css/lg-autoplay.css'
import 'lightgallery/css/lg-fullscreen.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lightgallery.css'
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgFullscreen from 'lightgallery/plugins/fullscreen'
import lgZoom from 'lightgallery/plugins/zoom'
import LightGallery from 'lightgallery/react'

// components
import GalleryItem from '@kvitkaphoto/components/gallery/gallery-item/GalleryItem'
import { LG_KEY } from '@kvitkaphoto/constants'
// types
import { TGalleryImage } from '@kvitkaphoto/types'

type TGalleryComponent = {
  images: TGalleryImage[]
}

const GalleryComponent: FC<TGalleryComponent> = ({ images }) => (
  <>
    {images.length > 0 ? (
      <LightGallery
        speed={500}
        plugins={[lgZoom, lgFullscreen, lgAutoplay]}
        download={false}
        licenseKey={LG_KEY}
        elementClassNames="row"
      >
        {images.map((item: any, index: number) => {
          const isPriority = index < 8

          return (
            <GalleryItem
              item={item}
              isPriority={isPriority}
              key={item.id + item.src}
            />
          )
        })}
      </LightGallery>
    ) : (
      <p className="text-center">There are not images in this category yet!</p>
    )}
  </>
)

export default GalleryComponent
