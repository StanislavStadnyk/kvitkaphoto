export type TGallery = {
  id: string
  title: string
  images: TGalleryImage[]
}

export type TGalleryImage = {
  id: string
  imgSmall: TImage
  imgLarge: TImage
}

export type TUploadImageSet = {
  id: string
  title: string
  images: any
}

export type TUploadImage = {
  blob: string
  file: Object
  size: TImageSize
}

export type TImage = {
  name: string
  size: TImageSize
  volume?: number
}

export type TImageSize = {
  width: number
  height: number
}

export type TDropDownItem = {
  link: string
  text: string
}

export type THeader = {
  galleryDropDown: TDropDownItem[] | null
}

export type TContactsItem = {
  text: string
  href: string
  linkText: string
  target: string
}

export enum EPlacement {
  TOP = 'top',
  BOTTOM = 'bottom'
}
