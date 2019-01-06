import Link from 'next/link'
import styled from 'styled-components'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}

const Header = () => <div>Header goes here</div>

export default Header
