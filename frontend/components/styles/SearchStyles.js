import styled, { keyframes } from 'styled-components'

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
`

const DropDownItem = styled.div`
  text-transform: capitalize;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`

const SearchStyles = styled.div`
  width: 600px;
  margin: 0 auto;
  .searchForm {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    label {
      font-weight: 700;
      margin-right: 2rem;
    }
    .notLabel {
      position: relative;
    }
    .inputs {
      display: flex;
      input {
        flex-grow: 2;
        border: 1px solid #eee;
        border-radius: 6px 0 0 6px;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        &.loading {
          animation: ${glow} 0.5s ease-in-out infinite alternate;
        }
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
export { DropDown, DropDownItem }
