import React from 'react'
import Downshift, { resetIdCounter } from 'downshift'
import Router from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import debounce from 'lodash.debounce'
import gql from 'graphql-tag'
import SearchStyles, { DropDown, DropDownItem } from './styles/SearchStyles'
import validISBN from '../lib/isbnValidator'

const SEARCH_KEYWORDS_QUERY = gql`
  query SEARCH_KEYWORDS_QUERY($kw: String!) {
    bookSearch(kw: $kw) {
      isbn10
      name
      author
    }
  }
`

const FIND_NEW_BOOK = gql`
  query FIND_NEW_BOOK($searchTerm: String!) {
    findNewBook(searchTerm: $searchTerm) {
      isbn10
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

  handleStateChange = changes => {
    // Handle selecting the search results
    if (changes.selectedItem) {
      // Could do an ISBN check here
      const isbn = changes.selectedItem.isbn10
      this.routeToBook(isbn)
    } else if (changes.inputValue) {
      this.setState({ input: changes.inputValue })
    }
  }

  // Handle an enter on the form (Also, check out this curry)
  handleSubmit = client => async e => {
    e.preventDefault()
    const { input } = this.state
    if (input) {
      // If valid ISBN route to that book page
      if (validISBN(input)) {
        this.routeToBook(input)
      } else {
        const res = await client.query({
          query: FIND_NEW_BOOK,
          variables: { searchTerm: input },
        })
        if (!res.data.findNewBook) throw new Error('Could not find that book!')
        const { isbn10 } = res.data.findNewBook
        this.routeToBook(isbn10)
      }
    }
  }

  routeToBook = isbn => {
    Router.push({ pathname: `/book/isbn-${isbn}` })
  }

  render() {
    resetIdCounter()
    const { items, loading, input } = this.state
    return (
      <SearchStyles>
        <hr />
        <Downshift
          onStateChange={this.handleStateChange}
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
                  <form
                    className="searchForm"
                    onSubmit={this.handleSubmit(client)}
                  >
                    <label htmlFor="search">Search for any book</label>
                    <div className="notLabel">
                      <div className="inputs">
                        <input
                          type="search"
                          {...getInputProps({
                            type: 'search',
                            placeholder: 'Book title or author...',
                            id: 'search',
                            value: input,
                            className: loading ? 'loading' : '',
                            onChange: e => {
                              e.persist()
                              this.onChange(e, client)
                            },
                          })}
                        />
                        <button type="submit">Search!</button>
                      </div>
                      <div className="dropdown">
                        {isOpen && (
                          <DropDown>
                            {items.map((item, index) => (
                              <DropDownItem
                                {...getItemProps({ item })}
                                key={item.isbn10}
                                highlighted={index === highlightedIndex}
                              >
                                {item.name} - {item.author}
                              </DropDownItem>
                            ))}
                            {!inputValue && closeMenu()}
                          </DropDown>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </ApolloConsumer>
            </div>
          )}
        </Downshift>
        <hr />
      </SearchStyles>
    )
  }
}

export default Search
