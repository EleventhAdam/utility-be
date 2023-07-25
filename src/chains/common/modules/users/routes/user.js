const express = require('express');
const router = express.Router();
const {
  getTotalWalletCount,
  getNFTsOwnedByUser,
  getUser,
  addToCreatedUtilityController,
  addToRedeemedUtilityController,
  getUserProfileController,
  getCreatedUtilitiesByUser,
  getRedeemedUtilitiesByUser,
  updateUserController,
  getUserProfileByIdController
} = require('../controller/user.controller');

router.use(express.json());

// Example.
router.get('/', async (req, res) => {
  try {
    res.status(200).send([]);
  } catch (error) {
    console.log(error);
  }
});

router.get('/walletcount', getTotalWalletCount);

router.get('/nfts', getNFTsOwnedByUser);

router.get('/user', getUser);

router.patch('/update-user', updateUserController);

router.get('/:userName/user-offering',getUserProfileController);

router.get('/:userId/profile',getUserProfileByIdController);

router.get('/:userId/utilities/created', getCreatedUtilitiesByUser);

router.get('/:userId/utilities/redeemed', getRedeemedUtilitiesByUser);

router.post('/add-utility', addToCreatedUtilityController);

router.post('/add-redeemed-utility', addToRedeemedUtilityController);

module.exports = router;
