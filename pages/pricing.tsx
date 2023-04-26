import React from 'react'
import { Col, Container, OverlayTrigger, Popover, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import Head from 'next/head'

// constants
import { DATA, LOGO } from '@kvitkaphoto/constants'
import Trans from '@kvitkaphoto/translation/en.json'
// types
import { EPlacement } from '@kvitkaphoto/types'

type TPricingItem = {
  title: string
  subtitle: string
  price: string
  description: string
  popoverPlacement: EPlacement
}

const Pricing = () => (
  <>
    <Head>
      <title>{`${Trans.helmet_title_pricing} | ${LOGO}`}</title>
    </Head>

    <Container className="pricing-page">
      <Row>
        {DATA.pricingData.map((item: TPricingItem, i: number) => {
          const isCustom = item.price.includes('Custom')
          const customCls = isCustom ? 'custom' : ''
          const btnVariant = isCustom ? 'danger' : 'primary'

          return (
            <Col sm={12} md={4} key={item.title + i}>
              <div className="pricing-box">
                <div className="holder">
                  <h2 className={customCls}>{item.title}</h2>
                  <h3>{item.subtitle}</h3>
                  <strong className="price">{item.price}</strong>

                  <OverlayTrigger
                    trigger="click"
                    placement={item.popoverPlacement}
                    rootClose
                    overlay={
                      <Popover id={`popover-${i}`} className={customCls}>
                        <Popover.Header as="h3">{item.title}</Popover.Header>
                        <Popover.Body>{item.description}</Popover.Body>
                      </Popover>
                    }
                    defaultShow={false}
                  >
                    <Button variant={btnVariant} className="btn-info-price">
                      {Trans.btn_more}
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    </Container>
  </>
)

export default Pricing
