import React, { Component } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Header from './Header'
import Meta from './Meta'
import Footer from './Footer'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

theme.lightgrey = theme.lightGrey

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 50px);
  display: grid;
  grid-template-rows: 1fr auto;
`

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    font-size: 10px;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 1.5rem;
    line-height: 2;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  hr {
    border: 0;
    border-top: 1px solid #eee;
    margin: 1.5rem;
  }
  a {
    text-decoration: none;
    color: #337ab7;
    :hover {
      text-decoration: underline;
    }
  }
  .sr-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`

class Page extends Component {
  render() {
    const { children } = this.props
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <Meta />
          <Header />
          <Inner>
            <div>{children}</div>
            <Footer />
          </Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page
