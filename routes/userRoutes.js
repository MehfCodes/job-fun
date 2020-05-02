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
  forgotPasswordUser,
  resetPasswordUser,
  updatePasswordUser
} = require('./../controllers/userAuthController');
const { protectRoutes } = require('../controllers/middlewares/protectRoutes');

const router = express.Router();

router.get('/', allUsers);

router.post('/signup', signUpUser);

router.post('/login', loginUser);

// router.get('/admin').get(protectRoutes, admin);

router.post('/forgotPassword', forgotPasswordUser);
router.patch('/resetPassword/:token', resetPasswordUser);
router.patch('/updatePassword', protectRoutes, updatePasswordUser);

router.patch('/updateMe', protectRoutes, updateMe);
router.delete('/deactiveMe', protectRoutes, deleteMe);
router.route('/:id').get(getUser);

module.exports = router;
