import React from 'react'
import WPMPage from '../components/WPMPage'
import WPMTest from '../components/WPMTest'

class WPM extends React.Component {
  static getInitialProps({ query: { id } }) {
    return { id }
  }

  render() {
    const { id } = this.props
    return (
      <>
        {!id && <WPMPage />}
        {id && <WPMTest id={id} />}
      </>
    )
  }
}

export default WPM
