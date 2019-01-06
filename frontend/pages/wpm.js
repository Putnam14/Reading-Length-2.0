import React from 'react'
import WPMPage from '../components/WPMPage'
import WPMTest from '../components/WPMTest'

class WPM extends React.Component {
  static getInitialProps({ query: { id } }) {
    return { id }
  }

  render() {
    return (
      <>
        {!this.props.id && <WPMPage />}
        {this.props.id && <WPMTest id={this.props.id} />}
      </>
    )
  }
}

export default WPM
