const { forwardTo } = require("prisma-binding");

const Query = {
  book: forwardTo("db")
};

module.exports = Query;
