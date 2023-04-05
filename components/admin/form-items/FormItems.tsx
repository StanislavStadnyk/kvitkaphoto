import React, { FC } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { TGallery } from '@kvitkaphoto/types'

type TFormItems = {
  data: TGallery[]
  formData: {
    id: string
    title: string
  }
  selectedGallery: TGallery
  onSelect: (e: any) => void
  onIdChange: (e: any) => void
  onTitleChange: (e: any) => void
}

const FormItems: FC<TFormItems> = ({
  data,
  formData,
  selectedGallery,
  onSelect,
  onIdChange,
  onTitleChange
}) => {
  const btnText = selectedGallery.id ? 'Update' : 'Create'
  const isSelectDisabled = data.length === 0

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Add gallery url/id</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter url/id"
          value={formData?.id}
          onChange={onIdChange}
        />
        <Form.Control.Feedback type="invalid">
          ID is a required field!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select gallery</Form.Label>
        <Form.Select
          aria-label="Select gallery"
          disabled={isSelectDisabled}
          onChange={onSelect}
        >
          <option value="default">Select gallery</option>

          {data.map((option: any) => (
            <option
              key={option.id}
              value={option.id}
              selected={option.id === selectedGallery.id}
            >
              {option.id}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Page title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter title"
          value={formData?.title}
          onChange={onTitleChange}
        />
        <Form.Control.Feedback type="invalid">
          Title is a required field!
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        {btnText}
      </Button>
    </>
  )
}

export default FormItems
