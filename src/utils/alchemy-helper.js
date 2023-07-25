const { Alchemy, Network } = require("alchemy-sdk");
require('dotenv').config();

const getAlchemyInstance = (chainId) =>{
    let alchemySettings;
    switch(chainId){
      case 80001:{
        alchemySettings = {
          apiKey: process.env.ALCHEMY_POLYGON_API_KEY,
          network: Network.MATIC_MUMBAI,
        }; 
        break;
      }
      // Add a chain.
    }
    return new Alchemy(alchemySettings);
}


module.exports = {
    getAlchemyInstance,
}

