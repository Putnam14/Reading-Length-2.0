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

  handleStateChange = changes => {
    if (changes.selectedItem) {
      const isbn = changes.selectedItem.isbn10
      Router.push({ pathname: `/book/isbn-${isbn}` })
    } else if (changes.inputValue) {
      this.setState({ input: changes.inputValue })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { input } = this.state
    console.log(input)
  }

  render() {
    resetIdCounter()
    const { items, loading } = this.state
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
                  <form className="searchForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="search">Search for any book</label>
                    <div className="notLabel">
                      <div className="inputs">
                        <input
                          type="search"
                          {...getInputProps({
                            type: 'search',
                            placeholder: 'Book title or author...',
                            id: 'search',
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
