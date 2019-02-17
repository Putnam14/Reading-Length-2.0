import React from 'react'
import BookPage from '../components/BookPage'

class Book extends React.Component {
  static getInitialProps({ query: { isbn } }) {
    return { isbn }
  }

  render() {
    const { isbn, bot } = this.props
    return <BookPage isbn={isbn} bot={bot} />
  }
}

export default Book
