const AppError = require('./../../utils/appError');
const allowedFields = (req, res, next) => {
  const newReq = {};
  const notAllowedFields = [
    'password',
    'passwordConfirm',
    'createdAt',
    'changedPasswordAt',
    'resetPasswordToken',
    'resetPasswordExpires'
  ];
  Object.keys(req.body).forEach(el => {
    if (!notAllowedFields.includes(el)) newReq[el] = req.body[el];
    else {
      return next(
        new AppError(
          `you can not change ${el} directly,please go to /updatePassword`,
          403
        )
      );
    }
  });

  if (req.file) newReq.avatar = req.file.avatar;
  req.newReqObj = { ...newReq };
  next();
};
module.exports = { allowedFields };
