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
      .book-cover {
        img {
          margin-top: 2em;
          box-shadow: ${props => props.theme.bs};
        }
      }
      .reading-info {
        width: 100%;
        height: 85%;
        .info-container {
          max-width: 350px;
          form {
            display: grid;
            grid-template-columns: 1fr;
            label {
              font-weight: 700;
              margin-right: 2rem;
            }
            div {
              display: flex;
              input {
                max-width: 120px;
                flex-grow: 2;
                border: 1px solid #e7e7e7;
                border-radius: 6px 0 0 6px;
                padding: 0.5rem 1rem;
                font-size: 1.5rem;
              }
              button {
                border: 0;
                background-color: white;
                border: 1px solid #e7e7e7;
                border-left: 0px;
                border-radius: 0 6px 6px 0;
              }
            }
          }
          .results {
            p {
              margin: 0;
            }
            button {
              display: block;
              background-color: white;
              border: 1px solid #e7e7e7;
              border-radius: 1em;
              margin: 0 auto;
              padding: 0.5em;
              cursor: pointer;
              font-size: 1.5rem;
              :hover {
                background-color: #f8f8f8;
              }
            }
          }
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
