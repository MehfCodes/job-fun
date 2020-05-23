const express = require('express');
const {
  allUsers,
  deActiveMe,
  updateMe,
  getUser
} = require('./../controllers/userControllers');

const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./../controllers/authFactory');
const { protectRoutes } = require('../controllers/middlewares/protectRoutes');
const User = require('./../models/userModel');
const filterReq = require('../controllers/middlewares/filterReq');
const uploadPhoto = require('./../controllers/middlewares/uploadPhoto');

const router = express.Router();

router.get('/', allUsers);
router.post('/signup', signUp(User));
router.post('/login', login(User));
router.post('/forgotPassword', forgotPassword(User));
router.patch('/resetPassword/:token', resetPassword(User));
router.patch('/updatePassword', protectRoutes(User), updatePassword(User));
router.patch(
  '/updateMe',
  protectRoutes(User),
  uploadPhoto,
  filterReq,
  updateMe
);
router.delete('/deactiveMe', protectRoutes(User), deActiveMe);
router.get('/:id', getUser);
router.delete('/logout', protectRoutes(User), logout);
module.exports = router;
