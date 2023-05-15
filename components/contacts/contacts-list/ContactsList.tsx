import { FC } from 'react'

import { TContactsItem } from '@kvitkaphoto/types'

const ContactsList: FC<TContactsList> = ({ data }) => (
  <ul className="contacts-list">
    {data.map(
      ({ text, href, linkText, target, rel }: TContactsItem, i: number) => {
        const linkTextTransform =
          text === 'email' ? transformHTMLCodeIntoStr(linkText) : linkText

        return (
          <li key={text + i}>
            {text}:{' '}
            <a href={href} target={target} rel={rel}>
              {linkTextTransform}
            </a>
            <br />
          </li>
        )
      }
    )}
  </ul>
)

export default ContactsList

const transformHTMLCodeIntoStr = (htmlCode: string): string =>
  String.fromCharCode(...htmlCode.replace(/&#/g, '').split(';').map(Number))
type TContactsList = {
  data: TContactsItem[]
}
