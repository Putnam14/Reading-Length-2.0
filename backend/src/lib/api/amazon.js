const Piranhax = require("piranhax");

const credentials = {
  pubKey: process.env.AMAZON_API_PUBLIC,
  secKey: process.env.AMAZON_API_SECRET,
  affTag: process.env.AMAZON_AFFILIATE_TAG
};

const client = new Piranhax(
  credentials.pubKey,
  credentials.secKey,
  credentials.affTag
);

client.setLocale("US");

exports.bookSearch = async searchTerm => {
  const result = await client
    .ItemSearch("Books", {
      Keywords: searchTerm,
      ResponseGroup: ["Large,AlternateVersions"]
    })
    .then(results => {
      if (Array.isArray(results.data().Item)) {
        const book = results.data().Item.find(item => {
          return item.ItemAttributes.ISBN;
        });
        return book;
      }
      return results.data().Item;
    })
    .catch(err => {
      console.log("Why error?", err);
    });
  return result;
};

exports.audibleSearch = async audibleASIN => {
  const result = await client
    .ItemLookup(audibleASIN, { ResponseGroup: ["Large"] })
    .then(result => result.data().Item.ItemAttributes.RunningTime._);
  return result;
};
