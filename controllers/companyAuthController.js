const Company = require('./../models/companyModel');
const catchAsync = require('./../utils/catchAsync');
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./authFactory');

const signUpCompany = signUp(Company);
const loginCompany = login(Company);
const logoutCompany = logout();
const forgotPasswordCompany = forgotPassword(Company);
const resetPasswordComany = resetPassword(Company);
const updatePasswordCompany = updatePassword(Company);

module.exports = {
  signUpCompany,
  loginCompany,
  logoutCompany,
  forgotPasswordCompany,
  resetPasswordComany,
  updatePasswordCompany
};
