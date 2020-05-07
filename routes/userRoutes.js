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
const {
  protectUserRoutes
} = require('../controllers/middlewares/protectRoutes');

const router = express.Router();

router.get('/', allUsers);

router.post('/signup', signUpUser);

router.post('/login', loginUser);

// router.get('/admin').get(protectRoutes, admin);

router.post('/forgotPassword', forgotPasswordUser);
router.patch('/resetPassword/:token', resetPasswordUser);
router.patch('/updatePassword', protectUserRoutes, updatePasswordUser);

router.patch('/updateMe', protectUserRoutes, updateMe);
router.delete('/deactiveMe', protectUserRoutes, deleteMe);
router.route('/:id').get(getUser);

module.exports = router;
