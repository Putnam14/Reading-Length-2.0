const { forwardTo } = require("prisma-binding");
const searchAPI = require("../lib/searchAPI");

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
    const res = await searchAPI(searchTerm, ctx);
    console.log(res);
    return ctx.db.query.bookIndex({ where: { isbn10: res } }, info);
  }
};

module.exports = Query;
