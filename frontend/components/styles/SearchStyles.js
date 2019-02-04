import styled, { keyframes } from 'styled-components'

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
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
    box-shadow: 0 0 0px #337ab7;
  }

  to {
    box-shadow: 0 0 10px 1px #337ab7;
  }
`

const SearchStyles = styled.div`
  width: 600px;
  margin: 0 auto;
  .searchForm {
    label {
      font-weight: 700;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 2rem;
    }
    .input-container {
      display: grid;
      position: relative;
      grid-template-columns: 1fr;
    }
    .inputs {
      display: flex;
      input,
      button {
        border: 1px solid #eee;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
      }
      input {
        border-radius: 6px 0 0 6px;
        flex-grow: 2;
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
  @media (max-width: 620px) {
    width: auto;
    .searchForm {
      label {
        grid-template-columns: 1fr;
        justify-items: center;
      }
    }
  }
`

export default SearchStyles
export { DropDown, DropDownItem }
