const express = require('express');
const {getUtilitiesByUser, getAllUtilities} = require('../controller/utility.controller');
const router = express.Router();

router.use(express.json());

// get utilities by user
router.get('/getutilitiesbyuser', getUtilitiesByUser);

// get all utilities via paging
router.get('/getallutilities', getAllUtilities);

//router.post('/saveutility', saveUtility);

//router.post('/publishutility', publishUtility);

module.exports = router;
