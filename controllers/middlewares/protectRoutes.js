const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../../models/userModel');
const AppError = require('./../../utils/appError');
const catchAsync = require('./../../utils/catchAsync');

const protectUserRoutes = catchAsync(async (req, res, next) => {
  // check if token exist ot not
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ');
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError('there is not token', 401));

  // verification token
  const decode = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

  // check if user still exist or not
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError('the user belonging to this token is not exist', 404)
    );
  }
  // if user changed password after token was issued
  if (currentUser.isPasswordChange(decode.iat)) {
    return next(new Error('password changed , please login again', 401));
  }
  req.user = currentUser;
  next();
});

module.exports = {
  protectUserRoutes
};
