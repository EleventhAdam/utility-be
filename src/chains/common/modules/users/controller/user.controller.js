const catchAsync = require("../../../../../utils/catchAsync");
const User = require("../models/User");
const {
  getNFTsByUser,
  addToCreatedUtilityService,
  addToRedeemedUtilityService,
  getCreatedUserUtilitiesService,
  getRedeemedUserUtilitiesService,
  getUserProfileService,
  updateUserService,
  getUserProfileByIdService,
} = require("../services/user.service");

const getTotalWalletCount = catchAsync(async (req, res) => {
  const totalWallets = await User.count();
  res.status(200).send({ total: totalWallets });
});

// Will not be used as moved to Next auth, keeping it for reference

// const addUser = catchAsync(async (req, res) => {
//   const { address, chainId, referredBy } = req.body;
//   if (!address) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'No Address found!',
//     });
//   }
//   const userExist = await User.findOne({ address });
//   if (userExist) {
//     res.status(409).json({ msg: 'User already registered!', status: 409 });
//   } else {
//     if (referredBy) {
//       await User.updateOne({ address: referredBy }, {
//         $inc: { 'referralDetails.totalReferred': 1 },
//         $push: { 'referralDetails.referredAddresses': address },
//       });
//     }
//     const user = new User({
//       address,
//       chainUsed: [chainId],
//       referralDetails: {
//         referredBy: referredBy,
//       },
//     });
//     await user.save();
//     await populateMarketStatsApi(STAT_INCREMENT.USER_COUNT);
//     res.status(201).json({ msg: 'Successful', status: 201 });
//   }
// });

const getNFTsOwnedByUser = catchAsync(async (req, res) => {
  let result = [];
  const {
    owner,
    pageSize,
    pageKey,
    contractAddresses,
    withMetadata,
    excludeFilters,
    includeFilters,
    orderBy,
    chainId,
  } = req.query;
  if (owner) {
    result = await getNFTsByUser(
      owner,
      pageSize,
      pageKey,
      contractAddresses,
      withMetadata,
      excludeFilters,
      includeFilters,
      orderBy,
      chainId
    );
  }
  res.status(200).send({ result });
});

const getUser = catchAsync(async (req, res) => {
  const { address } = req.query;
  const user = await User.findOne({ address }).select({
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });
  if (!user) {
    res.status(404).json({
      msg: "No user found.",
      status: 404,
    });
  }

  res.status(200).json({
    msg: "Success",
    status: 200,
    user,
  });
});

// Created for Navansh to update user, needs revamp
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  //const user = await User.findOne({ id })
  // if (!user) {
  //   res.status(404).json({
  //     msg: "No user found.",
  //     status: 404,
  //   });
  // }
  // else{
  await User.findOneAndUpdate(
    { _id: userId },
    { $set: { name: "New Name", email: "new.email@example.com", age: 30 } },
    { new: false } // Set to true to return the updated document
  );
  // }

  res.status(200).json({
    msg: "Success",
    status: 200,
    user,
  });
});

const addToCreatedUtilityController = catchAsync(async (req, res) => {
  const { userId, utilityId } = req.body;
  if (userId !== "" && utilityId !== "") {
    const updationStatus = await addToCreatedUtilityService({
      userId,
      utilityId,
    });
    res.status(200).json({
      msg: "Utility added to user object successfully.",
      status: 200,
      updationStatus: updationStatus,
    });
  } else {
    res.status(400).json({
      msg: "Bad Request",
      status: 400,
    });
  }
});

const addToRedeemedUtilityController = catchAsync(async (req, res) => {
  const { userId, utilityId } = req.body;
  if (userId !== "" && utilityId !== "") {
    const updationStatus = await addToRedeemedUtilityService({
      userId,
      utilityId,
    });
    res.status(200).json({
      msg: "Utility added to user object successfully.",
      status: 200,
      updationStatus: updationStatus,
    });
  } else {
    res.status(400).json({
      msg: "Bad Request",
      status: 400,
    });
  }
});

const getCreatedUtilitiesByUser = catchAsync(async (req, res) => {
  try {
    let userId = req.params.userId;
    let createdUtilities = await getCreatedUserUtilitiesService(userId);
    res.status(200).send({
      utilities: createdUtilities,
    });
  } catch (error) {
    res.status(500).send({
      msg: "There was an error while fetching user created utilities",
      error: error,
    });
  }
});

const getRedeemedUtilitiesByUser = catchAsync(async (req, res) => {
  try {
    let userId = req.params.userId;
    let redeemedUtilities = await getRedeemedUserUtilitiesService(userId);
    res.status(200).send({
      utilities: redeemedUtilities,
    });
  } catch (error) {
    res.status(500).send({
      msg: "There was an error while fetching user redeemed utilities",
      error: error,
    });
  }
});

const getUserProfileController = catchAsync(async (req, res) => {
  try {
    let userName = req.params.userName;
    let user = await getUserProfileService(userName);
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    res.status(500).send({
      msg: "There was an error while fetching user redeemed utilities",
      error: error,
    });
  }
});

const getUserProfileByIdController = catchAsync(async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await getUserProfileByIdService(userId);
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    res.status(500).send({
      msg: "There was an error while fetching user redeemed utilities",
      error: error,
    });
  }
});

const updateUserController = catchAsync(async (req, res) => {
  const { userId, userName, userDescription, profilePhoto, emailId } = req.body;

  if (userId && (userName || userDescription || profilePhoto || emailId)) {
    const updationStatus = await updateUserService({
      userId,
      userName,
      userDescription,
      profilePhoto,
      emailId,
    });

    res.status(200).json({
      msg: "User updated successfully.",
      status: 200,
      updationStatus: updationStatus,
    });
  } else {
    res.status(400).json({
      msg: "Bad Request",
      status: 400,
    });
  }
});
module.exports = {
  getTotalWalletCount,
  getNFTsOwnedByUser,
  getUser,
  addToCreatedUtilityController,
  addToRedeemedUtilityController,
  getCreatedUtilitiesByUser,
  getRedeemedUtilitiesByUser,
  getUserProfileController,
  updateUserController,
  getUserProfileByIdController,
};
