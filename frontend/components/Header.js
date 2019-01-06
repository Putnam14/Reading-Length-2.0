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

const StyledHeader = styled.div`
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
  .container {
    margin: 0.5em auto;
    width: 80vw;
    max-width: 1170px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: #777;
    :hover {
      color: #5e5e5e;
    }
  }
`

const Logo = styled.div`
  font-size: 2rem;
`

const Nav = styled.nav`
  a {
    padding-right: 1em;
  }
`

const Header = () => (
  <StyledHeader>
    <div className="container">
      <Logo>
        <Link href="/">
          <a>Reading Length</a>
        </Link>
      </Logo>
      <Nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/wpm">
          <a>Tests</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </Nav>
    </div>
  </StyledHeader>
)

export default Header
