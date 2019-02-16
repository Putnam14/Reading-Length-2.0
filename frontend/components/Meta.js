import Head from 'next/head'

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Reading Length</title>
    <meta
      name="description"
      content="Find out how long it will take you to read any book by using our book word count search. Search for a book, tell us how fast you read, and start reading!"
    />
    <meta
      property="og:title"
      content="Reading Length | Search engine for books"
    />
    <link
      rel="shortcut icon"
      href="/static/img/favicon.ico"
      type="image/x-icon"
    />
    <link rel="icon" href="/static/img/Logo_black.png" type="image/x-icon" />
  </Head>
)

export default Meta
