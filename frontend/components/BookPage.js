import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Head from 'next/head'
import Error from './ErrorMessage'
import Search from './Search'
import BookStyles from './styles/BookStyles'
import Inner from './Inner'
import RelatedBooks from './RelatedBooks'
import WordCountInfo from './WordCountInfo'
import Prices from './Prices'
import Loading from './Loading'
import validISBN from '../lib/isbnValidator'
import Ad from './Ad'

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
    const { isbn, bot } = this.props
    if (!validISBN(isbn)) {
      return (
        <BookStyles>
          <Search />
          <Inner>
            <p>
              The ISBN given does not appear to be valid. Try another search.
            </p>
          </Inner>
        </BookStyles>
      )
    }
    return (
      <Query query={BOOK_FROM_ISBN_QUERY} variables={{ isbn }}>
        {({ error: errorOne, loading: loadingOne, data: dataOne }) => (
          <Query query={WORDCOUNT_QUERY} variables={{ isbn }}>
            {({ data: dataTwo, loading: loadingTwo, error: errorTwo }) => {
              if (errorOne) return <Error error={errorOne} />
              if (errorTwo) return <Error error={errorTwo} />
              if (!bot && (loadingOne || loadingTwo)) return <Loading />
              const book = dataOne.findBook
              book.isbn = book.isbn10
              const wordcountData = dataTwo.wordCounts
                ? dataTwo.wordCounts[0]
                : undefined
              const wordcount = wordcountData
                ? wordcountData.wordCount
                : book.pageCount * 250
              const countAccuracy = wordcountData
                ? wordcountData.countAccuracy
                : 'Guess'
              const countType = wordcountData
                ? wordcountData.countType
                : 'page count'
              const { user } = this.state
              return (
                <BookStyles data-test="book">
                  <Head>
                    <title>{book.name} | Reading Length</title>
                    <meta
                      name="description"
                      key="description"
                      content={`${book.name} has ${
                        book.pageCount
                      } pages. Reading Length provides a calculation for the word count of this book, find out how long it will take you to read!`}
                    />
                    <meta name="twitter:card" content="summary" />
                    <meta
                      property="og:description"
                      key="og-description"
                      content={`${book.name} has ${
                        book.pageCount
                      } pages. Reading Length provides a calculation for the word count of this book, find out how long it will take you to read!`}
                    />
                    <meta
                      name="twitter:description"
                      key="twitter-description"
                      content={`${book.name} has ${
                        book.pageCount
                      } pages. Reading Length provides a calculation for the word count of this book, find out how long it will take you to read!`}
                    />
                    <meta
                      property="og:title"
                      key="og-title"
                      content={`${
                        book.name
                      } word count and more | Reading Length`}
                    />
                    <meta
                      name="twitter:title"
                      key="twitter-title"
                      content={`${
                        book.name
                      } word count and more | Reading Length`}
                    />
                    <meta
                      property="og:image"
                      key="og-image"
                      content={book.image}
                    />
                    <meta
                      name="twitter:image"
                      key="twitter-image"
                      content={book.image}
                    />
                  </Head>
                  <Search />
                  <div className="above-the-fold">
                    <div className="container">
                      <img src={book.image} alt={book.name} />
                      <WordCountInfo
                        user={user}
                        book={book}
                        wordCount={wordcount}
                        safelySetState={this.safelySetState}
                      />
                    </div>
                  </div>
                  <Inner>
                    <Ad />
                    <div className="book-info">
                      {/* Need this div so the height of the book data is not the same as the description */}
                      <div>
                        <div className="book-data">
                          <div>
                            <strong>Author</strong>
                            <p>{book.author}</p>
                          </div>
                          {!bot && <Prices isbn={isbn} />}
                          <div>
                            <strong>Word Count</strong>
                            <p>{wordcount.toLocaleString()} words</p>
                            <p className="count-accuracy">
                              {countAccuracy} based on {countType}
                            </p>
                          </div>
                          {book.pageCount && (
                            <div>
                              <strong>Pages</strong>
                              <p>{book.pageCount} pages</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="description">
                        <div className="desc-text">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                book.description && book.description.length > 0
                                  ? book.description
                                  : "This book's description is not available on Reading Length.",
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
                    {book.related && book.related.length > 0 && (
                      <RelatedBooks relatedBooks={book.related} />
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
export { BOOK_FROM_ISBN_QUERY, WORDCOUNT_QUERY }
