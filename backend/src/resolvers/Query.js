const { forwardTo } = require("prisma-binding");

const Query = {
  book: forwardTo("db"),
  wordCounts: forwardTo("db"),
  bookPreview: forwardTo("db")
};

module.exports = Query;
