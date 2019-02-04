import styled from 'styled-components'

const BookStyles = styled.div`
  .above-the-fold {
    position: relative;
    background-image: linear-gradient(#eee 85%, white);
    .container {
      margin: 0 auto;
      max-width: calc(${props => props.theme.maxWidth} + 150px);
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2em;
      justify-items: center;
      align-items: center;
      .book-cover {
        img {
          margin-top: 2em;
          box-shadow: ${props => props.theme.bs};
        }
      }
    }
  }
  .book-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .attribution {
      p,
      small {
        margin: 0;
        padding: 0;
      }
      height: 250px;
      display: grid;
      grid-template-columns: 1fr 1fr;
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
        background-image: linear-gradient(rgba(0, 0, 0, 0) 70%, white);
      }
      .amazon-link {
        text-align: center;
      }
    }
  }
  @media (max-width: 700px) {
    .above-the-fold {
      background-image: linear-gradient(#eee 55%, white);
      .container {
        grid-template-columns: 1fr;
        grid-gap: 0;
        .book-cover {
          img {
            max-width: 100vw;
            max-height: 80vh;
          }
        }
        .reading-info {
          .info-container {
            margin: 0 auto;
            text-align: center;
            form {
              display: grid;
              justify-items: center;
            }
          }
        }
      }
    }
    .book-info {
      margin-top: 2rem;
      grid-template-columns: 1fr;
    }
  }
`
export default BookStyles
