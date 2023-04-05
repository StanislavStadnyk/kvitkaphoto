import React, { FC } from 'react'

import Image from 'next/image'

import { STORAGE_URL } from '@kvitkaphoto/constants'
import { TGalleryImage } from '@kvitkaphoto/types'

type TList = {
  images: TGalleryImage[]
}

const List: FC<TList> = ({ images }) => {
  return (
    <ul className="list-unstyled">
      {images.map(image => {
        return (
          <li key={image.id} className="pb-3 m-2 d-flex flex-column">
            <Image
              width={150}
              height={150}
              src={`${STORAGE_URL}/${image.imgLarge.name}`}
              alt=""
            />
            <Image
              width={100}
              height={100}
              src={`${STORAGE_URL}/${image.imgSmall.name}`}
              alt=""
            />
            <button
              className="sm"
              type="button"
              onClick={() => console.log('test')}
            >
              Remove
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default List
