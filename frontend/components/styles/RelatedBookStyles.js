import styled from 'styled-components'

const RelatedBookStyles = styled.div`
  position: relative;
  flex-basis: 20%;
  border-radius: 6px;
  border: 1px solid #e7e7e7;
  box-shadow: ${props => props.theme.bs};
  padding: 0.4em;
  margin: 1em;
  font-size: 0.8em;
  line-height: 1.4;
  img {
    padding: 0.5em 0;
    max-width: 80%;
    display: block;
    margin: 0 auto;
  }
  .related-name {
    font-weight: 500;
  }
  .related-link {
    text-align: center;
    margin: 0 auto;
    max-width: 90%;
  }
  .amazon-link {
    text-align: center;
    a {
      font-weight: 500;
    }
  }
`

export default RelatedBookStyles
