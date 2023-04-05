import { FC } from 'react'

import Image from 'next/image'

// constants
import { STORAGE_URL } from '@kvitkaphoto/constants'
// types
import { TGalleryImage } from '@kvitkaphoto/types'

type TGalleryItem = {
  item: TGalleryImage
  isPriority: boolean
}

const GalleryItem: FC<TGalleryItem> = ({
  item: { imgLarge, imgSmall },
  isPriority
}) => {
  const alt = imgSmall.name.replace(/\.[^/.]+$/, '')

  return (
    <a
      href={`${STORAGE_URL}/${imgLarge.name}`}
      className="col-xs-6 col-sm-3 col-md-3 col"
    >
      <div className="gallery-item">
        <div className="gallery-item-holder">
          <Image
            alt={alt}
            src={`${STORAGE_URL}/${imgSmall.name}`}
            width={300}
            height={300}
            priority={isPriority}
          />
        </div>
      </div>
    </a>
  )
}

export default GalleryItem
