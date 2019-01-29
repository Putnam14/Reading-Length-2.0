const { forwardTo } = require("prisma-binding");
const { newBookSearch } = require("../lib/searchAPI");

const Query = {
  async findBook(parent, args, ctx, info) {
    const { isbn10 } = args;
    return ctx.db.query.book({ where: { isbn10 } }, info).then(res => {
      if (res) return res;
      return newBookSearch(isbn10, ctx, info)
        .then(async res => {
          return ctx.db.query.book({ where: { res } }, info);
        })
        .catch(err => {
          throw new Error("Oops?");
        });
    });
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
