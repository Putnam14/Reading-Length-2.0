import React from 'react'
import Downshift, { resetIdCounter } from 'downshift'
import Router from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import debounce from 'lodash.debounce'
import gql from 'graphql-tag'
import SearchStyles, { DropDown, DropDownItem } from './styles/SearchStyles'

const SEARCH_KEYWORDS_QUERY = gql`
  query SEARCH_KEYWORDS_QUERY($kw: String!) {
    bookSearch(kw: $kw) {
      isbn10
      name
      author
    }
  }
`

class Search extends React.Component {
  state = {
    items: [],
    input: '',
    loading: false,
  }

  onChange = debounce(async (e, client) => {
    this.setState({ loading: true })
    const res = await client.query({
      query: SEARCH_KEYWORDS_QUERY,
      variables: { kw: e.target.value },
    })
    this.setState({
      input: e.target.value,
      items: res.data.bookSearch,
      loading: false,
    })
  }, 350)

  routeToBook = item => {
    if (item.isbn10) {
      Router.push({ pathname: `/book/isbn-${item.isbn10}` })
    } else {
      console.log(this.state.input)
    }
  }

  render() {
    resetIdCounter()
    return (
      <SearchStyles>
        <hr />
        <Downshift
          onChange={this.routeToBook}
          itemToString={item => (item === null ? '' : item.name)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
            closeMenu,
          }) => (
            <div>
              {/* Expose the client to us
            so we can manually run the query
            instead of it firing off at page load */}
              <ApolloConsumer>
                {client => (
                  <form className="searchForm" onSubmit={this.routeToBook}>
                    <label htmlFor="search">Search for any book</label>
                    <div>
                      <input
                        type="search"
                        {...getInputProps({
                          type: 'search',
                          placeholder: 'Book title or author...',
                          id: 'search',
                          className: this.state.loading ? 'loading' : '',
                          onChange: e => {
                            e.persist()
                            this.onChange(e, client)
                          },
                        })}
                      />
                      <button type="submit">Search!</button>
                    </div>
                  </form>
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.items.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      {item.name} - {item.author}
                    </DropDownItem>
                  ))}
                  {!inputValue && closeMenu()}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
        <hr />
      </SearchStyles>
    )
  }
}

export default Search
