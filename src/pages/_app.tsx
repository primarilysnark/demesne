import { AppProps } from 'next/app'
import '../styles/styles.scss'
import '../styles/app.scss'
import '../../node_modules/@fortawesome/fontawesome-pro/css/all.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className="app-logo">
        <i className="app-logo__icon fas fa-dice-d20" />
        Demesne
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
