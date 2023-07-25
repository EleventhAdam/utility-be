const {ethers} = require('ethers');
const {getChainDetails} = require('../config/network.config');
const {EVENTS, CHAIN_ID} = require('./../config/constants');

const _contractListen = async (chainId, shouldGetRPCProvider) => {
  const {provider, contractAddress} = getChainDetails(chainId, shouldGetRPCProvider);
  const marketplaceInterface = new ethers.utils.Interface('ABI_WILL_COME_HERE');

  let event_name = {
    address: contractAddress,
    topics: [ethers.utils.id(EVENTS.CONTRACT_EXPOSED_EVENT)],
  };

  provider.on(event_name, async (e) => {
    const decodedData = marketplaceInterface.decodeEventLog(EVENTS.CONTRACT_EXPOSED_EVENT, e.data, e.topics);
    console.log(decodedData);
  
    // Make API calls from here if required
  });

};

const polygonContractListen = async () => {
  _contractListen(CHAIN_ID.POLYGON, false);
};

const contractListen = async () => {
  polygonContractListen();
};

module.exports = {contractListen};
