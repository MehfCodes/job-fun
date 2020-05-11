const express = require('express');
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./../controllers/authFactory');
const {
  getAllCompany,
  getCompany,
  updateCompany,
  deActiveCompany
} = require('./../controllers/companyController');
const { protectRoutes } = require('./../controllers/middlewares/protectRoutes');
const { allowedFields } = require('./../controllers/middlewares/user');
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
router.get('/', getAllCompany);
router.get('/:id', getCompany);
router.patch(
  '/update-company',
  protectRoutes(Company),
  allowedFields,
  updateCompany
);
router.delete('/deactive-company', protectRoutes, deActiveCompany);
module.exports = router;
