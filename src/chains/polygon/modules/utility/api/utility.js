const axios = require('axios');
const queryString = require('querystring');
const {baseUrlWithAPIKey} = require('../../../../../utils/urls');

const getConfig = (url) => {
  return {
    method: 'get',
    url: url,
  };
};

const utilitiesByUserAPI = async (filters) => {
  // Get data from database
};

const allUtilitiesAPI = async (filters) => {
  // generate queries
  try {
    // Get data from database
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  allUtilitiesAPI,
  utilitiesByUserAPI,
};
