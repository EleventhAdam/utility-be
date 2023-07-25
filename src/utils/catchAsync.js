const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    next(error);
    res.json({error});
  });
};

module.exports = catchAsync;
