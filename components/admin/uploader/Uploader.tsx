import React, { FC, useState } from 'react'
import Button from 'react-bootstrap/Button'

import Image from 'next/image'

// types
import { TImageSize } from '@kvitkaphoto/types'

// helper
import { uploadImages } from '../helper'
// styles
import styles from './Uploader.module.css'

type TUploader = {
  size: number
  images: string[]
  onUpload: (imgs: any) => void
  onRemove: (imgs: any) => void
}

type TImageBlob = {
  blob: string
  file: {
    lastModified: number
    lastModifiedDate: string
    name: string
    size: number
    type: string
    webkitRelativePath: string
  }
  size: TImageSize
}

const Uploader: FC<TUploader> = ({ size, images, onUpload, onRemove }: any) => {
  const [uploading, setUploading] = useState(false)

  const isDisabled = images.length >= 2 || uploading
  const labelText = uploading ? 'Uploading ...' : 'Upload'

  const handleUploadImages = (event: any) => {
    uploadImages({
      event,
      images,
      setUploading,
      onUpload
    })
  }

  const removeImage = (imageName: any) => {
    const updatedImages = images.filter(
      (image: any) => image.blob !== imageName
    )
    onRemove(updatedImages)
  }

  return (
    <div className="mb-3">
      {images.length > 0 ? (
        <ul className="list-unstyled d-flex">
          {images.map((image: TImageBlob, index: number) => (
            <li
              key={image.blob + index}
              className="pb-3 m-2 d-flex flex-column"
            >
              <Button
                size="sm"
                className="mb-2"
                variant="dark"
                onClick={() => removeImage(image.blob)}
              >
                Remove
              </Button>
              <Image
                src={image.blob}
                alt="Photo"
                className={`${styles.image} ${styles.photo}`}
                width={size}
                height={size}
              />
              {image.size && image.file && (
                <p>{`${image.size.width} x ${image.size.height} - ${image.file.name}`}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={`${styles.photo} ${styles.noImage}`}
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <label className="btn btn-success d-block" htmlFor="double">
          {labelText}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute'
          }}
          type="file"
          id="double"
          accept="image/*"
          onChange={handleUploadImages}
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}

export default Uploader
