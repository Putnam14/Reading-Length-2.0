import styled from 'styled-components'

const HomeHero = styled.div`
  height: 80vh;
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
  }
`

const HomeSearch = styled.div`
  width: 100%;
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
`

const Home = () => (
  <HomeHero>
    <div>
      <h1>Reading Length</h1>
      <h2>How long will it take to read that book?</h2>
      <HomeSearch>
        <hr />
        <form>
          <label htmlFor="bookSearch">Search for any book</label>
          <div>
            <input
              type="text"
              id="bookSearch"
              placeholder="Book title or ISBN..."
            />
            <button type="submit">Search!</button>
          </div>
        </form>
        <hr />
      </HomeSearch>
    </div>
  </HomeHero>
)

export default Home
