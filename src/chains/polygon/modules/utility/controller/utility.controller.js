const catchAsync = require('../../../../../utils/catchAsync');
const {utilitiesByUser, allUtilities} = require('../services/utility.service');

const getAllUtilities = catchAsync(async (req, res) => {
  // Placeholder code
  let result = [];
  const {filters} = req.query;
  if (filters) {
    result = await allUtilities(filters);
  }
  res.status(200).send({result});
});

const getUtilitiesByUser = catchAsync(async (req, res) => {
  let result = [];
  const {filters} = req.query;
  if (filters) {
    result = await utilitiesByUser(filters);
  }res.status(200).send({result});
});


module.exports = {
  getAllUtilities,
  getUtilitiesByUser,
};
