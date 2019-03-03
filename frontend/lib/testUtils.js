const fakeBook = () => ({
  isbn10: '0451532163',
  isbn13: null,
  name: 'Walden and Civil Disobedience',
  author: 'Henry David Thoreau',
  image: 'https://images-na.ssl-images-amazon.com/images/I/41UtCWaX0BL.jpg',
  description:
    '<b>Henry David Thoreau reflects on life, politics, and society in these two inspiring masterworks: <i>Walden</i> and <i>Civil Disobedience</i>.</b><br><br> In 1845, Thoreau moved to a cabin that he built with his own hands along the shores of Walden Pond in Massachusetts. Shedding the trivial ties that he felt bound much of humanity, Thoreau reaped from the land both physically and mentally, and pursued truth in the quiet of nature. In <i>Walden</i>, he explains how separating oneself from the world of men can truly awaken the sleeping self. Thoreau holds fast to the notion that you have not truly existed until you adopt such a lifestyle—and only then can you reenter society, as an enlightened being.<br>  <br> These simple but profound musings—as well as “Civil Disobedience,” his protest against the government’s interference with civil liberty—have inspired many to embrace his philosophy of individualism and love of nature. More than a century and a half later, his message is more timely than ever.<br>  <br><b>With an Introduction by W.S. Merwin </b><br><b>and an Afterword by Will Howarth</b>',
  pageCount: 336,
  related: ['1451529791', '1548000019', '0679740244', '0486277909'],
  __typename: 'Book',
  isbn: '0451532163',
})

const fakeWordcounts = () => ({
  wordCount: 108170,
  countAccuracy: 'Estimate',
  countType: 'audiobook length',
  __typename: 'WordCount',
})

export { fakeBook, fakeWordcounts }
