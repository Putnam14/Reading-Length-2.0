import styled from 'styled-components'

const LoadingStyles = styled.div`
  text-align: center;
  p {
    font-size: 1.5em;
  }
  p:after {
    content: '.';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    100% {
      color: rgba(0, 0, 0, 0.2);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0.2), 0.5em 0 0 rgba(0, 0, 0, 0.2);
    }
    20% {
      color: black;
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0.2), 0.5em 0 0 rgba(0, 0, 0, 0.2);
    }
    40% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0.2);
    }
    60% {
      color: rgba(0, 0, 0, 0.5);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0.5), 0.5em 0 0 black;
    }
  }
`

export default LoadingStyles
