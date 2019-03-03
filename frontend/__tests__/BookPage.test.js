import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { fakeBook, fakeWordcounts } from '../lib/testUtils'
import BookPage, {
  BOOK_FROM_ISBN_QUERY,
  WORDCOUNT_QUERY,
} from '../components/BookPage'

const bookMock = [
  {
    request: { query: BOOK_FROM_ISBN_QUERY, variables: { isbn: '0451532163' } },
    result: { data: { findBook: fakeBook() } },
  },
  {
    request: { query: WORDCOUNT_QUERY, variables: { isbn: '0451532163' } },
    result: { data: { wordCounts: fakeWordcounts() } },
  },
]

const wordcountMock = []

describe('<BookPage/>', () => {
  it('Renders a page with book information that matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={bookMock}>
        <BookPage isbn="0451532163" />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const book = wrapper.find('div[data-test="book"]')
    expect(toJSON(book)).toMatchSnapshot()
  })
})
