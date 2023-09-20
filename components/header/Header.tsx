import { FC } from 'react'
import { Container, Navbar } from 'react-bootstrap'

import Image from 'next/image'
import Link from 'next/link'

// components
import NavMain from '@kvitkaphoto/components/header/nav-main/NavMain'
// constants
import { LOGO, ROUTES } from '@kvitkaphoto/constants'
// images
import logo from '@kvitkaphoto/public/images/logo.png'
// types
import { THeader } from '@kvitkaphoto/types'

const Header: FC<THeader> = ({ galleryDropDown }) => (
  <Navbar id="header" expand="md">
    <Container>
      <div className="navbar-header">
        <Link className="navbar-brand" href={ROUTES.HOME}>
          <Image src={logo} alt={LOGO} width="45" height="45" />
          {LOGO}
        </Link>
        <Navbar.Toggle
          aria-controls="Toggle navigation"
          aria-expanded="false"
        />
      </div>

      <Navbar.Collapse>
        <NavMain galleryDropDown={galleryDropDown} />
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default Header
