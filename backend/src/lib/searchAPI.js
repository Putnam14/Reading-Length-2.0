const { bookSearch, getOfferPrice } = require("./api/amazon");

const handleAmazonResponse = (results, ctx) => {
  try {
    const book = {
      isbn10: results.isbn10,
      name: results.name ? results.name : "Unknown",
      author: results.author ? results.author : "Unknown",
      image: results.image,
      publishDate: results.publishDate,
      pageCount: parseInt(results.pageCount),
      description: "",
      related: []
    };
    const { isbn10, name, medImage } = results;
    addBookPreview(isbn10, name, medImage, ctx);
    return book;
  } catch (err) {
    throw new Error(err);
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
  return ctx.db.query
    .bookIndexes({ where: { isbn10: isbn10 } })
    .then(result => {
      return result;
    })
    .catch(err => {
      throw new Error(err);
    });
};

const addBookIndex = (isbn10, name, author, ctx) => {
  return ctx.db.mutation
    .createBookIndex({
      data: { isbn10, name, author }
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      throw new Error(err);
    });
};

const addBook = (results, ctx) => {
  const { isbn10, name, author, related } = results;
  return ctx.db.mutation
    .createBook({
      data: {
        ...results,
        related: { set: related }
      }
    })
    .then(() => {
      return addBookIndex(
        isbn10,
        name.toLowerCase(),
        author.toLowerCase(),
        ctx
      );
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
      throw new Error(err);
    });
};

const handleBook = (results, ctx) => {
  return getBookIndex(results.isbn10, ctx)
    .then(result => {
      if (result[0]) return result[0];
      return addBook(results, ctx);
    })
    .catch(err => {
      throw new Error(err);
    });
};

exports.newBookSearch = (searchTerm, ctx) => {
  return bookSearch(searchTerm)
    .then(searchResults => {
      return handleAmazonResponse(searchResults, ctx);
    })
    .then(transformedResults => {
      return handleBook(transformedResults, ctx);
    })
    .then(result => {
      const { isbn10 } = result;
      return isbn10;
    })
    .catch(err => {
      throw new Error(err);
    });
};

exports.priceSearch = isbn => {
  const prices = [];
  return getOfferPrice(isbn)
    .then(priceResult => {
      if (priceResult) {
        const priceObject = {
          marketplace: "Amazon",
          affiliateLink: `https://www.amazon.com/dp/${isbn}?tag=${process.env.AMAZON_AFFILIATE_TAG}`
        };
        priceObject.MSRP = priceResult.msrp ? priceResult.msrp : undefined;
        priceObject.currency = priceResult.currency
          ? priceResult.currency
          : undefined;
        priceObject.offerPrice = priceResult.price
          ? priceResult.price
          : undefined;
        prices.push(priceObject);
      }
      return prices;
    })
    .catch(err => {
      throw new Error(err);
    });
};
