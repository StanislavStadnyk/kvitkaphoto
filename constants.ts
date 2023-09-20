import Trans from '@kvitkaphoto/translation/en.json'
import { EPlacement } from '@kvitkaphoto/types'

export const LOGO = 'Kvitkaphoto.com.au'

const EMAIL = 'kvitkaphoto@gmail.com'

export const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images`
export const DEV_URL = 'http://localhost:3000'
export const PROD_URL = 'https://www.kvitkaphoto.com.au'
// export const PROD_URL = 'https://master.d1e26u4olsdmdy.amplifyapp.com'
// export const PROD_URL = 'http://localhost:3000'
export const SITE_URL =
  process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL

export const KVITKAPHOTO_ACCESS_TOKEN = 'kvitkaphoto-access-token'
export const KVITKAPHOTO_REFRESH_TOKEN = 'kvitkaphoto-refresh-token'

export const META_DESCRIPTION =
  'The site for ordering photo sessions is KvitkaPhoto by Maryna Stadnyk. All types of photography (wedding, street, studio, club, events) in Melbourne, Photo sessions in Melbourne, photography in Melbourne, wedding photographer for a wedding in Melbourne, services of a photographer and wedding photo from Melbourne photographers, photography, shooting Melbourne, family photo sessions Melbourne.'
export const META_KEYWORDS =
  'Melbourne photo, photographer Melbourne, photo Melbourne, wedding photographer Melbourne, Melbourne photographers, Melbourne photo shoot, Melbourne photo studio, Melbourne wedding photographer, Melbourne photo shoot, Melbourne street photo shoot, Melbourne club photo shoot, Melbourne wedding photo shoot, Melbourne studio photo shoot, studio photography, Kvitka Photo Melbourne, photo ticket, photo gallery, KvitkaPhoto, gift certificate for a photo shoot, gift certificate photo session, gift certificate photo session Melbourne, gift certificate for photography Melbourne, family photography, family photo session Melbourne'

export const API = {
  LOGIN: '/api/login',
  GALLERIES: '/api/galleries'
}

export const LG_KEY = '97CD1814-A3CD45CC-BC206BF9-323740E0'

export const ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  GALLERIES: '/galleries',
  ABOUT: '/about',
  CONTACTS: '/contacts',
  GALLERY_STREET: '/street',
  LOGIN: '/login',
  ADMIN: '/admin'
}

export const photoStackConfig = [
  {
    link: `${ROUTES.GALLERIES}/wedding`,
    src: '/images/polaroid/5.jpg',
    alt: 'wedding img'
  },
  {
    link: `${ROUTES.GALLERIES}/studio`,
    src: '/images/polaroid/2.jpg',
    alt: 'studio img'
  },
  {
    link: `${ROUTES.GALLERIES}/street`,
    src: '/images/polaroid/3.jpg',
    alt: 'street img'
  },
  {
    link: `${ROUTES.GALLERIES}/street`,
    src: '/images/polaroid/10.jpg',
    alt: 'street img'
  },
  {
    link: `${ROUTES.GALLERIES}/street`,
    src: '/images/polaroid/4.jpg',
    alt: 'street img'
  },
  {
    link: `${ROUTES.GALLERIES}/studio`,
    src: '/images/polaroid/6.jpg',
    alt: 'studio img'
  },
  {
    link: `${ROUTES.GALLERIES}/studio`,
    src: '/images/polaroid/7.jpg',
    alt: 'studio img'
  },
  {
    link: `${ROUTES.GALLERIES}/wedding`,
    src: '/images/polaroid/8.jpg',
    alt: 'wedding img'
  },
  {
    link: `${ROUTES.GALLERIES}/wedding`,
    src: '/images/polaroid/9.jpg',
    alt: 'wedding img'
  },
  {
    link: `${ROUTES.GALLERIES}/studio`,
    src: '/images/polaroid/1.jpg',
    alt: 'studio img'
  },
  {
    link: `${ROUTES.GALLERIES}/wedding`,
    src: '/images/polaroid/11.jpg',
    alt: 'wedding img'
  },
  {
    link: `${ROUTES.GALLERIES}/wedding`,
    src: '/images/polaroid/12.jpg',
    alt: 'wedding img'
  },
  {
    link: `${ROUTES.GALLERIES}/wedding`,
    src: '/images/polaroid/13.jpg',
    alt: 'wedding img'
  },
  {
    link: `${ROUTES.GALLERIES}/wedding`,
    src: '/images/polaroid/14.jpg',
    alt: 'wedding img'
  },
  {
    link: `${ROUTES.GALLERIES}/studio`,
    src: '/images/polaroid/15.jpg',
    alt: 'studio img'
  },
  {
    link: `${ROUTES.GALLERIES}/studio`,
    src: '/images/polaroid/16.jpg',
    alt: 'studio img'
  }
]

export const DARK_SEO = `Site for ordering photo sessions shoots ${LOGO} by Maryna Stadnyk. All
        types of photography (wedding, street, studio, corporate) in Melbourne,
        Professional photo session Melbourne, photo session Melbourne,
        photography in Melbourne, wedding photographer for a wedding Melbourne,
        photography services and wedding photography, shooting Melbourne.
        Melbourne photo, photographer Melbourne, photo Melbourne, wedding
        photographer Melbourne, photographers Melbourne, Melbourne photo shoot,
        Melbourne photography studio, photoshoot Melbourne, street photoshoot
        Melbourne, club photoshoot Melbourne, wedding photoshoot Melbourne,
        studio photoshoot Melbourne, studio shooting, KvitkaPhoto Melbourne,
        kvitka photo, photo gallery, KvitkaPhoto, ${LOGO}, gift certificate for a
        photo session, photo session gift certificate, photo session gift
        certificate Melbourne Photography Gift Voucher Melbourne, family photo
        session, family shooting, children photo session, children shooting`

export const DATA = {
  contactsData: [
    {
      text: 'email',
      href: `mailto:${EMAIL}`,
      linkText: EMAIL,
      target: '',
      rel: ''
    },
    {
      text: 'tel',
      href: 'tel:0403965905',
      linkText: '0403965905',
      target: '',
      rel: ''
    },
    {
      text: 'location',
      href: 'https://www.google.com/maps/place/Melbourne+VIC/@-37.9712368,144.4926449,9z/data=!3m1!4b1!4m6!3m5!1s0x6ad646b5d2ba4df7:0x4045675218ccd90!8m2!3d-37.8136276!4d144.9630576!16zL20vMGNoZ3pt',
      linkText: 'Melbourne',
      target: '_blank',
      rel: 'noreferrer'
    }
  ],
  socialData: [
    {
      href: 'https://www.instagram.com/kvitkaphoto/',
      target: '_blank',
      rel: 'noreferrer',
      img: 'instagram.svg',
      alt: 'Instagram'
    },
    {
      href: `mailto:${EMAIL}`,
      target: '',
      rel: '',
      img: 'email.svg',
      alt: 'Email'
    }
  ],
  pricingData: [
    {
      title: Trans.pricing_wedding_title,
      subtitle: Trans.pricing_wedding_subtitle,
      price: Trans.pricing_wedding_price,
      description: Trans.pricing_wedding_description,
      popoverPlacement: EPlacement.BOTTOM
    },
    {
      title: Trans.pricing_wedding_ecomomy_title,
      subtitle: Trans.pricing_wedding_ecomomy_subtitle,
      price: Trans.pricing_wedding_economy_price,
      description: Trans.pricing_wedding_economy_description,
      popoverPlacement: EPlacement.BOTTOM
    },
    {
      title: Trans.pricing_street_title,
      subtitle: Trans.pricing_street_subtitle,
      price: Trans.pricing_street_price,
      description: Trans.pricing_street_description,
      popoverPlacement: EPlacement.BOTTOM
    },
    {
      title: Trans.pricing_studio_title,
      subtitle: Trans.pricing_studio_subtitle,
      price: Trans.pricing_studio_price,
      description: Trans.pricing_studio_description,
      popoverPlacement: EPlacement.TOP
    },
    {
      title: Trans.pricing_event_title,
      subtitle: Trans.pricing_event_subtitle,
      price: Trans.pricing_event_price,
      description: Trans.pricing_event_description,
      popoverPlacement: EPlacement.TOP
    },
    {
      title: Trans.pricing_gift_title,
      subtitle: Trans.pricing_gift_subtitle,
      price: Trans.pricing_gift_price,
      description: Trans.pricing_gift_description,
      popoverPlacement: EPlacement.TOP
    }
  ]
}
