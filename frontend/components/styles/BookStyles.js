import styled from 'styled-components'

const BookStyles = styled.div`
  .above-the-fold {
    position: relative;
    background-image: linear-gradient(#eee 85%, white 15%);
    .container {
      margin: 0 auto;
      max-width: calc(${props => props.theme.maxWidth} + 150px);
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2em;
      justify-items: center;
      align-items: center;
    }
  }
  .reading-info {
    width: 100%;
    p {
      max-width: 400px;
    }
  }
  .book-cover {
    img {
      margin-top: 2em;
      box-shadow: ${props => props.theme.bs};
    }
  }
  .book-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .attribution {
      height: 300px;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
`

export default BookStyles
