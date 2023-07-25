const {ethers} = require('ethers');
const config = require('./config');

const {getProvider, getDefaultProvider} = require('../utils/setup');
const {CHAIN_ID} = require('./constants');

const getChainDetails = (chainId, shouldGetRPCProvider = true) => {
  const provider = shouldGetRPCProvider ? getProvider(chainId) : getDefaultProvider(chainId);
  switch (chainId) {
    case CHAIN_ID.POLYGON:
      return {
        provider: provider,
        contractAddress: config.YOUR_CONTRACT_ADDRESS,
      };
    default:
      return {
        provider: provider,
      };
  }
};

const getContractObject = (chainId) => {
  // const {provider, marketplaceContractAddress} = getChainDetails(chainId);
  // const currentMarketplaceContract = new ethers.Contract(
  //     address,
  //     ABI,
  //     provider,
  // );
  // return currentMarketplaceContract;
};

module.exports = {
  getChainDetails,
  getContractObject
};
