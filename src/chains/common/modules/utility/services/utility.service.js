const {
  addToRedeemedUtility,
  hasClaimedUtilility,
  isUserEligibleToClaimUtility,
} = require('../../users/api/user');
const {
  getAllUtilities,
  createUtility,
  getUtilityById,
  updateUtilityApi,
  uploadImage,
  updatePublishedStatus,
  getUtilityUserAnswers,
} = require('../api/utility');

const getAllUtility = async () => {
  try {
    const utilities = await getAllUtilities();
    return utilities;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUtilityFunc = async ({
  title,
  description,
  image,
  confirmationTitle,
  confirmationDescription,
  nftCollectionName,
  nftCollectionAddress,
  startDate,
  endDate,
  claims,
  tags,
  creator,
  claimLink,
  published,
  creatorQuestions,
}) => {
  // Maipulation with the data if needed goes here.
  try {
    const utility = await createUtility({
      title,
      description,
      image,
      confirmationTitle,
      confirmationDescription,
      nftCollectionName,
      nftCollectionAddress,
      startDate,
      endDate,
      claims,
      tags,
      creator,
      claimLink,
      published,
      creatorQuestions,
    });
    return utility;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUtilityByIdService = async (id, userId) => {
  try {
    const utility = await getUtilityById(id);
    const isEligible = await isUserEligibleToClaimUtility(
      userId,
      utility?.nftCollectionAddress
    );
    if (isEligible) {
      const hasClaimedUtility = await hasClaimedUtilility(userId, id);
      utility['isClaimed'] = hasClaimedUtility;
    }
    utility['isEligible'] = isEligible;
    return utility;
  } catch (error) {
    console.error('Error retrieving utility:', error);
    throw error;
  }
};

const getUtilityAnswersByIdService = async (id) => {
  try {
    const answers = await getUtilityUserAnswers(id);
    return answers;
  } catch (error) {
    console.error('Error retrieving utility:', error);
    throw error;
  }
};

const updateUtilityService = async (id, userId, answers) => {
  try {
    // TODO: Check whether this userId is eligible to claim this utility or not
    // If not then return from here
    const result = await updateUtilityApi(id, userId, answers);
    await addToRedeemedUtility({ userId: userId, utilityId: id });
    return result;
  } catch (error) {
    console.error('Error retrieving utility claim link:', error);
    throw error;
  }
};

const uploadImageFunc = async (imageFile) => {
  try {
    const image = await uploadImage(imageFile);
    return image.secure_url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePublishedStatusService = async (params) => {
  try {
    const response = await updatePublishedStatus(params);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllUtility,
  createUtility: createUtilityFunc,
  isUserEligibleToClaimUtility,
  getUtilityByIdService,
  updateUtilityService,
  uploadImage: uploadImageFunc,
  updatePublishedStatusService,
  getUtilityAnswersByIdService
};
