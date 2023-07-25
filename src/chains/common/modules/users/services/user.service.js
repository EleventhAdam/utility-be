const {
  getNFTSByContractAPI,
  getNFTByUserAddress,
  addToCreatedUtility,
  addToRedeemedUtility,
  getCreatedUserUtilities,
  getRedeemedUserUtilities,
  getUserProfile,
  updateUser,
  getUserProfileById
} = require("../api/user");

const getNFTsByUser = async (
  owner,
  pageSize = 16,
  pageKey,
  contractAddresses = [],
  withMetadata = false,
  excludeFilters = [],
  includeFilters = [],
  orderBy,
  chainId
) => {
  const params = {
    owner,
    pageSize,
    withMetadata,
  };
  // Pass only if params received from frontend
  if (pageKey) {
    params["pageKey"] = pageKey;
  }
  if (contractAddresses?.length > 0) {
    params["contractAddresses"] = contractAddresses;
  }
  if (includeFilters?.length > 0) {
    params["includeFilters"] = includeFilters;
  }
  if (excludeFilters?.length > 0) {
    params["excludeFilters"] = excludeFilters;
  }
  if (orderBy) {
    params["orderBy"] = orderBy;
  }
  return await getNFTByUserAddress(params, chainId);
};

const addToCreatedUtilityService = async (params) => {
  try {
    const status = await addToCreatedUtility(params);
    return status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addToRedeemedUtilityService = async (params) => {
  try {
    const status = addToRedeemedUtility(params);
    return status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCreatedUserUtilitiesService = async (param) => {
  try {
    const result = await getCreatedUserUtilities(param);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRedeemedUserUtilitiesService = async (param) => {
  try {
    const result = await getRedeemedUserUtilities(param);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserProfileService = async (userName) => {
  try {
    const result = await getUserProfile(userName);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserProfileByIdService = async (userId) => {
  try {
    const result = await getUserProfileById(userId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUserService = async (params) => {
  try {
    const status = await updateUser(params);
    return status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getNFTsByUser,
  addToCreatedUtilityService,
  addToRedeemedUtilityService,
  getCreatedUserUtilitiesService,
  getRedeemedUserUtilitiesService,
  getUserProfileService,
  updateUserService,
  getUserProfileByIdService
};
