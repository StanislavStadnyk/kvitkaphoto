import { toast } from 'react-toastify'

import Router from 'next/router'

import { nanoid } from 'nanoid'

// constants
import { API } from '@kvitkaphoto/constants'
// config
import supabase from '@kvitkaphoto/supabase.config'
// types
import {
  TGallery,
  TImage,
  TUploadImage,
  TUploadImageSet
} from '@kvitkaphoto/types'

type TUploadImages = {
  event: any
  images: TUploadImage[]
  setUploading: (e: boolean) => void
  onUpload: (array: TUploadImage[]) => void
}

export const uploadImages = async ({
  event,
  images,
  setUploading,
  onUpload
}: TUploadImages) => {
  try {
    setUploading(true)

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = event.target.files[0]
    const blob = URL.createObjectURL(file)
    const img = new Image()

    img.src = blob
    img.onload = function () {
      const fileObj = {
        blob,
        file,
        size: {
          width: img.width,
          height: img.height
        }
      }

      onUpload([...images, fileObj])
    }
  } catch (error: any) {
    toast(error, {
      type: 'error'
    })
  } finally {
    setUploading(false)
  }
}

const uploadImagePromises = (id: string, images: any) =>
  images.map(async ({ file, size }: any) => {
    const fileName = file.name
    const filePath = `${id}-${fileName}`

    const data = await supabase.storage
      .from('images')
      .upload(filePath, file, { upsert: true })

    toast('Image uploaded', {
      type: 'success'
    })

    return {
      size,
      volume: file.size,
      name: data.data?.path
    }
  })

const sortImages = (data: TImage[]): TImage[] =>
  // @ts-ignore
  data.sort((a, b) => a.volume - b.volume)

const postGalleryRequest = async (body: TGallery) => {
  const response = await fetch(API.GALLERIES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const res = await response.json()
  if (res.error) throw res.error

  toast(res.message, {
    type: 'success'
  })
}

export const addGallery = async ({ id, images, title }: TUploadImageSet) => {
  if (images?.length) {
    return Promise.all(uploadImagePromises(id, images)).then(
      async (data: TImage[]) => {
        const dataSorted = sortImages(data)
        const body = {
          id,
          title,
          images: [
            {
              id: nanoid(),
              imgSmall: {
                name: dataSorted[0].name,
                size: dataSorted[0].size
              },
              imgLarge: {
                name: dataSorted[1].name,
                size: dataSorted[1].size
              }
            }
          ]
        }

        try {
          await postGalleryRequest(body)

          Router.reload() // refresh the page after creating
        } catch (error: any) {
          toast(error.message, {
            type: 'error'
          })
        }
      }
    )
  } else {
    try {
      const body = {
        id,
        title,
        images: []
      }

      await postGalleryRequest(body)
    } catch (error: any) {
      toast(error.message, {
        type: 'error'
      })
    }
  }
}

export const updateGallery = async ({
  selectedGallery,
  images,
  id,
  title,
  dataMain,
  updateDataOnSuccess
}: any) => {
  console.log('update gallery')
  console.log('images', images)
  console.log('selectedGallery', selectedGallery)

  if (images?.length) {
    return Promise.all(uploadImagePromises(selectedGallery.id, images)).then(
      async data => {
        console.log('Items processed', data)

        const dataSorted = data.sort((a, b) => a.volume - b.volume)

        const updatedImages = [
          ...selectedGallery.images,
          {
            id: nanoid(),
            imgSmall: {
              name: dataSorted[0].name,
              size: dataSorted[0].size
            },
            imgLarge: {
              name: dataSorted[1].name,
              size: dataSorted[1].size
            }
          }
        ]

        try {
          const response = await supabase
            .from('galleries')
            .update({
              id,
              title,
              images: updatedImages
            })
            .eq('id', selectedGallery.id)

          console.log('response result', response)

          const updatedDataMain = dataMain.map((item: TGallery) => {
            if (item.id === selectedGallery.id) {
              return {
                ...item,
                id,
                title,
                images: updatedImages
              }
            }

            return item
          })

          updateDataOnSuccess(updatedDataMain, {
            ...selectedGallery,
            id,
            title,
            images: updatedImages
          })
        } catch (e) {}
      }
    )
  } else {
    try {
      const response = await supabase
        .from('galleries')
        .update({
          id: id,
          title: title,
          images: selectedGallery.images
        })
        .eq('id', selectedGallery.id)

      toast('Gallery has been updated!', {
        type: 'success'
      })

      console.log('response result no images', response)

      const updatedDataMain = dataMain.map((item: TGallery) => {
        if (item.id === selectedGallery.id) {
          return {
            ...item,
            id,
            title
          }
        }

        return item
      })

      updateDataOnSuccess(updatedDataMain, { ...selectedGallery, id, title })
    } catch (e) {}
  }
}
