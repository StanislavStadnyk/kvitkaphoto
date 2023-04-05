import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { uploadImages } from '../helper'

export default function Uploader({
  url,
  size,
  onUpload,
  images,
  onRemove
}: any) {
  const [avatarUrl, setAvatarUrl] = useState<any>(null)
  const [uploading, setUploading] = useState(false)
  const [isDisabledUpload, setDisableUpload] = useState(false)

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
    <div>
      {images.length > 0 ? (
        <ul className="list-unstyled d-flex">
          {images.map((image: any, index: number) => {
            console.log('image', image)

            return (
              <li
                key={image.blob + index}
                className="pb-3 m-2 d-flex flex-column"
              >
                <button
                  className="sm"
                  type="button"
                  onClick={() => removeImage(image.blob)}
                >
                  Remove
                </button>
                <img
                  src={image.blob}
                  alt="Avatar"
                  className="avatar image"
                  width={size}
                  height={size}
                />
                {image.size && (
                  <span>{image.size.width + 'x' + image.size.height}</span>
                )}
              </li>
            )
          })}
        </ul>
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute'
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={handleUploadImages}
          disabled={images.length >= 2 || uploading}
        />
      </div>
    </div>
  )
}
