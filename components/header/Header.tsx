import { FC, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

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

const Header: FC<THeader> = ({ galleryDropDown }) => {
  const [isToggled, setToggle] = useState(false)

  const handleToggle = () => setToggle(!isToggled)
  const handleCloseMenu = () => setToggle(false)

  return (
    <Navbar id="header" expand="md" expanded={isToggled}>
      <Container>
        <div className="navbar-header">
          <Link
            className="navbar-brand"
            href={ROUTES.HOME}
            onClick={handleCloseMenu}
          >
            <Image src={logo} alt={LOGO} width="45" height="45" />
            {LOGO}
          </Link>
          <Navbar.Toggle
            aria-controls="Toggle navigation"
            aria-expanded="false"
            onClick={handleToggle}
          />
        </div>

        <Navbar.Collapse>
          <NavMain
            galleryDropDown={galleryDropDown}
            handleCloseMenu={handleCloseMenu}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
