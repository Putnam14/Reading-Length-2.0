import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Error from './ErrorMessage'

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
            <div>
              <img src={bookPreview.image} alt={bookPreview.name} />
              <p>{bookPreview.name}</p>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default RelatedBook
