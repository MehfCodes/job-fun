const User = require('./../models/userModel.js');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { getAll, getOne, updateOne } = require('./factory');

const allUsers = getAll(User);
const getUser = getOne(User, 'user');
const updateMe = updateOne(User, 'user');
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
