import { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

// constants
import { photoStackConfig } from '@kvitkaphoto/constants'
// helpers
import { initPhotostack } from '@kvitkaphoto/helpers'

type TPhotoStackItem = {
  alt: string
  link: string
  src: string
}

const Photostack = () => {
  useEffect(() => {
    initPhotostack()
  }, [])

  return (
    <section id="photostack-3" className="photostack">
      <div>
        {photoStackConfig.map(
          ({ src, link, alt }: TPhotoStackItem, index: number) => (
            <figure key={src + index}>
              <Link href={link} className="photostack-img">
                <Image
                  fill
                  src={src}
                  alt={alt}
                  sizes="(max-width: 576px) 280px, 430px"
                />
              </Link>
            </figure>
          )
        )}
      </div>
    </section>
  )
}

export default Photostack
