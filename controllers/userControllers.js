const User = require('./../models/userModel.js');
const { getAll, getOne, updateOne, deActiveOne } = require('./factory');

const allUsers = getAll(User);
const getUser = getOne(User, 'user');
const updateMe = updateOne(User, 'user');
const deActiveMe = deActiveOne(User, 'user');

module.exports = {
  allUsers,
  getUser,
  deActiveMe,
  updateMe
};
