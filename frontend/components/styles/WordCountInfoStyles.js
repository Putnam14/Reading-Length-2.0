import styled from 'styled-components'

const WordCountInfoStyles = styled.div`
  font-size: 2rem;
  h1 {
    font-size: 2rem;
  }
  input,
  button {
    border: 1px solid #e7e7e7;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: white;
  }
  button {
    border-radius: 6px;
    cursor: pointer;
    :hover {
      background-color: #f8f8f8;
    }
  }
  form {
    label {
      font-weight: 700;
    }
    .input-group {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: center;
      input {
        border-radius: 6px 0 0 6px;
      }
      button {
        border-left: 0;
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
      margin: 0 auto;
    }
  }
`
export default WordCountInfoStyles
