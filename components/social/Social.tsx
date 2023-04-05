import Image from 'next/image'

import { DATA } from '@kvitkaphoto/constants'

type TSocialItem = {
  target: string
  rel: string
  href: string
  img: string
  alt: string
}

const Social = () => (
  <ul className="social-networks">
    {DATA.socialData.map(
      ({ target, rel, href, img, alt }: TSocialItem, index: number) => (
        <li key={alt + index}>
          <a target={target} rel={rel} href={href}>
            <Image src={`/images/${img}`} width={22} height={25} alt={alt} />
          </a>
        </li>
      )
    )}
  </ul>
)

export default Social
