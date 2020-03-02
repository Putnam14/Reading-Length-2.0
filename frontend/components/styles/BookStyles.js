import styled from 'styled-components'

const BookStyles = styled.div`
  .above-the-fold {
    position: relative;
    background-image: linear-gradient(white, #eee 10%, #eee 90%, white);
    .container {
      margin: 0 auto;
      padding: 2rem;
      max-width: calc(${props => props.theme.maxWidth});
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2em;
      justify-items: center;
      align-items: center;
      img {
        box-shadow: ${props => props.theme.bs};
        max-height: 400px;
      }
    }
  }
  .book-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .book-data {
      display: flex;
      flex-wrap: wrap;
      div {
        flex-basis: 50%;
        margin-bottom: 2rem;
        p,
        strong {
          margin: 0;
        }
      }
    }
    .description {
      .desc-text {
        max-height: 340px;
        overflow: hidden;
        position: relative;
      }
      .desc-text:after {
        position: absolute;
        bottom: 0;
        height: 100%;
        width: 100%;
        content: '';
        background-image: linear-gradient(rgba(255, 255, 255, 0) 70%, white);
      }
      .amazon-link {
        text-align: center;
      }
    }
  }
  .count-accuracy {
    font-size: 1.2rem;
  }
  @media (max-width: 700px) {
    .above-the-fold {
      .container {
        grid-template-columns: 1fr;
        img {
          max-width: 80vw;
          max-height: 40vh;
        }
      }
    }
    .book-info {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .description {
      text-align: left;
    }
  }
`
export default BookStyles
