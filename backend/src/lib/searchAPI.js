const {
  bookSearch,
  bookSearch2,
  audibleSearch2,
  amazonPrices
} = require("./api/amazon");
const wait = require("waait");

const handleAudibleResponse = async (name, isbn, pages, ctx) => {
  try {
    const runtime = await audibleSearch2(name + " audible");
    console.log("Hey");
    if (runtime) {
      console.log("???");
      const estWordCount = runtime * 145;
      // Delete any estimates that are smaller than this new estimate. Alternatively, we could delete all other with the same countType...
      await ctx.db.mutation.deleteManyWordCounts({
        where: {
          isbn10: isbn,
          wordCount_lte: estWordCount,
          countType: "audiobook length"
        }
      });
      const existingGreaterWordcounts = await ctx.db.query.wordCounts({
        where: {
          isbn10: isbn,
          wordCount_gt: estWordCount,
          countType: "audiobook length"
        }
      });
      if (
        !existingGreaterWordcounts ||
        existingGreaterWordcounts.length === 0
      ) {
        await ctx.db.mutation.createWordCount({
          data: {
            isbn10: isbn,
            wordCount: estWordCount,
            countAccuracy: "Estimate",
            countType: "audiobook length"
          }
        });
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

const handleAmazonResponse = (results, searchTerm, ctx) => {
  try {
    const book = {
      isbn10: results.isbn10,
      name: results.name,
      author: results.author,
      image: results.image,
      publishDate: results.publishDate,
      pageCount: parseInt(results.pageCount),
      description: undefined,
      related: []
    };
    results.description = undefined;
    results.related = [];
    //handle audible
    const { isbn10, name, medImage } = results;
    handleAudibleResponse(name, isbn10, book.pageCount, ctx);
    addBookPreview(isbn10, name, medImage, ctx);
    return book;
  } catch (err) {
    throw new Error(err);
  }
};

const handleRelatedBooks = async (name, isbn10, ctx) => {
  // Add related books to bookPreview
  const detailPreview = await ctx.db.query.bookPreview({
    where: { isbn10 }
  });
  if (!detailPreview) {
    ctx.db.mutation.createBookPreview({ data: { name, isbn10 } });
  }
};

const addBookPreview = async (isbn10, name, image, ctx) => {
  // Check if book already has a BookPreview
  const bookPreview = await ctx.db.query.bookPreview({ where: { isbn10 } });
  if (bookPreview) {
    if (!bookPreview.image) {
      ctx.db.mutation.updateBookPreview({
        data: { image },
        where: { id: bookPreview.id }
      });
    }
  } else {
    ctx.db.mutation.createBookPreview({ data: { isbn10, name, image } });
  }
};

const getBookIndex = (isbn10, ctx) => {
  return ctx.db.query.bookIndexes({ where: { isbn10 } });
};

const addBookIndex = (isbn10, name, author, ctx) => {
  return ctx.db.mutation.createBookIndex({
    data: { isbn10, name, author }
  });
};

const addBook = async (results, ctx) => {
  const { isbn10, name, author, related } = results;
  console.log("lets try adding this");
  try {
    await ctx.db.mutation.createBook({
      data: {
        ...results,
        related: { set: related }
      }
    });
    return addBookIndex(isbn10, name.toLowerCase(), author.toLowerCase(), ctx);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const handleBook = async (results, ctx) => {
  const index = await getBookIndex(results.isbn10, ctx);
  if (!index[0]) return addBook(results, ctx);
  return index[0];
};

exports.testMethod = testParam => {
  console.log("I'm the test method! : " + testParam);
};

exports.newBookSearch = async (searchTerm, ctx) => {
  // Query Amazon API for search term
  const amazonSearch = await bookSearch(searchTerm);
  const amazonResults = await handleAmazonResponse(
    amazonSearch,
    searchTerm,
    ctx
  );
  return handleBook(amazonResults, ctx)
    .then(result => {
      const { isbn10 } = result;
      return isbn10;
    })
    .catch(err => {
      throw new Error(err);
    });
};

exports.priceSearch = async isbn => {
  const prices = [];
  const amazonResult = await amazonPrices(isbn);
  if (amazonResult) {
    const amazonObject = {
      marketplace: "Amazon",
      affiliateLink: `https://www.amazon.com/dp/${isbn}?tag=${process.env.AMAZON_AFFILIATE_TAG}`
    };
    amazonObject.MSRP = amazonResult.ItemAttributes.ListPrice.Amount;
    amazonObject.currency = amazonResult.ItemAttributes.ListPrice.CurrencyCode;
    amazonObject.offerPrice = amazonResult.Offers
      ? amazonResult.Offers.Offer.OfferListing.Price.Amount
      : amazonObject.MSRP;
    prices.push(amazonObject);
  }
  return prices;
};
