import React from 'react'

class WordCountInfo extends React.Component {
  render() {
    const { book, avgHrs, avgMins, hours, minutes, wpm } = this.props
    return (
      <div className="info-container">
        <h1>{book.name}</h1>
        <p>
          The average reader will spend <b>{avgHrs} hours</b> and{' '}
          <b>{avgMins} minutes</b> reading <em>{book.name}</em> at 250 WPM
          (words per minute).
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
              Find out how fast you can read this by entering your reading
              speed.
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
    )
  }
}

export default WordCountInfo
