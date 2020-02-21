const ProductAdvertisingAPIv1 = require("./paapi5-nodejs-sdk");
const { validISBN } = require("../validISBN");

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

exports.getOfferPrice = isbn => {
  const getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();
  getItemsRequest["PartnerTag"] = process.env.AMAZON_AFFILIATE_TAG;
  getItemsRequest["PartnerType"] = "Associates";
  getItemsRequest["ItemIds"] = [isbn];
  getItemsRequest["Condition"] = "New";
  getItemsRequest["Resources"] = [
    "Offers.Listings.SavingBasis",
    "Offers.Listings.Price"
  ];
  const priceCallback = data => {
    var getItemsResponse = data;
    if (getItemsResponse["ItemsResult"] !== undefined) {
      const result = {};
      var itemInfo = getItemsResponse["ItemsResult"]["Items"][0];
      if (itemInfo) {
        const offers = itemInfo.Offers;
        if (offers) {
          const listings = offers.Listings;
          if (listings && listings.length > 0) {
            const listing = listings[0];
            result.msrp = listing.SavingBasis
              ? Math.round(listing.SavingBasis.Amount * 100)
              : null;
            if (listing.Price) {
              const price = listing.Price;
              result.price = price.Amount
                ? Math.round(price.Amount * 100)
                : null;
              result.currency = price.Currency ? price.Currency : null;
            }
          }
        }
        return result;
      }
    }
    if (getItemsResponse["Errors"] !== undefined) {
      console.log("Errors:");
      console.log(
        "Complete Error Response: " +
          JSON.stringify(getItemsResponse["Errors"], null, 1)
      );
      console.log("Printing 1st Error:");
      var error_0 = getItemsResponse["Errors"][0];
      console.log("Error Code: " + error_0["Code"]);
      console.log("Error Message: " + error_0["Message"]);
    }
  };
  try {
    return api
      .getItems(getItemsRequest, priceCallback)
      .then(res => {
        return priceCallback(res.body);
      })
      .catch(ex => {
        throw new Error(ex);
      });
  } catch (ex) {
    console.log("Something broke! " + ex);
  }
};
