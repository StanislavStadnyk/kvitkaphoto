import { toast } from 'react-toastify'

import { nanoid } from 'nanoid'

import { API } from '@kvitkaphoto/constants'
import supabase from '@kvitkaphoto/supabase.config'
import { TGallery } from '@kvitkaphoto/types'

type TImages = {
  blob: string
  file: string
  size: Object
}

export const uploadImages = async ({
  event,
  images,
  setUploading,
  onUpload
}: {
  event: any
  images: TImages[]
  setUploading: (e: boolean) => void
  onUpload: (array: TImages[]) => void
}) => {
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

export const addGallery = async (images: any, id: any, title: any) => {
  if (images?.length) {
    return Promise.all(
      images.map(async ({ file, size }: any) => {
        const fileName = file.name
        const filePath = `${fileName}`

        const data = await supabase.storage
          .from('images')
          .upload(filePath, file, { upsert: true })

        toast('Image uploaded', {
          type: 'success'
        })

        console.log('data', data)

        return {
          size,
          volume: file.size,
          name: data.data?.path
        }
      })
    ).then(async data => {
      console.log('Items processed', data)

      const dataSorted = data?.sort((a, b) => a.volume - b.volume)

      console.log('data sorted', dataSorted)

      try {
        const response = await fetch(API.GALLERIES, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
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
          })
        })

        const res = await response.json()
        if (res.error) throw res.error

        console.log('client response', res)

        toast(res.message, {
          type: 'success'
        })
      } catch (error: any) {
        toast(error.message, {
          type: 'error'
        })
      }
    })
  } else {
    try {
      const response = await fetch(API.GALLERIES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          title,
          images: []
        })
      })

      const res = await response.json()
      if (res.error) throw res.error

      toast(res.message, {
        type: 'success'
      })
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
    return Promise.all(
      images.map(async ({ file, size }: any) => {
        const fileName = file.name
        const filePath = `${fileName}`

        const data = await supabase.storage
          .from('images')
          .upload(filePath, file, { upsert: true })

        toast('Image uploaded', {
          type: 'success'
        })

        console.log('data', data)

        return {
          size,
          volume: file.size,
          name: data.data?.path
        }
      })
    ).then(async data => {
      console.log('Items processed', data)

      const updatedImages = [
        ...selectedGallery.images,
        {
          id: nanoid(),
          imgSmall: {
            name: data[0].name,
            size: data[0].size
          },
          imgLarge: {
            name: data[1].name,
            size: data[1].size
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
    })
  } else {
    try {
      const response = await supabase
        .from('galleries')
        .update({
          id: id,
          title: title
        })
        .eq('id', selectedGallery.id)

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
