import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Page from '../components/Page'
import withApollo from '../lib/withApollo'

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
    const { Component, apolloClient, pageProps, bot, ua } = this.props
    pageProps.bot = bot
    pageProps.ua = ua

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page bot={bot} ua={ua}>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
