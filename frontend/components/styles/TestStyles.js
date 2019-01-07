import styled from 'styled-components'

const TestStyles = styled.div`
  p {
    padding-left: 1em;
  }
  button {
    display: block;
    background-color: white;
    border: 1px solid #e7e7e7;
    border-radius: 1em;
    padding: 1.5rem;
    margin: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    :hover {
      background-color: #f8f8f8;
    }
  }
  .calc {
    margin-left: auto;
  }
  .panel {
    border: 1px solid #eee;
    border-radius: 1em;
  }
  .panel-heading {
    p {
      margin: 0;
      padding-left: 1em;
    }
    border-radius: 1em 1em 0 0;
    border-bottom: 1px solid #eee;
    background-color: #f8f8f8;
  }
  .panel-footer {
    border-top: 1px solid #eee;
    button {
      margin: 0 auto;
    }
  }
  .sample-text {
    margin: 0 auto;
    max-width: 70rem;
  }
  .hidden {
    display: none;
  }
`

export default TestStyles
