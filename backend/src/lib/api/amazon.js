const Piranhax = require("piranhax");
const ProductAdvertisingAPIv1 = require("./paapi5-nodejs-sdk");
const { validISBN } = require("../validISBN");
const wait = require("waait");

const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

defaultClient.accessKey = process.env.AMAZON_API_PUBLIC;
defaultClient.secretKey = process.env.AMAZON_API_SECRET;

defaultClient.host = "webservices.amazon.com";
defaultClient.region = "us-east-1";

const api = new ProductAdvertisingAPIv1.DefaultApi();

exports.bookSearch = async searchTerm => {
  const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
  searchItemsRequest["PartnerTag"] = process.env.AMAZON_AFFILIATE_TAG;
  searchItemsRequest["PartnerType"] = "Associates";
  searchItemsRequest["Keywords"] = searchTerm;
  searchItemsRequest["SearchIndex"] = "Books";
  searchItemsRequest["ItemCount"] = 1;
  searchItemsRequest["Resources"] = [
    "Images.Primary.Large", //image
    "Images.Primary.Medium", //medImage
    "ItemInfo.Title", //name
    "ItemInfo.ContentInfo", //pageCount, publishDate
    "ItemInfo.ByLineInfo", //author
    "ItemInfo.ExternalIds" //isbn10
  ];

  const searchItemsCallback = data => {
    var searchItemsResponse = data;
    if (searchItemsResponse["SearchResult"] !== undefined) {
      // console.log(
      //   "Complete Response: \n" + JSON.stringify(searchItemsResponse, null, 1)
      // );
      const result = {};
      var item_0 = searchItemsResponse["SearchResult"]["Items"][0];
      if (item_0) {
        if (item_0.ASIN) {
          result.isbn10 = item_0["ASIN"];
        }
        const itemInfo = item_0.ItemInfo;
        if (itemInfo) {
          const title = itemInfo.Title;
          const byline = itemInfo.ByLineInfo;
          const content = itemInfo.ContentInfo;
          if (title) result.name = title.DisplayValue;
          if (byline && byline.Contributors) {
            const authors = byline.Contributors.filter(contributor => {
              if (contributor.Role == "Author") return contributor;
            });
            if (authors.length > 0) result.author = authors[0].Name;
          }
          if (content) {
            if (content.PublicationDate) {
              result.publishDate = content.PublicationDate.DisplayValue;
            }
            if (content.PagesCount) {
              result.pageCount = content.PagesCount.DisplayValue;
            }
          }
          if (itemInfo.ExternalIds && itemInfo.ExternalIds.ISBNs) {
            const isbns = itemInfo.ExternalIds.ISBNs.DisplayValues.filter(
              id => {
                return validISBN(id);
              }
            );
            if (isbns.length > 0) result.isbn10 = isbns[0];
          }
        }
        if (
          item_0.Images &&
          item_0.Images.Primary &&
          item_0.Images.Primary.Large
        )
          result.image = item_0.Images.Primary.Large.URL;
        if (
          item_0.Images &&
          item_0.Images.Primary &&
          item_0.Images.Primary.Medium
        )
          result.medImage = item_0.Images.Primary.Medium.URL;
        return result;
      }
    }
    if (searchItemsResponse["Errors"] !== undefined) {
      console.log("Errors:");
      console.log(
        "Complete Error Response: " +
          JSON.stringify(searchItemsResponse["Errors"], null, 1)
      );
      console.log("Printing 1st Error:");
      var error_0 = searchItemsResponse["Errors"][0];
      console.log("Error Code: " + error_0["Code"]);
      console.log("Error Message: " + error_0["Message"]);
    }
  };
  try {
    return api
      .searchItems(searchItemsRequest, searchItemsCallback)
      .then(res => {
        return searchItemsCallback(res.body);
      })
      .catch(ex => {
        throw new Error(ex);
      });
  } catch (ex) {
    console.log("Something broke! " + ex);
  }
};

// Unused until Amazon makes public audible running lengths through the API
exports.audibleSearch = searchTerm => {
  const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();

  searchItemsRequest["PartnerTag"] = process.env.AMAZON_AFFILIATE_TAG;
  searchItemsRequest["PartnerType"] = "Associates";
  searchItemsRequest["Keywords"] = searchTerm;
  searchItemsRequest["SearchIndex"] = "Books";
  searchItemsRequest["ItemCount"] = 1;
  searchItemsRequest["Resources"] = [
    "ItemInfo.Classifications",
    "ItemInfo.TechnicalInfo",
    "ItemInfo.Title", //name
    "ItemInfo.Features",
    "ItemInfo.ManufactureInfo",
    "ItemInfo.ProductInfo",
    "ItemInfo.ContentInfo", //pageCount, publishDate
    "ItemInfo.ByLineInfo", //author
    "ItemInfo.ExternalIds" //isbn10
  ];

  const searchItemsCallback = data => {
    var searchItemsResponse = data;
    // console.log(
    //   "Complete Response: \n" + JSON.stringify(searchItemsResponse, null, 1)
    // );
    // get running length
    const runningLength = null;
    return runningLength;
  };
  try {
    api
      .searchItems(searchItemsRequest, searchItemsCallback)
      .then(res => {
        return searchItemsCallback(res.body);
      })
      .catch(ex => {
        throw new Error(ex);
      });
  } catch (ex) {
    console.log("Exception: " + ex);
  }
};

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

exports.audibleSearch = async audibleASINs => {
  try {
    for (let i = 0; i < audibleASINs.length; i++) {
      let ASIN = audibleASINs[i].ASIN;
      let result = await client
        .ItemLookup(ASIN, { ResponseGroup: ["Large"] })
        .then(result => {
          if (result.data()) {
            if (result.data().Item.ItemAttributes.Format === "Unabridged") {
              return result.data().Item.ItemAttributes.RunningTime._;
            }
          }
        })
        .catch(err => {
          throw new Error(
            `Something went wrong looking up audible version for ${ASIN}: ${err}`
          );
        });
      if (result > 0) {
        i = audibleASINs.length;
        return result;
      }
      await wait(500);
    }
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
