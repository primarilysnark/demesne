import { AppProps } from 'next/app'
import Link from 'next/link'
import '../styles/styles.scss'
import '../styles/app.scss'
import '../../node_modules/@fortawesome/fontawesome-pro/css/all.min.css'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div>
      <nav className="app-nav">
        <Link href="/">
          <a className="app-nav__brand">
            <i className="app-nav__brand-icon fas fa-dice-d20" />
            Demesne
          </a>
        </Link>

        {router.pathname.startsWith('/kingdoms') ? (
          <ul className="app-nav__sequence">
            <li className="app-nav__sequence-item">
              <span className="tag is-primary">Upkeep</span>
            </li>
            <li className="app-nav__sequence-item">Edict</li>
            <li className="app-nav__sequence-item">Income</li>
            <li className="app-nav__sequence-item">Event</li>
          </ul>
        ) : null}
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
