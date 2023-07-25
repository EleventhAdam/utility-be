const express = require('express');
const router = express.Router();
const {
  getAllUtilities,
  createUtilityFunc,
  getUtilityById,
  updateUtility,
  uploadImageToCloudinary,
  updatePublishedStatusController,
  getUtilityAnswerByIdController,
} = require('../controller/utility.controller');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    res.status(200).send({ message: 'Utility Route Working!' });
  } catch (error) {
    console.log(error);
  }
});

router.get('/all', getAllUtilities);

router.get('/:id', getUtilityById);

router.get('/:id/answers',getUtilityAnswerByIdController)

router.put('/:id/claim', updateUtility);

router.post('/create', createUtilityFunc);

router.post('/upload-image', upload.single('file'), uploadImageToCloudinary);

router.put('/change-published-status',updatePublishedStatusController);

module.exports = router;
