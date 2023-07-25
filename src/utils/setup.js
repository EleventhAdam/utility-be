const ethers = require('ethers');
const {baseUrlWithAPIKey} = require('./urls');

const getProvider = (chainId) => {
  const provider = new ethers.providers.JsonRpcProvider(baseUrlWithAPIKey(chainId));
  return provider;
};

const getDefaultProvider = (chainId) => {
  const provider = new ethers.getDefaultProvider(chainId);
  return provider;
};


module.exports = {
  getProvider,
  getDefaultProvider
};
