import styled from 'styled-components'

const HomeStyles = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: grid;
    justify-items: center;
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3rem;
  }
  h1,
  h2 {
    margin: 0;
    font-weight: 500;
    text-align: center;
  }
  hr {
    width: 100%;
  }
`

export default HomeStyles
