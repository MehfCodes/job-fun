const HiringAd = require('./../models/hiringAdModel.js');
const {
  getAll,
  getOne,
  updateOne,
  createOne,
  deleteOne
} = require('./factory');
const { ObjectId } = require('mongoose').Types;
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const allhiringAd = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(HiringAd.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const ads = await features.query;
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: {
      ads
    }
  });
});

const getHiringAd = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return next(new AppError(`data not found`, 404));
  const data = await HiringAd.findById(req.params.id);
  if (!data) return next(new AppError(`data not found`, 404));
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  });
});

// only company can create update and delete hiring ads
const createHiringAd = catchAsync(async (req, res, next) => {
  const data = await HiringAd.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  });
});

const updateHiringAd = catchAsync(async (req, res, next) => {
  const data = await HiringAd.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!data) return next(new AppError(`data not found`, 404));
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  });
});

const deleteHiringAd = catchAsync(async (req, res, next) => {
  const data = await HiringAd.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  });
});

module.exports = {
  allhiringAd,
  getHiringAd,
  createHiringAd,
  updateHiringAd,
  deleteHiringAd
};
