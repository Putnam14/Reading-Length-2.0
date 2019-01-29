import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import Search from './Search'
import BookStyles from './styles/BookStyles'
import Inner from './Inner'
import RelatedBook from './RelatedBook'
import WordCount from './WordCount'

const BOOK_FROM_ISBN_QUERY = gql`
  query BOOK_FROM_ISBN_QUERY($isbn: String!) {
    findBook(isbn10: $isbn) {
      isbn10
      isbn13
      name
      author
      image
      description
      publishDate
      pageCount
      related
    }
  }
`

const calcTime = (wpm, wordCount) => {
  const minsToRead = wordCount / wpm
  const hours = Math.floor(minsToRead / 60)
  const minutes = Math.round(minsToRead % 60)
  return { hours, minutes }
}
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

  handleChange = e => {
    const newWPM = e.target.value
    this.setState(prevState => {
      const newState = { ...prevState }
      newState.user.wpm = newWPM
      return newState
    })
  }

  calcUserTime = e => {
    e.preventDefault()
    const {
      user: { wpm },
      wordCount,
    } = this.state
    const { hours, minutes } = calcTime(wpm, wordCount)
    this.setUserResults(hours, minutes)
  }

  setUserResults = (hours, minutes) => {
    this.setState(prevState => {
      const newState = { ...prevState }
      newState.user.results.hours = hours
      newState.user.results.minutes = minutes
      return newState
    })
  }

  resetUserResults = () => {
    this.setUserResults(0, 0)
  }

  render() {
    const {
      user: {
        wpm,
        results: { hours, minutes },
      },
    } = this.state
    const { hours: avgHrs, minutes: avgMins } = calcTime(250, 1000)
    const { isbn } = this.props
    return (
      <Query query={BOOK_FROM_ISBN_QUERY} variables={{ isbn }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          if (!data.findBook) return <p>No item found for {isbn}</p>
          const book = data.findBook
          return (
            <BookStyles>
              <Search />
              <div className="above-the-fold">
                <div className="container">
                  <div className="book-cover">
                    <img src={book.image} alt={book.name} />
                  </div>
                  <div className="reading-info">
                    <div className="info-container">
                      <h1>{book.name}</h1>
                      <p>
                        The average reader will spend <b>{avgHrs} hours</b> and{' '}
                        <b>{avgMins} minutes</b> reading <em>{book.name}</em> at
                        250 WPM (words per minute).
                      </p>
                      <hr />
                      {hours || minutes ? (
                        <div className="results">
                          <p>
                            This should take you around{' '}
                            <strong>
                              {hours} hour
                              {hours > 1 ? 's' : ''}
                            </strong>{' '}
                            and{' '}
                            <strong>
                              {minutes} minute
                              {minutes > 1 ? 's' : ''}
                            </strong>{' '}
                            to read.
                          </p>
                          <button type="button" onClick={this.resetUserResults}>
                            Reset
                          </button>
                        </div>
                      ) : (
                        <form>
                          <label htmlFor="userWPM">
                            Find out how fast you can read this by entering your
                            reading speed.
                          </label>
                          <div>
                            <input
                              type="number"
                              id="userWPM"
                              placeholder="250"
                              value={wpm}
                              onChange={this.handleChange}
                            />
                            <button type="submit" onClick={this.calcUserTime}>
                              Estimate
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
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
                      <strong>Word Count</strong>
                      {/* <WordCount isbn={isbn10} />
                      <small>
                        {countAccurracy} from {countType}
                      </small> */}
                    </div>
                    <div>
                      <strong>Price</strong>
                      <p>Amazon: $15.99</p>
                      <p>Powell's: $12.99</p>
                    </div>
                    <div>
                      <strong>Pages</strong>
                      <p>{book.pageCount} pages</p>
                    </div>
                  </div>
                  <div className="description">
                    <div className="desc-text">
                      <div
                        dangerouslySetInnerHTML={{ __html: book.description }}
                      />
                    </div>
                    <div className="amazon-link">
                      <a
                        href={`https://www.amazon.com/dp/${
                          book.isbn10
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
    )
  }
}

export default BookPage
