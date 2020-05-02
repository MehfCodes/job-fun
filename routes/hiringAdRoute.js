const express = require('express');

const {
  allhiringAd,
  getHiringAd,
  createHiringAd,
  updateHiringAd,
  deleteHiringAd
} = require('./../controllers/hiringAdController');

const router = express.Router();

router
  .route('/')
  .get(allhiringAd)
  .post(createHiringAd);

router
  .route('/:id')
  .get(getHiringAd)
  .patch(updateHiringAd)
  .delete(deleteHiringAd);

module.exports = router;
