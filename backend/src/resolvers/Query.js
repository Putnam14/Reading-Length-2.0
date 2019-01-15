const { forwardTo } = require("prisma-binding");

const Query = {
  book: forwardTo("db"),
  wordCounts: forwardTo("db"),
  bookPreviews: forwardTo("db")
};

module.exports = Query;
