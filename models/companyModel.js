const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you must choose a title for company']
  },
  website: String,
  email: {
    type: String,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'type of inputed email is not correct'
    },
    unique: [true, 'this email is already existing']
  },
  phoneNumber: {
    type: String,
    required: [true, 'company phone number is require'],
    length: [11, 'the length of phone number must be 11'],
    unique: [true, 'this phone number is  already existing']
  },
  category: {
    type: String,
    required: [true, 'you must at least choose one category']
  },
  numberOfPersonnel: {
    type: String,
    required: [true, 'you must fill this field']
  },
  logo: {
    type: String,
    default: 'default company logo.jpg'
  },
  password: {
    type: String,
    required: [true, 'password is require'],
    minlength: [8, 'password length must be more than 8 character']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'password confirm is require'],
    minlength: [8, 'password confirm length must be more than 8 character'],
    validate: {
      validator(passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'password confirm is not equal to password'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  changedPasswordAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

companySchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
  }
});

companySchema.pre(/^find/, function(next) {
  this.find({ isActive: true });
  next();
});

companySchema.methods.isPasswordCorrect = async function(inputedPass) {
  const isCorrect = await bcrypt.compare(inputedPass, this.password);
  return isCorrect;
};

companySchema.methods.isPasswordChange = function(JWTTimestapm) {
  if (this.changedPasswordAt) {
    const timeToInt = parseInt(this.changedPasswordAt.getTime() / 1000, 10);
    return JWTTimestapm < timeToInt;
  }
  return false;
};
companySchema.methods.createResetPasswordToken = async function() {
  const resetToken = crypto.randomBytes(16).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model('company', companySchema);
