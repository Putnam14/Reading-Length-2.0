import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SearchStyles from './styles/SearchStyles'

const SEARCH_KEYWORDS_QUERY = gql`
  query SEARCH_KEYWORDS_QUERY($kw: String!) {
    bookSearch(kw: $kw) {
      isbn10
      name
    }
  }
`

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
