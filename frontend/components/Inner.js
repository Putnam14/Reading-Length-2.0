import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'

const InnerStyles = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-rows: 1fr auto;
`
class Inner extends React.Component {
  render() {
    const { children } = this.props
    return (
      <InnerStyles>
        <div>{children}</div>
        <Footer />
      </InnerStyles>
    )
  }
}

export default Inner
