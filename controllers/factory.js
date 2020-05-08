const { ObjectId } = require('mongoose').Types;
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
function getAll(Model) {
  return catchAsync(async (req, res, next) => {
    let data;
    if (req.query) {
      const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

      data = await features.query;
    } else {
      data = await Model.find();
    }
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: {
        data
      }
    });
  });
}

function getOne(Model, type = '') {
  return catchAsync(async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
      return next(new AppError('id is not valid', 401));
    const data = await Model.findById(req.params.id);
    if (!data) return next(new AppError(`${type}not found`, 404));
    res.status(200).json({
      status: 'success',
      data: {
        data
      }
    });
  });
}

function updateOne(Model, type = '') {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.user.id, req.newReqObj, {
      new: true,
      runValidators: true
    });
    if (!data) return next(new AppError(`${type} not found`, 404));
    res.status(200).json({
      status: 'success',
      data: {
        data
      }
    });
  });
}

function createOne(Model) {
  return catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data
      }
    });
  });
}

function deleteOne(Model) {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        data
      }
    });
  });
}
module.exports = { getAll, getOne, updateOne, createOne, deleteOne };
