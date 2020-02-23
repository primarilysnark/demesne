import { AppProps } from 'next/app'
import Link from 'next/link'
import '../styles/styles.scss'
import '../styles/app.scss'
import '../../node_modules/@fortawesome/fontawesome-pro/css/all.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className="app-nav">
        <Link href="/">
          <a className="app-nav__brand">
            <i className="app-nav__brand-icon fas fa-dice-d20" />
            Demesne
          </a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
