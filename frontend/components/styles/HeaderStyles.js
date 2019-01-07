import styled from 'styled-components'

const HeaderStyles = styled.div`
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
  .container {
    margin: 0 auto;
    width: 80vw;
    max-width: 1170px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  a {
    color: #777;
    padding-right: 1em;
    :hover {
      color: #5e5e5e;
    }
  }
  .logo {
    font-size: 2rem;
  }
  @media (max-width: 405px) {
    .container {
      width: 100%;
      grid-template-columns: 1fr;
      justify-items: center;
    }
    a {
      padding: 0.5em;
    }
  }
`

export default HeaderStyles
