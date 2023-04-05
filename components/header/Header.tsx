import { FC } from 'react';
import { Container, Navbar } from 'react-bootstrap';

import Image from 'next/image';
import Link from 'next/link';

import NavMain from '@kvitkaphoto/components/header/nav-main/NavMain';
import { LOGO, ROUTES } from '@kvitkaphoto/constants';
import logo from '@kvitkaphoto/public/images/logo.png';
import { THeader } from '@kvitkaphoto/types';

const Header: FC<THeader> = ({ galleryDropDown }) => (
  <Navbar id="header" expand="md">
    <Container>
      <div className="navbar-header">
        <Link className="navbar-brand" href={ROUTES.HOME}>
          <Image src={logo} alt={LOGO} width="45" height="43" />
          {LOGO}
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>

      <Navbar.Collapse>
        <NavMain galleryDropDown={galleryDropDown} />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
