import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import Search from './Search'
import BookStyles from './styles/BookStyles'
import Inner from './Inner'
import RelatedBook from './RelatedBook'
import WordCountInfo from './WordCountInfo'

const BOOK_FROM_ISBN_QUERY = gql`
  query BOOK_FROM_ISBN_QUERY($isbn: String!) {
    findBook(isbn10: $isbn) {
      isbn10
      isbn13
      name
      author
      image
      description
      pageCount
      related
    }
  }
`

const WORDCOUNT_QUERY = gql`
  query WORDCOUNT_QUERY($isbn: String!) {
    wordCounts(where: { isbn10: $isbn }) {
      wordCount
      countAccuracy
      countType
    }
  }
`

class BookPage extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {
        wpm: 250,
        results: {
          hours: 0,
          minutes: 0,
        },
      },
    }
  }

  safelySetState = (toUpdate, val) => {
    this.setState(prevState => {
      const newState = { ...prevState }
      newState[toUpdate] = val
      return newState
    })
  }

  render() {
    const { isbn } = this.props
    return (
      <Query query={BOOK_FROM_ISBN_QUERY} variables={{ isbn }}>
        {({ error: errorOne, loading: loadingOne, data: dataOne }) => (
          <Query query={WORDCOUNT_QUERY} variables={{ isbn }}>
            {({ error: errorTwo, loading: loadingTwo, data: dataTwo }) => {
              if (errorOne || errorTwo) return <Error error={errorTwo} />
              if (loadingOne || loadingTwo) return <p>Loading...</p>
              const book = dataOne.findBook
              book.isbn = book.isbn10
              const wordcountData = dataTwo.wordCounts[0]
              const wordcount = wordcountData
                ? wordcountData.wordCount
                : book.pageCount * 250
              const { user } = this.state
              return (
                <BookStyles>
                  <Search />
                  <div className="above-the-fold">
                    <div className="container">
                      <div className="book-cover">
                        <img src={book.image} alt={book.name} />
                      </div>
                      <div className="reading-info">
                        <WordCountInfo
                          user={user}
                          book={book}
                          wordCount={wordcount}
                          safelySetState={this.safelySetState}
                        />
                      </div>
                    </div>
                  </div>
                  <Inner>
                    <div className="book-info">
                      <div className="attribution">
                        <div>
                          <strong>Author</strong>
                          <p>{book.author}</p>
                        </div>
                        <div>
                          <strong>Price</strong>
                          <p>Amazon: $15.99</p>
                          <p>Powell's: $12.99</p>
                        </div>
                        <div>
                          <strong>Word Count</strong>
                          <p>{wordcount} words</p>
                        </div>
                        <div>
                          <strong>Pages</strong>
                          <p>{book.pageCount} pages</p>
                        </div>
                      </div>
                      <div className="description">
                        <div className="desc-text">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: book.description,
                            }}
                          />
                        </div>
                        <div className="amazon-link">
                          <a
                            href={`https://www.amazon.com/dp/${
                              book.isbn
                            }?tag=readleng-20`}
                          >
                            View more on Amazon
                          </a>
                        </div>
                      </div>
                    </div>
                    {book.related && (
                      <div className="related-titles">
                        <h3>You might also like</h3>
                        {book.related.map(val => (
                          <RelatedBook isbn={val} />
                        ))}
                      </div>
                    )}
                  </Inner>
                </BookStyles>
              )
            }}
          </Query>
        )}
      </Query>
    )
  }
}

export default BookPage
