const User = require('./../models/userModel');
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./authFactory');

const signUpUser = signUp(User);
const loginUser = login(User);
const logoutUser = logout();
const forgotPasswordUser = forgotPassword(User);
const resetPasswordUser = resetPassword(User);
const updatePasswordUser = updatePassword(User);

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  updatePasswordUser
};
