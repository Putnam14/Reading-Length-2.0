import React from 'react'
import RelatedBook from './RelatedBook'
import ValidISBN from '../lib/isbnValidator'
import RelatedBooksStyles from './styles/RelatedBooksStyles'

class RelatedBooks extends React.Component {
  render() {
    const { relatedBooks } = this.props
    return (
      <RelatedBooksStyles>
        <h3>You might also like</h3>
        <div className="related-container">
          {relatedBooks.map(isbn => {
            if (ValidISBN(isbn)) return <RelatedBook isbn={isbn} key={isbn} />
          })}
        </div>
      </RelatedBooksStyles>
    )
  }
}

export default RelatedBooks
