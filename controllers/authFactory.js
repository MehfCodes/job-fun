const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
const catchAsync = require('./../utils/catchAsync');

function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TOKEN
  });
}

function createAndSendToken(user, res, status) {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  res.status(200).json({
    status,
    token,
    data: {
      user
    }
  });
}
const signUp = Model => {
  return catchAsync(async (req, res) => {
    const newUser = await Model.create(req.body);
    createAndSendToken(newUser, res, 'success');
    // TODO : send welcome message to user email with user's profile url
  });
};
const login = Model => {
  return catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //
    const user = await Model.findOne({ email });
    if (!user) {
      return next(new AppError('user with this email not found ', 404));
    }
    const isCorrect = await user.isPasswordCorrect(password);
    if (!isCorrect) {
      next(new AppError('password not correct ', 403));
    } else {
      createAndSendToken(user, res, 'success');
    }
  });
};

const forgotPassword = Model => {
  return catchAsync(async (req, res, next) => {
    let user;
    try {
      // get user base on post email
      user = await Model.findOne({ email: req.body.email });
      if (!user) return next(new AppError('user not found', 404));

      // generate the random reset token
      const resetToken = user.createResetPasswordToken();
      await user.save({ validateBeforeSave: false });

      // create resetUrl and send resetToken to the user's email
      // to reset password
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/vi/users/resetPassword/${resetToken}`;

      // send email
      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: 'success',
        message: 'Token sent to the email '
      });
    } catch (error) {
      // below properties get their value when invoke user.createResetPasswordToken()
      // if error happen we have to change their value to undefined
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
  });
};
const resetPassword = Model => {
  return catchAsync(async (req, res, next) => {
    // generate random string to define a token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    // get user by token
    const user = await Model.findOne({
      // check are hashedToekn and token which generate in model(user) equal?
      resetPasswordToken: hashedToken,
      // check does token expire ?
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user)
      return next(new AppError('Token is invalid or has expired', 400));
    // update password
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.changedPasswordAt = Date.now();
    await user.save();
    // generate new jwt token
    createAndSendToken(user, res, 'success');
  });
};

const updatePassword = Model => {
  return catchAsync(async (req, res, next) => {
    const user = await Model.findById(req.user.id);
    if (!user) throw new Error('please login');
    const isCorrect = await user.isPasswordCorrect(
      // for update password you must input old password
      req.body.currentPassword,
      user.password
    );
    if (!isCorrect)
      return next(new AppError('your current password is not true', 401));

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    user.changedPasswordAt = Date.now();
    await user.save();
    createAndSendToken(user, res, 'success');
  });
};

module.exports = {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword
};
