const express = require('express');

const {
  allhiringAd,
  getHiringAd,
  createHiringAd,
  updateHiringAd,
  deleteHiringAd
} = require('./../controllers/hiringAdController');
const { protectRoutes } = require('./../controllers/middlewares/protectRoutes');
const filterReq = require('../controllers/middlewares/filterReq');
const Company = require('./../models/companyModel');

const router = express.Router();

router
  .route('/')
  .get(allhiringAd)
  .post(protectRoutes(Company), createHiringAd);

router
  .route('/:id')
  .get(getHiringAd)
  .patch(protectRoutes(Company), filterReq, updateHiringAd)
  .delete(protectRoutes(Company), deleteHiringAd);

module.exports = router;
