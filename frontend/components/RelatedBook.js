import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import Error from './ErrorMessage'
import RelatedBookStyles from './styles/RelatedBookStyles'

const RELATED_BOOK_QUERY = gql`
  query RELATED_BOOK_QUERY($isbn: String!) {
    bookPreview(where: { isbn10: $isbn }) {
      name
      image
    }
  }
`

class RelatedBook extends React.Component {
  render() {
    const { isbn } = this.props
    return (
      <Query query={RELATED_BOOK_QUERY} variables={{ isbn }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          if (!data.bookPreview) return <p>No item found for this</p>
          const { bookPreview } = data
          // Wordcount Query
          return (
            <RelatedBookStyles key={isbn}>
              {bookPreview.image && (
                <img src={bookPreview.image} alt={bookPreview.name} />
              )}
              <p className="related-link">
                View{' '}
                <span className="related-name">
                  <Link href={`/book/isbn-${isbn}`}>
                    <a>{bookPreview.name}</a>
                  </Link>
                </span>{' '}
                on Reading Length
              </p>
              <p className="amazon-link">
                Look on{' '}
                <a
                  href={`https://www.amazon.com/dp/${isbn}?tag=${
                    process.env.AMAZON_AFF
                  }`}
                >
                  Amazon
                </a>
              </p>
            </RelatedBookStyles>
          )
        }}
      </Query>
    )
  }
}

export default RelatedBook
