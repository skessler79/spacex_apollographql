import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Selwyn Darryl Kessler'
export const siteTitle = 'SDK Blog'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/bender.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/bender.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/blog">
            <a>← Back to Blog</a>
          </Link>
        </div>
      )}
    </div>
  )
}
