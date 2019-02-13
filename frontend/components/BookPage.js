import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import Search from './Search'
import BookStyles from './styles/BookStyles'
import Inner from './Inner'
import RelatedBooks from './RelatedBooks'
import WordCountInfo from './WordCountInfo'
import Prices from './Prices'
import Loading from './Loading'

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
const PRICE_QUERY = gql`
  query PRICE_QUERY($isbn: String!) {
    findPrice(isbn10: $isbn) {
      marketplace
      MSRP
      offerPrice
      currency
      affiliateLink
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
            {({ data: dataTwo, loading: loadingTwo, error: errorTwo }) => (
              <Query query={PRICE_QUERY} variables={{ isbn }}>
                {({
                  data: dataThree,
                  loading: loadingThree,
                  error: errorThree,
                }) => {
                  if (errorOne) return <Error error={errorOne} />
                  if (errorTwo) return <Error error={errorTwo} />
                  if (errorThree) return <Error error={errorThree} />
                  if (loadingOne || loadingTwo || loadingThree)
                    return <Loading />
                  const book = dataOne.findBook
                  book.isbn = book.isbn10
                  if (errorThree) console.log(errorThree)
                  const wordcountData = dataTwo.wordCounts
                    ? dataTwo.wordCounts[0]
                    : undefined
                  const wordcount = wordcountData
                    ? wordcountData.wordCount
                    : book.pageCount * 250
                  const { user } = this.state
                  const priceData = dataThree.findPrice
                  return (
                    <BookStyles>
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
                        <div className="book-info">
                          {/* Need this div so the height of the book data is not the same as the description */}
                          <div>
                            <div className="book-data">
                              <div>
                                <strong>Author</strong>
                                <p>{book.author}</p>
                              </div>
                              {priceData.length > 0 && (
                                <Prices priceData={priceData} />
                              )}
                              <div>
                                <strong>Word Count</strong>
                                <p>{wordcount} words</p>
                              </div>
                              <div>
                                <strong>Pages</strong>
                                <p>{book.pageCount} pages</p>
                              </div>
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
                          <RelatedBooks relatedBooks={book.related} />
                        )}
                      </Inner>
                    </BookStyles>
                  )
                }}
              </Query>
            )}
          </Query>
        )}
      </Query>
    )
  }
}

export default BookPage
