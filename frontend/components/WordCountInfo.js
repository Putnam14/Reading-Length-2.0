import React from 'react'

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
      <div className="info-container">
        <h1>{book.name}</h1>
        <p>
          The average reader will spend <b>{averageHours} hours</b> and{' '}
          <b>{averageMinutes} minutes</b> reading <em>{book.name}</em> at 250
          WPM (words per minute).
        </p>
        <hr />
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
              to read.
            </p>
            <button type="button" onClick={this.resetUserResults}>
              Reset
            </button>
          </div>
        ) : (
          <form>
            <label htmlFor="userWPM">
              Find out how fast you can read this by entering your reading
              speed.
              <div>
                <input
                  type="number"
                  id="userWPM"
                  placeholder="250"
                  value={wpm}
                  onChange={e => {
                    e.preventDefault()
                    this.newWPM(e.target.value)
                  }}
                />
                <button type="submit" onClick={this.calcUserTime}>
                  Estimate
                </button>
              </div>
            </label>
          </form>
        )}
      </div>
    )
  }
}

export default WordCountInfo
