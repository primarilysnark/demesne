import styles from '../styles/styles.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className={`${styles.navbar} ${styles['is-black']}`} role="navigation" aria-label="main navigation">
        <div className={styles['navbar-brand']}>
          <a className={styles['navbar-item']} href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>

          <a role="button" className={styles['navbar-burger'] + ' ' + styles['burger']} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
