import React, { FC, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

import FormItems from '@kvitkaphoto/components/admin/form-items/FormItems'
import { addGallery, updateGallery } from '@kvitkaphoto/components/admin/helper'
import List from '@kvitkaphoto/components/admin/list/List'
import Uploader from '@kvitkaphoto/components/admin/uploader/Uploader'
import {
  API,
  KVITKAPHOTO_ACCESS_TOKEN,
  ROUTES,
  SITE_URL
} from '@kvitkaphoto/constants'
import supabase from '@kvitkaphoto/supabase.config'
import { TGallery } from '@kvitkaphoto/types'

type TAdmin = {
  data: TGallery[]
}

const initialGallery = {
  id: '',
  title: '',
  images: []
}

const Admin: FC<TAdmin> = ({ data }) => {
  const [validated, setValidated] = useState(false)
  const [images, setImages] = useState<Array<string>>([])
  const [galleryId, setGalleryId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [selectedGallery, setSelectedGallery] =
    useState<TGallery>(initialGallery)
  const [dataMain, setDataMain] = useState(data)

  const handleIdChange = (e: any) => {
    setGalleryId(e.currentTarget.value)
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const handleSelectGallery = async (e: any) => {
    const selectedValue = e.currentTarget.value
    console.log('handleSelectGallery', selectedValue)
    setSelectedGallery(selectedValue)

    const gallery = dataMain.find(
      (gallery: TGallery) => gallery.id === selectedValue
    )

    if (gallery) {
      setSelectedGallery(gallery)
      setTitle(gallery?.title)
      setGalleryId(gallery.id)
    } else {
      setSelectedGallery(initialGallery)
      setTitle('')
      setGalleryId('')
    }
  }

  const handleUpload = (imgs: any) => {
    setImages(imgs)
  }

  const handleRemove = (imgs: any) => {
    setImages(imgs)
  }

  const updateDataOnSuccess = (data: any, selected: any) => {
    console.log('updateDataOnSuccess', data)
    console.log('updateDataOnSuccess selected', selected)
    setDataMain(data)
    setSelectedGallery(selected)
    setImages([])
  }

  const handleSubmit = (e: any) => {
    const form = e.currentTarget
    e.preventDefault()

    if (form.checkValidity()) {
      selectedGallery.id
        ? updateGallery({
            selectedGallery,
            images,
            id: galleryId,
            title,
            dataMain,
            updateDataOnSuccess
          })
        : addGallery(images, galleryId, title)
    } else {
      setValidated(true)
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Uploader
            size={150}
            images={images}
            onUpload={handleUpload}
            onRemove={handleRemove}
          />

          <FormItems
            data={dataMain}
            formData={{
              id: galleryId,
              title
            }}
            selectedGallery={selectedGallery}
            onSelect={handleSelectGallery}
            onIdChange={handleIdChange}
            onTitleChange={handleTitleChange}
          />
        </Col>

        <Col>
          {selectedGallery?.images?.length ? (
            <List images={selectedGallery.images} />
          ) : null}
        </Col>
      </Row>
    </Form>
  )
}

export default Admin

export async function getServerSideProps({ req }: any) {
  const accessToken = req.cookies[KVITKAPHOTO_ACCESS_TOKEN]
  const { data: user } = await supabase.auth.getUser(accessToken)

  if (user.user) {
    const res = await fetch(`${SITE_URL}${API.GALLERIES}`)
    const data = await res.json()

    return { props: { data } }
  }

  return {
    props: {},
    redirect: { destination: ROUTES.LOGIN, permanent: false }
  }
}
