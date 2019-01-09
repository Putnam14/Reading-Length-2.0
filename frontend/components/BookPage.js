import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Search from './Search'
import BookStyles from './styles/BookStyles'
import Inner from './Inner'

const bookQuery = {
  isbn10: '0553593714',
  bookCover: 'https://images-na.ssl-images-amazon.com/images/I/518dkA0JEpL.jpg',
  bookTitle: 'A Game of Thrones',
  bookAuthor: 'George R.R. Martin',
  bookDescription: `<b>NOW THE ACCLAIMED HBO SERIES GAME OF THRONES—THE MASTERPIECE THAT BECAME A CULTURAL PHENOMENON</b>
 <p>Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King’s Landing. There Eddard Stark of Winterfell rules in Robert’s name. There his family dwells in peace and comfort: his proud wife, Catelyn; his sons Robb, Brandon, and Rickon; his daughters Sansa and Arya; and his bastard son, Jon Snow. Far to the north, behind the towering Wall, lie savage Wildings and worse—unnatural things relegated to myth during the centuries-long summer, but proving all too real and all too deadly in the turning of the season.</p>
   <p>Yet a more immediate threat lurks to the south, where Jon Arryn, the Hand of the King, has died under mysterious circumstances. Now Robert is riding north to Winterfell, bringing his queen, the lovely but cold Cersei, his son, the cruel, vainglorious Prince Joffrey, and the queen’s brothers Jaime and Tyrion of the powerful and wealthy House Lannister—the first a swordsman without equal, the second a dwarf whose stunted stature belies a brilliant mind. All are heading for Winterfell and a fateful encounter that will change the course of kingdoms.</p>
   <p>Meanwhile, across the Narrow Sea, Prince Viserys, heir of the fallen House Targaryen, which once ruled all of Westeros, schemes to reclaim the throne with an army of barbarian Dothraki—whose loyalty he will purchase in the only coin left to him: his beautiful yet innocent sister, Daenerys.</p>`,
  publishDate: '2011-03-22',
  pages: '864',
  wordCount: '293625',
  countAccurracy: 'Estimate',
  countType: 'audiobook length',
}

const calcTime = (wpm, wordCount) => {
  const minsToRead = wordCount / wpm
  const hours = Math.floor(minsToRead / 60)
  const minutes = Math.round(minsToRead % 60)
  return { hours, minutes }
}
class BookPage extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isbn10: bookQuery.isbn10,
      bookCover: bookQuery.bookCover,
      bookTitle: bookQuery.bookTitle,
      bookAuthor: bookQuery.bookAuthor,
      bookDescription: bookQuery.bookDescription,
      publishDate: bookQuery.publishDate,
      pages: bookQuery.pages,
      wordCount: bookQuery.wordCount,
      countAccurracy: bookQuery.countAccurracy,
      countType: bookQuery.countType,
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
      isbn10,
      bookCover,
      bookTitle,
      bookAuthor,
      bookDescription,
      publishDate,
      pages,
      wordCount,
      countAccurracy,
      countType,
      user: {
        wpm,
        results: { hours, minutes },
      },
    } = this.state
    const { hours: avgHrs, minutes: avgMins } = calcTime(250, wordCount)
    return (
      <BookStyles>
        <div className="above-the-fold">
          <div className="container">
            <div className="book-cover">
              <img src={bookCover} alt={bookTitle} />
            </div>
            <div className="reading-info">
              <div className="info-container">
                <h1>{bookTitle}</h1>
                <p>
                  The average reader will spend <b>{avgHrs} hours</b> and{' '}
                  <b>{avgMins} minutes</b> reading <em>{bookTitle}</em> at 250
                  WPM (words per minute).
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
                    <label>
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
                <p>{bookAuthor}</p>
              </div>
              <div>
                <strong>Word Count</strong>
                <p>{wordCount} words</p>
                <small>
                  {countAccurracy} from {countType}
                </small>
              </div>
              <div>
                <strong>Price</strong>
                <p>Amazon: $15.99</p>
                <p>Powell's: $12.99</p>
              </div>
              <div>
                <strong>Pages</strong>
                <p>{pages} pages</p>
              </div>
            </div>
            <div className="description">
              <div className="desc-text">
                <div dangerouslySetInnerHTML={{ __html: bookDescription }} />
              </div>
              <div className="amazon-link">
                <a href={`https://www.amazon.com/dp/${isbn10}?tag=readleng-20`}>
                  View more on Amazon
                </a>
              </div>
            </div>
          </div>
          <div className="related-titles">
            <h3>You might also like</h3>
            <div>
              <p>Book One</p>
            </div>
            <div>
              <p>Book Two</p>
            </div>
            <div>
              <p>Book Three</p>
            </div>
            <div>
              <p>Book Four</p>
            </div>
          </div>
        </Inner>
      </BookStyles>
    )
  }
}

export default BookPage
