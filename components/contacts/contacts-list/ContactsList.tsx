import { FC } from 'react'

import { TContactsItem } from '@kvitkaphoto/types'

type TContactsList = {
  data: TContactsItem[]
}

const ContactsList: FC<TContactsList> = ({ data }) => (
  <ul className="contacts-list">
    {data.map(
      ({ text, href, linkText, target, rel }: TContactsItem, i: number) => (
        <li key={text + i}>
          {text}:{' '}
          <a href={href} target={target} rel={rel}>
            {linkText}
          </a>
          <br />
        </li>
      )
    )}
  </ul>
)

export default ContactsList
