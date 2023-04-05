import { FC, ReactElement } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import styles from './Loader.module.css'

type TLoader = {
  isLoading: boolean
  text?: string
  children: ReactElement | ReactElement[]
}

const Loader: FC<TLoader> = ({ isLoading, text, children }) => (
  <div className={styles.loader}>
    {children}
    {isLoading ? (
      <div className={styles.holder}>
        <div>
          <Spinner animation="border" variant="primary" />
        </div>
        {text && <strong className={styles.text}>{text}</strong>}
      </div>
    ) : null}
  </div>
)

export default Loader
