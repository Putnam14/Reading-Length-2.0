// THis file connects to the remote Prisma db and gives us the ability to query
const { Prisma } = require("prisma-binding");

const db = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT, //variables.env
  secret: process.env.PRISMA_SECRET,
  debug: false
});

module.exports = db;