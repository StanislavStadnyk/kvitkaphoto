import React, { FC, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

import Head from 'next/head'

// components
import FormItems from '@kvitkaphoto/components/admin/form-items/FormItems'
import { addGallery, updateGallery } from '@kvitkaphoto/components/admin/helper'
import List from '@kvitkaphoto/components/admin/list/List'
import Uploader from '@kvitkaphoto/components/admin/uploader/Uploader'
// constants
import {
  API,
  KVITKAPHOTO_ACCESS_TOKEN,
  LOGO,
  ROUTES,
  SITE_URL
} from '@kvitkaphoto/constants'
// config
import supabase from '@kvitkaphoto/supabase.config'
import Trans from '@kvitkaphoto/translation/en.json'
// types
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
  const [uploadImages, setImages] = useState<Array<string>>([])
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

  const handleListRemove = (id: string) => {
    const newArra = selectedGallery.images.filter(img => img.id !== id)

    console.log('id', id)
    console.log('images', selectedGallery.images)
    console.log('newArra', newArra)
    console.log('selectedGallery', selectedGallery)
    setSelectedGallery({ ...selectedGallery, images: newArra })
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
            images: uploadImages,
            id: galleryId,
            title,
            dataMain,
            updateDataOnSuccess
          })
        : addGallery({ id: galleryId, images: uploadImages, title })
    } else {
      setValidated(true)
    }
  }

  return (
    <>
      <Head>
        <title>{`${Trans.helmet_title_admin} | ${LOGO}`}</title>
      </Head>

      <Container fluid={true} className="pt-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Uploader
                size={150}
                images={uploadImages}
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

            <Col md={8}>
              {selectedGallery?.images?.length ? (
                <List
                  images={selectedGallery.images}
                  onRemove={handleListRemove}
                />
              ) : null}
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default Admin

export async function getServerSideProps({ req }: any) {
  const accessToken = req.cookies[KVITKAPHOTO_ACCESS_TOKEN]
  const {
    data: { user }
  } = await supabase.auth.getUser(accessToken)

  if (user) {
    const res = await fetch(`${SITE_URL}${API.GALLERIES}`)
    const data = await res.json()

    return { props: { data } }
  }

  return {
    props: {
      data: []
    },
    redirect: { destination: ROUTES.LOGIN, permanent: false }
  }
}
