import React, { FC } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import Image from 'next/image'

// constants
import { STORAGE_URL } from '@kvitkaphoto/constants'
// types
import { TGalleryImage } from '@kvitkaphoto/types'

// styles
import styles from './List.module.css'

type TList = {
  images: TGalleryImage[]
  onRemove: (id: any) => void
}

const List: FC<TList> = ({ images, onRemove }) => (
  <div className={styles.wrapper}>
    <div className={styles.holder}>
      <Row>
        {images.map(({ id, imgLarge, imgSmall }) => (
          <Col key={id} className="pb-3">
            <div className={styles.col}>
              <Image
                width={150}
                height={150}
                src={`${STORAGE_URL}/${imgLarge.name}`}
                alt=""
              />
              <p>{`${imgLarge.size.width} x ${imgLarge.size.height} - ${imgLarge.name}`}</p>
              <Image
                width={100}
                height={100}
                src={`${STORAGE_URL}/${imgSmall.name}`}
                alt=""
              />
              <p>{`${imgSmall.size.width} x ${imgSmall.size.height} - ${imgSmall.name}`}</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onRemove(id)}
              >
                Remove
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  </div>
)

export default List
