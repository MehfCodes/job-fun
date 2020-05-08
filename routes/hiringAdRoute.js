const express = require('express');

const {
  allhiringAd,
  getHiringAd,
  createHiringAd,
  updateHiringAd,
  deleteHiringAd
} = require('./../controllers/hiringAdController');
const { protectRoutes } = require('./../controllers/middlewares/protectRoutes');
const Company = require('./../models/companyModel');
const router = express.Router();

router
  .route('/')
  .get(allhiringAd)
  .post(protectRoutes(Company), createHiringAd);

router
  .route('/:id')
  .get(getHiringAd)
  .patch(protectRoutes(Company), updateHiringAd)
  .delete(protectRoutes(Company), deleteHiringAd);

module.exports = router;
