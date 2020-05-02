// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// // const User = require('../models/userModel');
// // const Company = require('./../models/companyModel');
// const AppError = require('../utils/appError');
// const Email = require('../utils/email');
// const catchAsync = require('../utils/catchAsync');

// function generateToken(id) {
//   return jwt.sign({ id }, process.env.SECRET_KEY, {
//     expiresIn: process.env.EXPIRE_TOKEN
//   });
// }

// function createAndSendToken(doc, res, status) {
//   const token = generateToken(doc._id);

//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true
//   };
//   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//   res.cookie('jwt', token, cookieOptions);
//   res.status(200).json({
//     status,
//     token,
//     data: {
//       doc
//     }
//   });
// }

// const signUpF = Model => {
//   return catchAsync(async (req, res) => {
//     switch (Model) {
//       case User:
//         const newUser = await User.create({
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//           passwordConfirm: req.body.passwordConfirm,
//           role: 'user'
//         });
//         createAndSendToken(newUser, res, 'success');
//         // TODO : send welcome message to user email with user's profile url
//         break;

//       default:
//         break;
//     }
//   });
// };

// const loginF = Model =>
//   catchAsync(async (req, res, next) => {
//     const { email, password } = req.body;

//     const doc = await Model.findOne({ email });
//     if (!doc) {
//       return next(new AppError('user with this email not found ', 404));
//     }
//     const isCorrect = await doc.isPasswordCorrect(password, user.password);
//     if (!isCorrect) {
//       next(new AppError('password not correct ', 403));
//     } else {
//       createAndSendToken(doc, res, 'success');
//     }
//   });

// const forgotPasswordF = Model =>
//   catchAsync(async (req, res, next) => {
//     let doc;
//     try {
//       // get doc base on post email
//       doc = await Model.findOne({ email: req.body.email });
//       if (!doc) return next(new AppError('doc not found', 404));

//       // generate the random reset token
//       const resetToken = doc.createResetPasswordToken();
//       await doc.save({ validateBeforeSave: false });

//       // send it to the doc email
//       const resetURL = `${req.protocol}://${req.get(
//         'host'
//       )}/api/vi/users/resetPassword/${resetToken}`;

//       // const message = `Forgot your password? Submit a PATCH request with
//       // your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password,
//       //  please ignore this email!`;

//       await new Email(doc, resetURL).sendPasswordReset();

//       res.status(200).json({
//         status: 'success',
//         message: 'Token sent to the email '
//       });
//     } catch (error) {
//       doc.resetPasswordToken = undefined;
//       doc.resetPasswordExpires = undefined;
//       await doc.save({ validateBeforeSave: false });
//       return next(
//         new AppError('There was an error sending the email. Try again later!'),
//         500
//       );
//     }
//   });

// const resetPasswordF = Model =>
//   catchAsync(async (req, res, next) => {
//     // get doc by token
//     const hashedToken = crypto
//       .createHash('sha256')
//       .update(req.params.token)
//       .digest('hex');

//     const doc = await Model.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() }
//     });
//     if (!user)
//       return next(new AppError('Token is invalid or has expired', 400));
//     // update password
//     doc.password = req.body.newPassword;
//     doc.passwordConfirm = req.body.newPasswordConfirm;
//     doc.resetPasswordToken = undefined;
//     doc.resetPasswordExpires = undefined;
//     doc.changedPasswordAt = Date.now();
//     await doc.save();
//     // generate new jwttoken
//     createAndSendToken(doc, res, 'success');
//   });

// const updatePasswordF = Model =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.findById(req.user.id);
//     if (!doc) throw new Error('please login');
//     const isCorrect = await doc.isPasswordCorrect(
//       req.body.currentPassword,
//       doc.password
//     );
//     if (!isCorrect)
//       return next(new AppError('your current password is not true', 401));

//     doc.password = req.body.newPassword;
//     doc.passwordConfirm = req.body.newPasswordConfirm;
//     doc.changedPasswordAt = Date.now();
//     await doc.save();
//     createAndSendToken(doc, res, 'success');
//   });

// module.exports = {
//   signUpF,
//   loginF,
//   forgotPasswordF,
//   resetPasswordF,
//   updatePasswordF
// };
