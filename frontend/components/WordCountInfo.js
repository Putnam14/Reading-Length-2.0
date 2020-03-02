import React from 'react'
import Link from 'next/link'
import WordCountInfoStyles from './styles/WordCountInfoStyles'

class WordCountInfo extends React.Component {
  calcUserTime = e => {
    e.preventDefault()
    const { user, wordCount, safelySetState } = this.props
    const { hours, minutes } = this.calcReadingTime(user.wpm, wordCount)
    const newUser = { ...user }
    newUser.results.hours = hours
    newUser.results.minutes = minutes
    safelySetState('user', newUser)
  }

  resetUserResults = () => {
    const { user, safelySetState } = this.props
    const newUser = { ...user }
    newUser.results.hours = 0
    newUser.results.minutes = 0
    safelySetState('user', newUser)
  }

  calcReadingTime = wpm => {
    const { wordCount } = this.props
    const minsToRead = wordCount / wpm
    const hours = Math.floor(minsToRead / 60)
    const minutes = Math.round(minsToRead % 60)
    return { hours, minutes }
  }

  newWPM = wpm => {
    const { user, safelySetState } = this.props
    const newUser = { ...user }
    newUser.wpm = wpm
    safelySetState('user', newUser)
  }

  render() {
    const {
      book,
      user: {
        wpm,
        results: { hours, minutes },
      },
    } = this.props
    const {
      hours: averageHours,
      minutes: averageMinutes,
    } = this.calcReadingTime(250)
    return (
      <WordCountInfoStyles>
        <h1>{book.name}</h1>
        <div className="result-container">
          {hours ? (
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
                to read at {wpm} words per minute.
              </p>
              <button type="button" onClick={this.resetUserResults}>
                Reset
              </button>
            </div>
          ) : (
            <>
              <p>
                The average reader will spend <b>{averageHours} hours</b> and{' '}
                <b>{averageMinutes} minutes</b> reading this book at 250 WPM
                (words per minute).
              </p>
              <form>
                <label htmlFor="userWPM">
                  How quickly can you read this book? <br /> Enter your reading
                  speed here:
                  <span className="input-group">
                    <input
                      type="number"
                      id="userWPM"
                      placeholder="250"
                      aria-label="Enter your reading speed to calculate how long this will take to read"
                      value={wpm}
                      onChange={e => {
                        e.preventDefault()
                        this.newWPM(e.target.value)
                      }}
                    />
                    <button type="button" onClick={this.calcUserTime}>
                      Estimate
                    </button>
                  </span>
                </label>
                <p>
                  To find your reading speed you can take one of our{' '}
                  <Link href="/wpm">
                    <a>WPM tests</a>
                  </Link>
                  .
                </p>
              </form>
            </>
          )}
        </div>
      </WordCountInfoStyles>
    )
  }
}

export default WordCountInfo
