import Link from 'next/link'
import '../styles/styles.scss'
import '../node_modules/@fortawesome/fontawesome-pro/css/all.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <i className="fas fa-dungeon" />
              Hex Map Explorer
            </a>
          </Link>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/clip-path">
              <a className="navbar-item">
                Clip Path Test
              </a>
            </Link>

            <Link href="/mixed-tiles">
              <a className="navbar-item">
                Mixed Tiles Test
              </a>
            </Link>

            <Link href="/tile-map">
              <a className="navbar-item">
                Tile Map Test
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
