import React from 'react'
import SearchStyles from './styles/SearchStyles'

const Search = () => (
  <SearchStyles>
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
  </SearchStyles>
)

export default Search
