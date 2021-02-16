const { response, request } = require("express");
const express = require("express");
const router = express.Router();
// Importing Kijiji scrapper
const kijiji = require("kijiji-scraper");

router
// Endpoint to get search results
.get('/', (request, response) => {
  let searchResults = [];
  // Options for Kijiji search
  const options = {
    minResults: 20
  };
  // Params for Kijiji search
  let params = {
    q: request.body.searchTerm,
    locationId: kijiji.locations.BRITISH_COLUMBIA.GREATER_VANCOUVER_AREA,
    categoryId: kijiji.categories.BUY_AND_SELL,
    priceType: 'SPECIFIED_AMOUNT',
    maxPrice: 700
  };
  // Pulling the ads using Kijiji scrapper
  kijiji
  .search(params, options)
  .then((ads) => {
    // Filtering the results that are for sale by owner
    // and are being 'offered' not 'wanted'
    searchResults = ads.filter(ad => ad.attributes.forsaleby === 'ownr' && ad.attributes.type === 'OFFERED')
    // Returning the ads as a response
    return response.status(200).send(searchResults);
  })
  .catch(err => console.log(err));
})

module.exports = router;