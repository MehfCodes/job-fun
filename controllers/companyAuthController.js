const Company = require('./../models/companyModel');
const catchAsync = require('./../utils/catchAsync');
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./authFactory');

// const signUpCompany = catchAsync(async () => {
//   const newCompany = await Company.create();
//   console.log(newCompany);
// });
const signUpCompany = signUp(Company);
const loginCompany = login(Company);
const forgotPasswordCompany = forgotPassword(Company);
const resetPasswordComany = resetPassword(Company);
const updatePasswordCompany = updatePassword(Company);
module.exports = {
  signUpCompany,
  loginCompany,
  forgotPasswordCompany,
  resetPasswordComany,
  updatePasswordCompany
};
