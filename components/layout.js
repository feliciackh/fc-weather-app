import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name = 'Felicia Chong'
export const siteTitle = 'Feel Good Weather'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/images/FC_ProfilePic.png"
          className={utilStyles.borderCircle}
          height={72}
          width={72}
          alt={name}
        />
        <h1 className={utilStyles.heading}>{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

