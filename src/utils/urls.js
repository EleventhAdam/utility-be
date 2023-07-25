const baseUrlWithAPIKey = (chain = 1) => {
  const mumbaiBaseUrl = 'https://polygon-mumbai.g.alchemy.com/v2/'+ process.env.ALCHEMY_MUMBAI_API_KEY;
  const polygonBaseUrl = 'https://polygon.g.alchemy.com/v2/'+ process.env.ALCHEMY_POLYGON_API_KEY; 
  if (parseInt(chain) === 137) {
    return polygonBaseUrl;
  } else {
    return mumbaiBaseUrl;
  }
};


module.exports = {
  baseUrlWithAPIKey
};
