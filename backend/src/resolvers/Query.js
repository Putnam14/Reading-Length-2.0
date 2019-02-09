const { forwardTo } = require("prisma-binding");
const { newBookSearch, priceSearch } = require("../lib/searchAPI");

const Query = {
  findBook(parent, args, ctx, info) {
    const { isbn10 } = args;
    return ctx.db.query.book({ where: { isbn10 } }, info).then(async res => {
      if (res) return res;
      return await newBookSearch(isbn10, ctx, info)
        .then(res => {
          return ctx.db.query
            .book({ where: { isbn10: res } }, info)
            .then(async res => {
              if (res) return res;
            })
            .catch(err => {
              throw new Error(
                `Could not find book for ISBN ${isbn10}. Error: ${err}`,
                err
              );
            });
        })
        .catch(err => {
          throw new Error(
            `Could not find a book with those search terms.`,
            err
          );
        });
    });
  },
  findPrice(parent, args, ctx, info) {
    const { isbn10 } = args;
    return priceSearch(isbn10);
  },
  wordCounts: forwardTo("db"),
  bookPreview: forwardTo("db"),
  bookSearch(parent, args, ctx, info) {
    const { kw } = args;
    return ctx.db.query.bookIndexes(
      {
        where: {
          OR: [
            { name_contains: kw.toLowerCase() },
            { author_contains: kw.toLowerCase() }
          ]
        }
      },
      info
    );
  },
  async findNewBook(parent, args, ctx, info) {
    const { searchTerm } = args;
    // Following returns an ISBN
    const res = await newBookSearch(searchTerm, ctx, info);
    return res;
  }
};

module.exports = Query;
