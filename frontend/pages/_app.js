import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Page from '../components/Page'
import withApollo from '../lib/withData'

class MyApp extends App {
  // Crawls page for any queries or mutations that need to be fetched
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // Exposes the query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }

  render() {
    const { Component, apollo, pageProps } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
