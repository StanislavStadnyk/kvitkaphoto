import { FC } from 'react'
import Nav from 'react-bootstrap/Nav'

import Link from 'next/link'
import { useRouter } from 'next/router'

type TNavLink = {
  href: string
  text: string
}

const NavLink: FC<TNavLink> = ({ href, text }) => {
  const router = useRouter()
  const currentPath = router.asPath

  return (
    <Nav.Link active={currentPath.includes(href)} as={'li'}>
      <Link href={href}>{text}</Link>
    </Nav.Link>
  )
}

export default NavLink
