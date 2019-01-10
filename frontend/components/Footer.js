import Link from 'next/link'
import FooterStyles from './styles/FooterStyles'

const Footer = () => (
  <FooterStyles>
    <hr />
    <div className="navLinks">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/wpm">
        <a>WPM Tests</a>
      </Link>
    </div>
    <p>
      Made with ♥ in Boise by{' '}
      <a href="https://bridgerputnam.me">Bridger Putnam</a>
    </p>
    <p>
      Word count estimates are not guaranteed to be accurate. If you are an
      author of a book or know of a book's accurate wordcount,{' '}
      <a href="mailto:hey+RL@bridgerputnam.me">contact me</a>.
    </p>
    <p>
      Reading Length is a participant in the Amazon Services LLC Associates
      Program, an affiliate advertising program designed to provide a means for
      us to earn fees by linking to Amazon.com and affiliated sites.
    </p>
  </FooterStyles>
)

export default Footer
