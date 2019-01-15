import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Error from './ErrorMessage'

const WORDCOUNT_QUERY = gql`
  query WORDCOUNT_QUERY($isbn: String!) {
    wordCounts(where: { isbn10: $isbn }) {
      wordCount
      countAccuracy
      countType
    }
  }
`

class WordCount extends React.Component {
  render() {
    const { isbn } = this.props
    return (
      <Query query={WORDCOUNT_QUERY} variables={{ isbn }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          if (!data.wordCounts) return <p>No item found for this</p>
          const { wordCounts } = data
          // TODO: Need to aggregate the word counts somehow before the return
          return (
            <div>
              {Object.keys(wordCounts).map(val => (
                <p>{wordCounts[val].wordCount} words</p>
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default WordCount
