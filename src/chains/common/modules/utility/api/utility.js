const { v2: cloudinary } = require('cloudinary');
const Utility = require('../models/Utility');
require('dotenv').config();
const streamifier = require('streamifier');
const { default: mongoose } = require('mongoose');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const validateParams = (params, fields) => {
  fields.forEach((field) => {
    // Image can be optional,
    // TODO: Check only for mandatory fields not for all
    if (field !== 'image' && params[field] === undefined) {
      throw new Error(`Invalid parameter: ${field}`);
    }
  });
};

const createUtility = async (params) => {
  const fields = [
    'title',
    'description',
    'image',
    'confirmationTitle',
    'confirmationDescription',
    'nftCollectionName',
    'nftCollectionAddress',
    'startDate',
    'endDate',
    'claims',
    'claimLink',
    'creator',
    'published',
  ];

  try {
    validateParams(params, fields);
    const utility = new Utility({
      title: params.title,
      description: params.description,
      image: params.image,
      confirmationTitle: params.confirmationTitle,
      confirmationDescription: params.confirmationDescription,
      nftCollectionName: params.nftCollectionName,
      nftCollectionAddress: params.nftCollectionAddress,
      startDate: params.startDate,
      endDate: params.endDate,
      claims: params.claims,
      claimLink: params.claimLink,
      tags: params.tags,
      creator: params.creator,
      creatorQuestions: params.creatorQuestions,
      published: params.published,
    });
    const createdUtility = await utility.save();
    return createdUtility._id;
  } catch (error) {
    console.error('Error creating utility:', error);
    throw error;
  }
};

const getAllUtility = async (params) => {
  try {
    const utilities = await Utility.find().select(
      'title description claims image nftCollectionName'
    );
    return utilities;
  } catch (error) {
    console.error('Error retrieving utilities:', error);
    throw error;
  }
};

const getUtilityById = async (id) => {
  try {
    const utility = await Utility.findById(id)
      .select(
        'title description image nftCollectionName nftCollectionAddress startDate endDate claims creator creatorQuestions'
      )
      .populate({ path: 'creator', select: 'address' })
      .lean();
    return utility;
  } catch (error) {
    console.error('Error retrieving utility:', error);
    throw error;
  }
};

const getUtilityUserAnswers = async (id) => {
  try {
    const answers = await Utility.findById(id)
    .select(
     'userAnswers'
    ).exec();
    return answers.userAnswers;
  } catch (error) {
    console.error("Error retrieving utility:", error);
    throw error;
  }
};

const updateUtilityApi = async (id, userId, answers) => {
  try {
    const utility = await Utility.findById(id);

    if (utility?.claims.claimed < utility?.claims.total) {
      utility.claims.claimed = utility.claims.claimed + 1;
      utility.userAnswers.push({
        userId: userId,
        value: answers,
      });
      await utility.save();
      return {
        claimData: utility.claimLink,
        confirmationTitle: utility?.confirmationTitle,
        confirmationDesc: utility?.confirmationDescription,
      };
    }
    throw { code: 403, message: 'Just missed it! Fully claimed' };
  } catch (error) {
    console.error('Error retrieving utility claim link:', error);
    throw error;
  }
};
// Helper for Image Upload.
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadImage = async (file) => {
  try {
    const result = await streamUpload(file);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePublishedStatus = async (params) => {
  const { userId, utilityId } = params;
  try {
    const util = await Utility.findById(utilityId);
    if (!util) {
      throw new Error('Utility Not found.');
    }
    if (util.creator.toString() !== userId) {
      throw new Error('Not allowed.');
    }
    util.published = !util.published;
    const updatedUtil = await util.save();
    return updatedUtil;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllUtilities: getAllUtility,
  createUtility: createUtility,
  getUtilityById: getUtilityById,
  updateUtilityApi,
  uploadImage: uploadImage,
  updatePublishedStatus,
  getUtilityUserAnswers,
};
