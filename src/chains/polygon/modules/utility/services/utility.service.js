const {allUtilitiesAPI, utilitiesByUserAPI} = require('../api/utility');

const allUtilities = async (filter) => {
  const withMetadata = true;
  return await allUtilitiesAPI(contractAddress, withMetadata, limit, startToken, chainId);
  // Get listed item from marketplace contract by contractAddess
  // Append the price and flag to mark that NFT up for sale
};

const utilitiesByUser = async (filters) =>{
  const metadata = await utilitiesByUserAPI(contractAddress, chainId);
  return metadata;
};

module.exports = {
  allUtilities,
  utilitiesByUser,
};
