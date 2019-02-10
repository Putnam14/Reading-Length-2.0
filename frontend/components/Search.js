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
    loading: false,
  }

  searchQuery = debounce(async (value, client) => {
    this.setState({ loading: true })
    const res = await client.query({
      query: SEARCH_KEYWORDS_QUERY,
      variables: { kw: value },
    })
    this.setState({
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
        try {
          this.setState({ loading: false })
          NProgress.start()
          const res = await client.query({
            query: FIND_NEW_BOOK,
            variables: { searchTerm: input },
          })
          if (res.data) {
            if (!res.data.findNewBook) {
              NProgress.done()
              throw new Error('Could not find that book!')
            }
            const isbn10 = res.data.findNewBook
            if (validISBN(isbn10)) this.routeToBook(isbn10)
          }
        } catch (err) {
          this.setState(prevState => {
            const newState = { ...prevState }
            newState.error = err.message
            return newState
          })
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
    const { items, loading, input, error } = this.state
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
                        <div className="inputs">
                          <input
                            type="search"
                            id="search"
                            {...getInputProps({
                              type: 'search',
                              placeholder: 'Book title or author...',
                              value: input,
                              className: loading ? 'loading' : '',
                              onChange: e => {
                                this.handleChange(
                                  { val: e.target.value },
                                  client
                                )
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
                              {(!inputValue || items.length === 0) &&
                                closeMenu()}
                            </DropDown>
                          )}
                        </div>
                      </div>
                      {error && <p>Could not find that book. Try again!</p>}
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
