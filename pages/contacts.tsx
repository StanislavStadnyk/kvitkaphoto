import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Head from 'next/head'

// components
import ContactsList from '@kvitkaphoto/components/contacts/contacts-list/ContactsList'
import Social from '@kvitkaphoto/components/social/Social'
// constants
import { DATA, LOGO } from '@kvitkaphoto/constants'
import Trans from '@kvitkaphoto/translation/en.json'
// types
import { TContactsItem } from '@kvitkaphoto/types'

type TContacts = {
  contactsData: TContactsItem[]
}

const Contacts: FC<TContacts> = () => (
  <>
    <Head>
      <title>{`${Trans.helmet_title_contacts} | ${LOGO}`}</title>
    </Head>

    <Container as="section" className="contacts-page">
      <h1>{Trans.contacts_title}</h1>
      <Row>
        <Col className="holder">
          <ContactsList data={DATA.contactsData} />
          <Social />
        </Col>
      </Row>
    </Container>
  </>
)

export default Contacts
