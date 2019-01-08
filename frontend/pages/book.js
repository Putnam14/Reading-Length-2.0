import React from 'react'
import BookPage from '../components/BookPage'

class Book extends React.Component {
  static getInitialProps({ query: { isbn } }) {
    return { isbn }
  }

  render() {
    const { isbn } = this.props
    return <BookPage isbn={isbn} />
  }
}

export default Book
