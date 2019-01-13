const { GraphQLServer } = require("graphql-yoga"); // Bundled Apollo, express, graphql, etc.
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

// Create the GraphQL Yoga server

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql", // Basically our API
    resolvers: {
      // How do we get data to the end user?
      Mutation, // These need to be in schema.graphql, e.g. type Mutation { ... }
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db }) // Surface db on every request
  });
}

module.exports = createServer;
