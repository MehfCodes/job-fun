const express = require('express');
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./../controllers/authFactory');
const { protectRoutes } = require('./../controllers/middlewares/protectRoutes');
const Company = require('./../models/companyModel');
const router = express.Router();

router.post('/signup', signUp(Company));
router.post('/login', login(Company));
router.delete('/logout', protectRoutes(Company), logout);
router.post('/forgotpassword', forgotPassword(Company));
router.patch('/resetpassword/:token', resetPassword(Company));
router.patch(
  '/updatepassword',
  protectRoutes(Company),
  updatePassword(Company)
);
module.exports = router;
