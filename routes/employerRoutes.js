const express = require('express');
const {
  signUpCompany,
  loginCompany,
  logoutCompany,
  forgotPasswordCompany,
  resetPasswordComany,
  updatePasswordCompany
} = require('./../controllers/companyAuthController');

const router = express.Router();

router.post('/signup', signUpCompany);
module.exports = router;
