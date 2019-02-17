import styled from 'styled-components'

const WordCountInfoStyles = styled.div`
  font-size: 2rem;
  h1 {
    font-size: 2rem;
    padding: 0;
    margin: 0;
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
  label {
    font-weight: 700;
  }
  .input-group {
    padding: 0.5em 0;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    input {
      border-radius: 6px 0 0 6px;
      margin: 0;
    }
    button {
      margin: 0;
      border-left: 0;
      border-radius: 0 6px 6px 0;
    }
  }
  form {
    p {
      font-weight: 300;
      padding: 0;
      margin: 0;
      font-size: 1.5rem;
      font-style: italic;
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
  a {
    font-weight: 400;
  }
  @media (max-width: 700px) {
    h1,
    label {
      text-align: center;
    }
    label {
      display: block;
    }
    .input-group {
      justify-content: center;
    }
    form {
      text-align: center;
    }
    .results {
      p {
        text-align: center;
      }
    }
  }
`
export default WordCountInfoStyles
