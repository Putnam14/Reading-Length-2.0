const { bookSearch } = require("./api/amazon");

exports.newBookSearch = async (searchTerm, ctx, info) => {
  // Query Amazon API for search term
  const amazonSearch = await bookSearch(searchTerm);
  // Parse results
  const amazonResults = {
    isbn10: amazonSearch.ASIN,
    name: amazonSearch.ItemAttributes.Title,
    author: amazonSearch.ItemAttributes.Author,
    image: amazonSearch.LargeImage.URL,
    description: amazonSearch.EditorialReviews.EditorialReview.Content,
    publishDate: amazonSearch.ItemAttributes.PublicationDate,
    pageCount: parseInt(amazonSearch.ItemAttributes.NumberOfPages),
    related: [
      amazonSearch.SimilarProducts.SimilarProduct[0].ASIN,
      amazonSearch.SimilarProducts.SimilarProduct[1].ASIN,
      amazonSearch.SimilarProducts.SimilarProduct[2].ASIN
    ],
    relatedDetails: [
      {
        name: amazonSearch.SimilarProducts.SimilarProduct[0].Title,
        isbn10: amazonSearch.SimilarProducts.SimilarProduct[0].ASIN
      },
      {
        name: amazonSearch.SimilarProducts.SimilarProduct[1].Title,
        isbn10: amazonSearch.SimilarProducts.SimilarProduct[1].ASIN
      },
      {
        name: amazonSearch.SimilarProducts.SimilarProduct[2].Title,
        isbn10: amazonSearch.SimilarProducts.SimilarProduct[2].ASIN
      }
    ]
  };
  const {
    isbn10,
    name,
    author,
    image,
    description,
    publishDate,
    pageCount,
    related,
    relatedDetails
  } = amazonResults;

  // Check if book already has a BookPreview
  const bookPreview = await ctx.db.query.bookPreview({ where: { isbn10 } });
  if (bookPreview) {
    if (!bookPreview.image) {
      ctx.db.mutation.updateBookPreview(
        { data: { image }, where: { id: bookPreview.id } },
        info
      );
    }
  } else {
    ctx.db.mutation.createBookPreview({ data: { isbn10, name, image } }, info);
  }

  // Add related books to bookPreview
  relatedDetails.forEach(async detail => {
    const detailPreview = await ctx.db.query.bookPreview({
      where: { isbn10: detail.isbn10 }
    });
    if (!detailPreview) {
      ctx.db.mutation.createBookPreview({ data: { ...detail } }, info);
    }
  });

  // Take a look if book exists in BookIndex
  const existsInIndex = await ctx.db.query.bookIndexes({ where: { isbn10 } });
  if (!existsInIndex[0]) {
    // Add to Book
    const addedBook = await ctx.db.mutation.createBook(
      {
        data: {
          isbn10,
          name,
          author,
          image,
          description,
          publishDate,
          pageCount,
          related: { set: related }
        }
      },
      info
    );
    console.log(addedBook);
    // Add to BookIndex
    if (addedBook) {
      ctx.db.mutation.createBookIndex({ data: { isbn10, name, author } });
    }
  }

  // Find the audiobook length
  console.log(isbn10);
  return isbn10;
};
