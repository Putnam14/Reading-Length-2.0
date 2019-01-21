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

exports.bookSearch = searchTerm => {
  return client
    .ItemSearch("Books", {
      Keywords: searchTerm,
      ResponseGroup: ["Large,AlternateVersions"]
    })
    .then(results => {
      // Return the first item
      return results.data().Item[0];
    })
    .catch(err => {
      console.log("Why error?", err);
    });
};
