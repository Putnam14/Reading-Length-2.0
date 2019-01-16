const { forwardTo } = require("prisma-binding");

const Query = {
  book: forwardTo("db"),
  wordCounts: forwardTo("db"),
  bookPreview: forwardTo("db"),
  bookSearch(parent, args, ctx, info) {
    const { kw } = args;
    // We'll want to split this out so we query amazon if we don't get a result
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
  }
};

module.exports = Query;
