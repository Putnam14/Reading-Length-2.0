import Head from 'next/head'
import Search from './Search'
import HomeStyles from './styles/HomeStyles'
import Inner from './Inner'

const Home = () => (
  <Inner>
    <HomeStyles>
      <Head>
        <title>Book length search engine | Reading Length</title>
      </Head>
      <div>
        <h1>Reading Length</h1>
        <h2>How long will it take to read that book?</h2>
        <Search />
      </div>
    </HomeStyles>
  </Inner>
)

export default Home
