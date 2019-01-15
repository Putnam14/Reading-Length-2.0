import styled from 'styled-components'

const SearchStyles = styled.div`
  max-width: 600px;
  margin: 0 auto;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    label {
      font-weight: 700;
      margin-right: 2rem;
    }
    div {
      display: flex;
      input {
        flex-grow: 2;
        border: 1px solid #eee;
        border-radius: 6px 0 0 6px;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
      }
      button {
        border: 0;
        border-radius: 0 6px 6px 0;
      }
    }
  }
  @media (max-width: 480px) {
    form {
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`

export default SearchStyles