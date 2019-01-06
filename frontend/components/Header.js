import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import Headroom from 'react-headroom'
import HeaderStyles from './styles/HeaderStyles'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}

const Header = () => (
  <Headroom>
    <HeaderStyles>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <a>Reading Length</a>
          </Link>
        </div>
        <div rel="navigation">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/wpm">
            <a>Tests</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
      </div>
    </HeaderStyles>
  </Headroom>
)

export default Header
