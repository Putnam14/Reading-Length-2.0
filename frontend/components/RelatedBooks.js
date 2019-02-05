import React from 'react'
import RelatedBook from './RelatedBook'
import RelatedBooksStyles from './styles/RelatedBooksStyles'

class RelatedBooks extends React.Component {
  render() {
    const { relatedBooks } = this.props
    return (
      <RelatedBooksStyles>
        <h3>You might also like</h3>
        <div className="related-container">
          {relatedBooks.map(isbn => (
            <RelatedBook isbn={isbn} />
          ))}
        </div>
      </RelatedBooksStyles>
    )
  }
}

export default RelatedBooks
