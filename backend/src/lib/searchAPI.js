const { bookSearch, audibleSearch } = require("./api/amazon");

const handleAudibleResponse = async (amazonSearch, ctx) => {
  if (amazonSearch.AlternateVersions) {
    const audibleVersion = amazonSearch.AlternateVersions.AlternateVersion.find(
      alternate => {
        return (
          alternate.Binding === "Audible Audio Edition" ||
          alternate.Binding === "Audible Audiobook"
        );
      }
    );
    if (audibleVersion) {
      const runtime = await audibleSearch(audibleVersion.ASIN);
      // Check if runtime is realistic (some books are split up into multiple audiobooks)
      if (runtime > results.pageCount) {
        const wordCount = runtime * 145;
        ctx.db.mutation.createWordCount({
          data: {
            isbn10: results.isbn10,
            wordCount,
            countAccuracy: "Estimate",
            countType: "Audiobook"
          }
        });
      }
    }
  }
};

const handleAmazonResponse = async (amazonSearch, ctx) => {
  if (typeof amazonSearch.ItemAttributes.Author === "object")
    amazonSearch.ItemAttributes.Author = amazonSearch.ItemAttributes.Author[0];
  const results = {
    isbn10: amazonSearch.ASIN,
    name: amazonSearch.ItemAttributes.Title,
    author: amazonSearch.ItemAttributes.Author,
    image: amazonSearch.LargeImage.URL,
    description: amazonSearch.EditorialReviews.EditorialReview.Content,
    publishDate: amazonSearch.ItemAttributes.PublicationDate,
    pageCount: parseInt(amazonSearch.ItemAttributes.NumberOfPages),
    related: []
  };
  if (amazonSearch.SimilarProducts) {
    amazonSearch.SimilarProducts.SimilarProduct.map((product, i) => {
      if (i < 4) {
        results.related.push(product.ASIN);
        handleRelatedBooks(product.Title, product.ASIN, ctx);
      }
    });
  }
  handleAudibleResponse(amazonSearch, ctx);
  const { isbn10, name, image } = results;
  addBookPreview(isbn10, name, image, ctx);
  return results;
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
  const addedToDB = await ctx.db.mutation.createBook({
    data: {
      ...results,
      related: { set: related }
    }
  });
  if (addedToDB)
    return addBookIndex(isbn10, name.toLowerCase(), author.toLowerCase(), ctx);
};

const handleBook = async (results, ctx) => {
  const index = await getBookIndex(results.isbn10, ctx);
  if (!index[0]) return addBook(results, ctx);
  return index[0];
};

exports.newBookSearch = async (searchTerm, ctx) => {
  // Query Amazon API for search term
  const amazonSearch = await bookSearch(searchTerm, ctx);
  // Parse results
  const amazonResults = await handleAmazonResponse(amazonSearch, ctx);

  return handleBook(amazonResults, ctx).then(result => {
    const { isbn10 } = result;
    return isbn10;
  });
};
