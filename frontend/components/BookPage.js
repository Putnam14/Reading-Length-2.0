import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Search from './Search'
import BookStyles from './styles/BookStyles'
import Inner from './Inner'

const bookQuery = {
  ISBN10: '0553593714',
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

class BookPage extends React.Component {
  render() {
    const {
      ISBN10,
      bookCover,
      bookTitle,
      bookAuthor,
      bookDescription,
      publishDate,
      pages,
      wordCount,
      countAccurracy,
      countType,
    } = bookQuery
    const minsToRead = wordCount / 250
    const avgHrs = Math.floor(minsToRead / 60)
    const avgMins = Math.round(minsToRead % 60)
    return (
      <BookStyles>
        <div className="above-the-fold">
          <div className="container">
            <div className="book-cover">
              <img src={bookCover} alt={bookTitle} />
            </div>
            <div className="reading-info">
              <h1>{bookTitle}</h1>
              <p>
                The average reader will spend <b>{avgHrs} hours</b> and{' '}
                <b>{avgMins} minutes</b> reading <em>{bookTitle}</em> at 250 WPM
                (words per minute).
              </p>
              <hr />
              <form>
                <label>
                  Find out how fast you can read this by entering your reading
                  speed.
                </label>
                <div>
                  <input type="number" id="calcTime" placeholder="250" />
                  <button type="submit">Estimate</button>
                </div>
              </form>
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
                <strong>Publication Date</strong>
                <p>{publishDate}</p>
              </div>
              <div>
                <strong>Pages</strong>
                <p>{pages} pages</p>
              </div>
              <div>
                <strong>Word Count</strong>
                <p>{wordCount} words</p>
                <small>
                  {countAccurracy} from {countType}
                </small>
              </div>
            </div>
            <div className="description">
              <div dangerouslySetInnerHTML={{ __html: bookDescription }} />
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
