const axios = require("axios");
const queryString = require("querystring");
const { baseUrlWithAPIKey } = require("../../../../../utils/urls");
const { getAlchemyInstance } = require("../../../../../utils/alchemy-helper");
const User = require("../models/User");

const getConfig = (url) => {
  return {
    method: "get",
    url: url,
  };
};

// Not in use
const getNFTSByContractAPI = async (params, chainId) => {
  // const baseURLWithApiKey = `${baseUrl}${process.env.ALCHEMY_TESTNET_API_KEY}`;
  const baseUrl = baseUrlWithAPIKey(chainId || 2);
  const endpoint = "/getNFTs";
  const url = `${baseUrl + endpoint}?${queryString.stringify(params)}`;
  try {
    const result = await axios(getConfig(url));
    return result["data"];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNFTByUserAddress = async (params, chainId = 80001) => {
  const alchemy = getAlchemyInstance(chainId);
  try {
    const results = await alchemy.nft.getNftsForOwner(params.owner);
    const ownedNfts = results.ownedNfts;
    let id = 0;
    let toSend = [];
    if (Array.isArray(ownedNfts) && ownedNfts.length) {
      ownedNfts.forEach((nft) => {
        if (!nft.contract.name) return;
        id++;
        toSend.push({
          id: id,
          name: nft.contract.name,
          address: nft.contract.address,
        });
      });
    }
    return toSend;
  } catch (error) {
    console.error(
      "An unexpected error occoured while fetching user NFTs :",
      error
    );
    throw error;
  }
};

const addToCreatedUtility = async (params) => {
  const { userId, utilityId } = params;
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $push: { "utilities.created": utilityId } }
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addToRedeemedUtility = async (params) => {
  const { userId, utilityId } = params;
  try {
    const result = await User.updateOne(
      { address: userId },
      { $push: { "utilities.redeemed": utilityId } }
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCreatedUserUtilities = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select("utilities.created")
      .populate({
        path: "utilities.created",
        select: "title description image claims nftCollectionName _id",
      });
    return user.utilities.created;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRedeemedUserUtilities = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select("utilities.redeemed")
      .populate({
        path: "utilities.redeemed",
        select: "-userAnswers -claimLink",
      });
    return user?.utilities.redeemed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const isUserEligibleToClaimUtility = async (userId, nftCollectionAddress) => {
  try {
    let isEligible = false;
    // This step can be avoided if we pass wallet address from client
    const userWalletAddress = await User.findOne({ userId })
      .select("address")
      .lean();
    const userOwnedCollections = await getNFTByUserAddress(
      { owner: userWalletAddress?.address },
      80001
    );
    for (let index = 0; index < userOwnedCollections.length; index++) {
      const collection = userOwnedCollections[index];
      if (collection?.address === nftCollectionAddress) {
        isEligible = true;
        break;
      }
    }
    return isEligible;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const hasClaimedUtilility = async (userId, utilityId) => {
  try {
    const utilityExist = await User.findOne({
      userId,
      "utilities.redeemed": { $in: [utilityId] },
    });
    return utilityExist ? true : false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserProfile = async (userName) => {
  try {
    const user = await User.findOne({userName})
      .select(
        "address userName userDescription profilePhoto utilities.created utilities.redeemed"
      )
      .populate({
        path: "utilities.created",
        select:
          "title description image published claims endDate creator nftCollectionName _id",
        match: { published: true },
      });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserProfileById = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select(
        "address userName userDescription profilePhoto utilities.created utilities.redeemed"
      )
      .populate({
        path: "utilities.created utilities.redeemed",
        select:
          "title description confirmationTitle confirmationDescription claimLink image published claims endDate creator nftCollectionName _id",
        match: { published: true },
      });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUser = async (params) => {
  const { userId, userName, userDescription, profilePhoto, emailId } = params;
  try {
    const updateFields = {};

    if (profilePhoto !== null && profilePhoto !== undefined) {
      updateFields.profilePhoto = profilePhoto;
    }

    updateFields.userName = userName;
    updateFields.userDescription = userDescription;
    updateFields.emailId = emailId;

    const result = await User.updateOne(
      { _id: userId },
      {
        $set: updateFields,
      }
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getNFTSByContractAPI,
  getNFTByUserAddress,
  addToCreatedUtility,
  addToRedeemedUtility,
  getCreatedUserUtilities,
  getRedeemedUserUtilities,
  getUserProfile,
  updateUser,
  hasClaimedUtilility,
  isUserEligibleToClaimUtility,
  getUserProfileById
};
