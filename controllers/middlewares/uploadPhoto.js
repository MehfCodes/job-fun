const multer = require('multer');
const path = require('path');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/users/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-user-${req.user.id}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  }
});
const fileFilter1 = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error());
  }
};
const upload = multer({
  storage,
  fileFilter: fileFilter1
}).single('avatar');

const uploadPhoto = catchAsync(async (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      return next(new AppError('bad request,image was not uploaded', 400));
    }
    if (req.file) {
      // put filename in body.avatar to store it DB as source of that file(avatar)
      req.body.avatar = req.file.filename;
    }
    next();
  });
});
module.exports = uploadPhoto;
