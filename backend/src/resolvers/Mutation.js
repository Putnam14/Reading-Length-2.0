const Mutations = {
  async createBook(parent, args, ctx, info) {
    const book = await ctx.db.mutation.createBook(
      {
        data: {
          ...args
        }
      },
      info
    );
    console.log("Book: " + book);
    // const bookIndex = await ctx.db.mutation.createBookIndex()
    return book;
  }
};

module.exports = Mutations;
