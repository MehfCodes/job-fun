const User = require('./../models/userModel.js');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { getAll, getOne } = require('./factory');
const { ObjectId } = require('mongoose').Types;

function filterReq(obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}

const allUsers = catchAsync(async (req, res, next) => {
  const data = await User.find();
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: {
      data
    }
  });
});

const getUser = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return next(new AppError(`user not found`, 404));
  const data = await User.findById(req.params.id);
  if (!data) return next(new AppError(`${dataType}not found`, 404));
  res.status(200).json({
    status: 'success',
    data: {
      data
    }
  });
});

// TODO :
// 1) config multer
// 2) upload avatar with multer

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'you can not change password directly,please go to /updatePassword',
        403
      )
    );
  }
  if (req.body.role) {
    return next(new AppError('you can not change role directly', 403));
  }
  const newObj = filterReq(req.body, 'username', 'email');
  if (req.file) newObj.avatar = req.file.avatar;
  const user = await User.findByIdAndUpdate(req.user.id, newObj, {
    new: true,
    runValidators: true
  });
  if (!user) return next(new AppError('user not found', 404));
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { isActive: false });
  if (!user) return next(new AppError('user not found', 404));
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

module.exports = {
  allUsers,
  getUser,
  deleteMe,
  updateMe
};
