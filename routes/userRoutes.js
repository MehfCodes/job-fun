const express = require('express');
const {
  allUsers,
  deleteMe,
  updateMe,
  getUser
} = require('./../controllers/userControllers');

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./../controllers/userAuthController');
const { protectRoutes } = require('../controllers/middlewares/protectRoutes');

const router = express.Router();

router.get('/', allUsers);

router.post('/signup', signUp);

router.post('/login', login);

// router.get('/admin').get(protectRoutes, admin);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protectRoutes, updatePassword);

router.patch('/updateMe', protectRoutes, updateMe);
router.delete('/deactiveMe', protectRoutes, deleteMe);
router.route('/:id').get(getUser);

module.exports = router;
