import React from 'react'
import Downshift, { resetIdCounter } from 'downshift'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import debounce from 'lodash.debounce'
import gql from 'graphql-tag'
import SearchStyles, { DropDown, DropDownItem } from './styles/SearchStyles'
import validISBN from '../lib/isbnValidator'

const SEARCH_KEYWORDS_QUERY = gql`
  query SEARCH_KEYWORDS_QUERY($kw: String!) {
    bookSearch(first: 3, kw: $kw) {
      isbn10
      name
      author
    }
  }
`

const FIND_NEW_BOOK = gql`
  query FIND_NEW_BOOK($searchTerm: String!) {
    findNewBook(searchTerm: $searchTerm)
  }
`

class Search extends React.Component {
  state = {
    items: [],
    input: '',
    error: '',
    suggestionLoading: false,
    searchLoading: false,
  }

  searchQuery = debounce(async (value, client) => {
    this.setState({ suggestionLoading: true })
    const res = await client.query({
      query: SEARCH_KEYWORDS_QUERY,
      variables: { kw: value },
    })
    this.setState({
      items: res.data.bookSearch,
      suggestionLoading: false,
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
        try {
          this.setState({ suggestionLoading: false, searchLoading: true })
          NProgress.start()
          const res = await client.query({
            query: FIND_NEW_BOOK,
            variables: { searchTerm: input },
          })
          if (res.data) {
            this.setState({ searchLoading: false })
            NProgress.done()
            if (!res.data.findNewBook) {
              throw new Error('Could not find that book.')
            }
            const isbn10 = res.data.findNewBook
            if (validISBN(isbn10)) {
              this.routeToBook(isbn10)
            } else {
              throw new Error('ISBN returned from search was invalid.')
            }
          }
        } catch (err) {
          this.setState(prevState => {
            const newState = { ...prevState }
            newState.error = err.message
            newState.searchLoading = false
            return newState
          })
          NProgress.done()
          throw new Error(`Error caught at search: ${err.message}`)
        }
      }
    }
  }

  handleChange = (e, client) => {
    this.setState({
      input: e.val || '',
    })
    if (e.val) {
      this.searchQuery(e.val, client)
    }
  }

  routeToBook = isbn => {
    Router.push({ pathname: `/book/isbn-${isbn}` })
  }

  render() {
    resetIdCounter()
    const { items, suggestionLoading, searchLoading, input, error } = this.state
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
                    <label htmlFor="search">
                      Search for any book
                      <div className="input-container">
                        <div
                          className={`inputs${
                            suggestionLoading ? ' loading' : ''
                          }`}
                        >
                          <input
                            type="search"
                            id="search"
                            {...getInputProps({
                              type: 'search',
                              placeholder: 'Book title or author...',
                              value: input,
                              onChange: e => {
                                this.handleChange(
                                  { val: e.target.value },
                                  client
                                )
                              },
                            })}
                          />
                          <button type="submit" disabled={searchLoading}>
                            Search!
                          </button>
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
                                  <p className="title">{item.name}</p>
                                  <p className="author">{item.author}</p>
                                </DropDownItem>
                              ))}
                              {(!inputValue || items.length === 0) &&
                                closeMenu()}
                            </DropDown>
                          )}
                        </div>
                      </div>
                      {error && (
                        <p>
                          Could not find that book, our servers might be busy...
                          Try again in a few seconds.
                        </p>
                      )}
                    </label>
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
