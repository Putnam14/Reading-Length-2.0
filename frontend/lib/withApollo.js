import React from 'react'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import isBot from 'isbot'
import initApollo from './init-apollo'

export default App =>
  class Apollo extends React.Component {
    static displayName = 'withApollo(App)'

    static async getInitialProps(ctx) {
      const { Component, router } = ctx
      const userAgent = ctx.ctx.req
        ? ctx.ctx.req.headers['user-agent']
        : 'Unknown'
      const bot = userAgent ? isBot(userAgent) : true

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
        appProps.bot = bot
        appProps.ua = userAgent
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo()
      if (bot) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
      }
    }

    constructor(props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState)
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
