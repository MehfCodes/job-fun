const HiringAd = require('./../models/hiringAdModel.js');
const {
  getAll,
  getOne,
  updateOne,
  createOne,
  deleteOne
} = require('./factory');
const catchAsync = require('./../utils/catchAsync');

const allhiringAd = getAll(HiringAd);
const getHiringAd = getOne(HiringAd, 'document');

// only company can create update and delete hiring ads
const createHiringAd = createOne(HiringAd);
const updateHiringAd = updateOne(HiringAd, 'document');
const deleteHiringAd = deleteOne(HiringAd);

module.exports = {
  allhiringAd,
  getHiringAd,
  createHiringAd,
  updateHiringAd,
  deleteHiringAd
};
