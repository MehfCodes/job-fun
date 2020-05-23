const fs = require('fs');
const AppError = require('../../utils/appError');

const filterReq = (req, res, next) => {
  const newReq = {};
  const notAllowedFields = [
    'password',
    'passwordConfirm',
    'isActive',
    'createdAt',
    'changedPasswordAt',
    'resetPasswordToken',
    'resetPasswordExpires'
  ];
  // filter req for prevent to change notAllowedFields in database
  Object.keys(req.body).forEach(el => {
    if (!notAllowedFields.includes(el)) newReq[el] = req.body[el];
    else {
      // check if there is a member of notAllowedFields with avatar in req
      if (req.body.avatar) {
        // prevent to upload that avatar and write it in disk (remove it from disk after recive req)
        fs.unlinkSync(`public/uploads/users/images/${req.body.avatar}`);
      }
      return next(new AppError(`you can not change ${el} directly`, 403));
    }
  });

  req.body = { ...newReq };
  next();
};
module.exports = filterReq;
