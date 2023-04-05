import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Head from 'next/head'
import Image from 'next/image'

// constants
import { LOGO } from '@kvitkaphoto/constants'
import Trans from '@kvitkaphoto/translation/en.json'

const About: FC = () => (
  <>
    <Head>
      <title>{`${Trans.helmet_title_about} | ${LOGO}`}</title>
    </Head>

    <Container as="section" className="about-page">
      <h1>{Trans.about_title}</h1>
      <Row>
        <Col sm={6} md={6} className="holder">
          {Trans.about_content.map((item: { text: string }, i: number) => (
            <p key={i}>{item.text}</p>
          ))}
        </Col>

        <Col sm={6} md={6}>
          <Image
            fill
            src="/images/about.jpg"
            sizes="(max-width: 576px) 100vw, 50vw"
            priority
            alt={Trans.about_alt}
          />
        </Col>
      </Row>
    </Container>
  </>
)

export default About
