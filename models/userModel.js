const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please enter username it is require '],
    minlength: [5, 'username length must be more than 5 character'],
    maxlength: 20,
    trim: true,
    unique: [true, 'this username is already existing'],
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'please enter E-mail it is require '],
    trim: true,
    unique: [true, 'this E-mail is already existing'],
    lowercase: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'please enter correct email address'
    }
  },

  password: {
    type: String,
    required: [true, 'password is require'],
    minlength: [6, 'password length must be more than 6 character']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'confirm password '],
    validate(pass) {
      return pass === this.password;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
    // select: false
  },
  changedPasswordAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isActive: {
    type: Boolean,
    default: true,
    select: false
  },
  avatar: {
    type: String,
    default: 'default-profile.png'
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  else {
    const user = this;
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    this.passwordConfirm = undefined;
    next();
  }
});

userSchema.pre(/^find/, function(next) {
  this.find({ isActive: true });
  next();
});

userSchema.methods.isPasswordCorrect = async function(candidatePassword) {
  const isCorrect = await bcrypt.compare(candidatePassword, this.password);
  return isCorrect;
};

userSchema.methods.isPasswordChange = function(JWTTimestamp) {
  if (this.changedPasswordAt) {
    const timeToInt = parseInt(this.changedPasswordAt.getTime() / 1000, 10);
    // console.log(this.changedPasswordAt, '--------', JWTTimestamp);
    return JWTTimestamp < timeToInt; // 10 < 19
  }

  return false;
};

userSchema.methods.createResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(16).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  // console.log(resetToken, '-----', this.resetPasswordToken);

  return resetToken;
};
const model = mongoose.model('users', userSchema);
module.exports = model;
