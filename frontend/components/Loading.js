import React from 'react'
import NProgress from 'nprogress'
import LoadingStyles from './styles/LoadingStyles'

class Loading extends React.Component {
  componentDidMount() {
    NProgress.start()
  }

  componentWillUnmount() {
    NProgress.done()
  }

  render() {
    return (
      <LoadingStyles>
        <p>Loading</p>
      </LoadingStyles>
    )
  }
}

export default Loading
