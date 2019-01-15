const Mutations = {
  async createBook(parent, args, ctx, info) {
    const book = await ctx.db.mutation.createBook(
      {
        // mutation creates a promise
        data: {
          ...args
        }
      },
      info
    ); // Makes sure book is returned upon creation);
    return book;
  }
};

module.exports = Mutations;
