const express = require('express');
const {
  allUsers,
  deleteMe,
  updateMe,
  getUser
} = require('./../controllers/userControllers');

const {
  signUpUser,
  loginUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  updatePasswordUser
} = require('./../controllers/userAuthController');
const { protectRoutes } = require('../controllers/middlewares/protectRoutes');
const User = require('./../models/userModel');
const router = express.Router();

router.get('/', allUsers);

router.post('/signup', signUpUser);

router.post('/login', loginUser);

// router.get('/admin').get(protectRoutes, admin);

router.post('/forgotPassword', forgotPasswordUser);
router.patch('/resetPassword/:token', resetPasswordUser);
router.patch('/updatePassword', protectRoutes(User), updatePasswordUser);

router.patch('/updateMe', protectRoutes(User), updateMe);
router.delete('/deactiveMe', protectRoutes(User), deleteMe);
router.route('/:id').get(getUser);
router.delete('/logout', protectRoutes(User), logoutUser);
module.exports = router;
