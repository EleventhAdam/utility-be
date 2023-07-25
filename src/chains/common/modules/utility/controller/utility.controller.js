const catchAsync = require("../../../../../utils/catchAsync");
const {
  getAllUtility,
  createUtility,
  getUtilityByIdService,
  updateUtilityService,
  uploadImage,
  updatePublishedStatusService,
  getUtilityAnswersByIdService
} = require("../services/utility.service");

const getAllUtilities = catchAsync(async (req, res) => {
  try {
    let result = [];
    result = await getAllUtility();
    res.status(200).send({
      result,
    });
  } catch (error) {
    res.status(500).send({
      msg: "There was an error while fetching all utilities",
      error: error,
    });
  }
});

const createUtilityFunc = catchAsync(async (req, res) => {
  const {
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
    claimLink,
    creator,
    published,
    creatorQuestions,
  } = req.body;
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
      claimLink,
      creator,
      published,
      creatorQuestions,
    });
    res.status(200).send({
      utility,
    });
  } catch (error) {
    res.status(400).send({
      msg: "There was an error creating utility.",
      error: error,
    });
  }
});

const getUtilityById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const {userId} = req.query;
    const utility = await getUtilityByIdService(id, userId);
    res.status(200).send({
      utility,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Cannot fetch the utility",
      error: error,
    });
  }
});
const getUtilityAnswerByIdController = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const userAnswers = await getUtilityAnswersByIdService(id);
    res.status(200).send({
      userAnswers,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Cannot fetch the utility",
      error: error,
    });
  }
});

const updateUtility = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, answers } = req.body;
    if (id && userId) {
      const result = await updateUtilityService(id, userId, answers);
      res.status(200).send(result);
    } else {
      res.status(401).send({
        msg: "Unauthorised attempt",
      });
    }
  } catch (error) {
    res.status(error?.code || 500).send({
      msg: error?.message || "Something went wrong!",
      error: error,
    });
  }
});

const uploadImageToCloudinary = catchAsync(async (req, res) => {
  const file = req.file.buffer;
  try {
    const imageUrl = await uploadImage(file);
    res.status(200).send({
      imageUrl,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Cannot upload the image to cloudinary",
      error: error,
    });
  }
});

const updatePublishedStatusController = catchAsync(async (req, res) => {
  const { userId, utilityId } = req.body;
  try {
    const response = await updatePublishedStatusService({ userId, utilityId });
    res.status(200).send({
      updatedUtil: response,
    });
    return response;
  } catch (error) {
    res.status(500).send({
      msg: "Cannot update the published status.",
      error: error,
    });
  }
});

module.exports = {
  getAllUtilities,
  createUtilityFunc,
  getUtilityById,
  updateUtility,
  uploadImageToCloudinary,
  updatePublishedStatusController,
  getUtilityAnswerByIdController
};
