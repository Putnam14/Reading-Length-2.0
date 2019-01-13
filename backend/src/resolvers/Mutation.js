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
    ); // Makes sure item is returned upon creation);
    return item;
  }
};

module.exports = Mutations;
