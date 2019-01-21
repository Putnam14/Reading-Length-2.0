const { forwardTo } = require("prisma-binding");
const { newBookSearch } = require("../lib/searchAPI");

const Query = {
  book: forwardTo("db"),
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
    return ctx.db.query.bookIndex({ where: { isbn10: res } }, info);
  }
};

module.exports = Query;
