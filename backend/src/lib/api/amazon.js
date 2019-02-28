const Piranhax = require("piranhax");
const wait = require("waait");

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
      throw new Error(err);
    });
  return result;
};

exports.audibleSearch = async audibleASIN => {
  await wait(500);
  try {
    const result = await client
      .ItemLookup(audibleASIN, { ResponseGroup: ["Large"] })
      .then(result => {
        if (result.data())
          return result.data().Item.ItemAttributes.RunningTime._;
      })
      .catch(err => {
        console.log(
          `Something went wrong looking up audible version for ${audibleASIN}`
        );
        throw new Error(err);
      });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.amazonPrices = async isbn => {
  await wait(750);
  try {
    const result = await client
      .ItemLookup(isbn, { ResponseGroup: ["Medium,Offers"] })
      .then(result => {
        if (result.data()) return result.data().Item;
      })
      .catch(err => {
        throw new Error(err);
      });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
