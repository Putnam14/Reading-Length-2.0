import Link from 'next/link'
import Head from 'next/head'
import Search from './Search'
import Inner from './Inner'

const WPMPage = () => (
  <Inner>
    <Head>
      <title>Words Per Minute (WPM) Calculators | Reading Length</title>
    </Head>
    <Search />
    <h1>WPM Speed Tests</h1>
    <p>
      Use one of our words per minute calculator to estimate your reading speed
      as best as possible!
    </p>
    <p>
      Find your reading speed in words per minute using any of the following
      texts. Try to select the reading level that corresponds to the category of
      book you will be reading. All text samples are sourced from classic books
      provided by Project Gutenberg.
    </p>
    <h2>Easy or Elementary Reading Tests</h2>
    <Link href="/wpm/ttopr">
      <a>The Tale of Peter Rabbit – Beatrix Potter</a>
    </Link>
    <h2>Moderate or High School Reading Tests</h2>
    <Link href="/wpm/tpodg">
      <a>The Picture of Dorian Gray – Oscar Wilde</a>
    </Link>
    <h2>Hard or Collegiate Reading Tests</h2>
    <Link href="/wpm/atotc">
      <a>A Tale of Two Cities – Charles Dickens</a>
    </Link>
  </Inner>
)

export default WPMPage
