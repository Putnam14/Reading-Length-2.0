import React from 'react'
import Inner from '../components/Inner'
import Search from '../components/Search'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props
    return (
      <Inner>
        <p>
          {statusCode
            ? `An error occurred on server: ${statusCode}`
            : 'An error occurred on client'}
        </p>
        <p>Sorry about that. If you like, you could try another search.</p>
        <Search />
      </Inner>
    )
  }
}

export default Error
